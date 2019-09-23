<template>
  <v-toolbar
    class="a0-AppBar" :class="{main_toolbar_light: !$vuetify.dark, main_toolbar_dark: $vuetify.dark}"
    dense
    dark
    app>
    <v-toolbar-title
      class="mr-4 a0-title cursor"
      @click="$router.push('/')">
      DSO
    </v-toolbar-title>
    <v-toolbar-items>

      <!--1 lvl (page)-->
      <v-btn draggable="false" v-for="(item, key, i) in BAR.pages"
             v-if="isPage(item) && pageIsAccessible(item)"
             :key="i" :to="item.url" flat>
        {{ item.name }}
      </v-btn>

      <!--1 lvl (group)-->

      <v-menu v-else-if="groupIsNotEmpty(item) && groupHasAccessiblePages(item)"
              :key="i" offset-y>

        <!--2 lvl (group activator button)-->

        <template slot="activator">
          <v-btn flat>
            {{ item.name }}
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list class="a0-list">

          <!--2 lvl (page)-->

          <v-list-tile draggable="false" v-for="(itemDeep, keyDeep, iDeep) in item.pages"
                       v-if="isPage(itemDeep) && pageIsAccessible(itemDeep)" :key="iDeep"
                       :to="itemDeep.url">
            {{ itemDeep.name }}
          </v-list-tile>

          <!--2 lvl (group)-->

          <v-list-group v-else-if="groupIsNotEmpty(itemDeep) && groupHasAccessiblePages(itemDeep)"
                        :key="iDeep"
                        @click.stop>

            <!--3 lvl (group activator button)-->

            <v-list-tile slot="activator">
              {{ itemDeep.name }}
            </v-list-tile>

            <!--3 lvl (page)-->

            <v-list-tile draggable="false" v-for="(itemDeepDeep, keyDeepDeep, iDeepDeep) in itemDeep.pages"
                         v-if="pageIsAccessible(itemDeepDeep)" :key="iDeepDeep" :to="itemDeepDeep.url">
              {{ itemDeepDeep.name }}
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <v-spacer/>
  </v-toolbar>

</template>

<script>
import config from '~/config/config'
import localForage from 'localforage'

export default {
  name: 'AppBar',
  data: () => ({
    BAR: config.APP.BAR
  }),
  computed: {
    appDark: {
      set (v) {
        this.$store.commit('components/base/app-bar/setAppDark', v)
        localForage.setItem('appDark', v)
      },
      get () {
        return this.$store.state['components']['base']['app-bar'].appDark
      }
    }
  },
  async mounted () {
    localForage.getItem('appDark').then((flag) => {
      if (flag !== null && flag !== undefined) {
        this.appDark = flag
      }
    })
  },

  methods: {
    pageIsAccessible (page) {
      let permission = this.getPermissionByPageUrl(page.url)
      return permission ? this.$store.getters['other/auth/can'](permission) : true
    },
    isPage (item) {
      return !item.hasOwnProperty('pages')
    },
    isGroup (item) {
      return item.hasOwnProperty('pages')
    },
    groupIsNotEmpty (item) {
      return JSON.stringify(item.pages) !== '[]'
    },
    groupHasAccessiblePages (item) {
      for (let page in item.pages) {
        if (item.pages[page].hasOwnProperty('permission')) {
          if (this.$store.getters['other/auth/can'](item.pages[page].permission)) {
            return true
          }
        } else {
          return true
        }
      }
      return false
    },
    getPermissionByPageUrl (url) {
      for (let page in config.PAGES) {
        if (config.PAGES[page].url === url) {
          return config.PAGES[page].permission
        }
      }
      return undefined
    }
  }
}
</script>
