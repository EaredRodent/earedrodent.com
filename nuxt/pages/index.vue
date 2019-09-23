<template>
  <div class="b5-Index">
    <div class="b5-box elevation-3">
      <h1 class="b5-header">
        DSO
      </h1>
      <div>
        Welcome to the Drakensang Online fan site!<br>
        ...<br>
        Are you here to get something useful?
      </div>
      <div>
        <nuxt-link class="b5-variant-link" to="/dso-cam">DSO_Cam (
          {{ dso_cam.version }}
          <v-icon class="b0-loading" v-if="!dso_cam.version">mdi-loading</v-icon>
          )
        </nuxt-link>
        <nuxt-link class="b5-variant-link" to="/dso-quicklauncher">DSO_QuickLauncher (
          {{ response.dso_quicklauncher }}
          <v-icon class="b0-loading" v-if="!response.dso_quicklauncher">mdi-loading</v-icon>
          )
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'DSO - Drakensang Online',
      script: [
        {
          async: 'async',
          src: 'https://platform-api.sharethis.com/js/sharethis.js#property=5d5310434cd0540012f20220&product=sticky-share-buttons'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Welcome to the Drakensang Online fan site!'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Drakensang Online, DSO_Cam, DSO Cam, DSO_QuickLauncher, DSO QuickLauncher'
        },
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'BJX8QeNuW0gIyYcVfCll4H7VCg0vO5cP5LTgh8eGWVI'
        }
      ]
    }
  },
  data () {
    return {
      response: {},
      dso_cam: {}
    }
  },
  async mounted () {
    let { data } = await this.$axios.get('v1/start-up')
    this.response = data
    this.dso_cam = data.dso_cam
  }
}
</script>
