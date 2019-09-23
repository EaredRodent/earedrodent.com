<template>
  <div class="b4-DsoQuickLauncherPrivate elevation-4">
    <div class="b4-header">
      <div>Authorization</div>
    </div>
    <div class="b4-body">
      <v-text-field v-validate="'required|min:4|max:20'"
                    :error-messages="isClient ? errors.collect('username') : null"
                    v-model="user.username" name="username" label="Username"
                    @input="input"/>
      <v-text-field v-validate="'required|min:4|max:45'"
                    :error-messages="isClient ? errors.collect('password') : null"
                    v-model="user.password" name="password" label="Password"
                    @input="input"/>
      <v-select v-model="user.requiredServer" :items="serverList"
                item-value="value" item-text="name" label="Server"
                @change="input"/>
      <v-select v-model="user.lang" :items="langList"
                item-value="value" item-text="name" label="Language"
                @change="input"/>
      <v-switch v-model="user.fullScreen" label="Full screen window" :ripple="false"
                @change="input"/>
      <div v-if="bodyQuestion" class="b4-question">
        <div class="b4-question-caption">Start the game now?</div>
        <v-btn color="primary" @click="loadThenClose">Yes</v-btn>
        <v-btn color="secondary" @click="close">Later</v-btn>
      </div>
    </div>
    <div class="b4-about">
      <div class="b4-author">By Eared Rodent aka Юки</div>
      <div class="b4-support">
        <div class="b4-support-support">Support</div>
        <a @click.prevent="authorClick">{{ authorUrl | shortAuthor }}</a>
      </div>
    </div>
    <div v-if="status.type"
         :class="['b4-footer', status.type]">
      <div v-for="(message, i) in status.message.split('\n')" :key="i">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'client',
  // middleware: ['noQtClientUserAgentBlocker'],
  head () {
    return {
      title: 'DSO_QuickLauncher (~)'
    }
  },
  filters: {
    shortAuthor (v) {
      return v.replace('https://', '').replace('http://', '')
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        requiredServer: '',
        fullScreen: false,
        lang: ''
      },
      serverList: [
        {
          name: 'Grimmag',
          value: 'grimmag'
        },
        {
          name: 'Heredur (connection problems)',
          value: 'heredur'
        },
        {
          name: 'Werian',
          value: 'werian'
        },
        {
          name: 'Agathon',
          value: 'agathon'
        },
        {
          name: 'Tegan',
          value: 'tegan'
        },
        {
          name: 'Balor (connection problems)',
          value: 'balor'
        }
      ],
      langList: [
        {
          name: 'Bulgaria',
          value: 'bg'
        },
        {
          name: 'Czech',
          value: 'cs'
        },
        {
          name: 'Germany',
          value: 'de'
        },
        {
          name: 'Greece',
          value: 'el'
        },
        {
          name: 'English',
          value: 'en'
        },
        {
          name: 'Spain',
          value: 'es'
        },
        {
          name: 'Iran',
          value: 'fa'
        },
        {
          name: 'France',
          value: 'fr'
        },
        {
          name: 'Hungary',
          value: 'hu'
        },
        {
          name: 'Italy',
          value: 'it'
        },
        {
          name: 'Poland',
          value: 'pl'
        },
        {
          name: 'Portugal',
          value: 'pt'
        },
        {
          name: 'Romania',
          value: 'ro'
        },
        {
          name: 'Russian',
          value: 'ru'
        },
        {
          name: 'Slovakia',
          value: 'sk'
        },
        {
          name: 'Turkey',
          value: 'tr'
        }
      ],
      timeOut: {
        send: null
      },
      status: {
        type: '',
        message: ''
      },
      bodyQuestion: false,
      cpp: {},
      version: '~',
      authorUrl: 'https://vk.com/eared_rodent'
    }
  },
  computed: {
    isClient () {
      return process.client
    }
  },
  watch: {
    version (n, o) {
      document.title = `DSO_QuickLauncher ${n}`
    }
  },
  mounted () {
    this.fetchData()
    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault()
    // })
    if (window.hasOwnProperty('qt')) {
      // eslint-disable-next-line no-undef,no-unused-vars
      let qWebChannel = new QWebChannel(qt.webChannelTransport,
        channel => {
          this.cpp = channel.objects.cpp
        }
      )
    }
  },
  methods: {
    setStatus (type, message) {
      this.status.type = type
      this.status.message = message
    },
    async input () {
      this.bodyQuestion = false
      let r = await this.$validator.validate()
      if (r && this.user.requiredServer && this.user.lang) {
        this.setStatus('warning', 'Validation...\n')
        clearTimeout(this.timeOut.send)
        this.timeOut.send = setTimeout(this.send, 500)
      }
    },
    async send () {
      try {
        await this.$axios.get('v1/dso-user-manager', {
          params: {
            ...this.user
            // XDEBUG_SESSION_START: 'PHPSTORM'
          }
        })
        this.setStatus('info', `Succes!`)
        this.cpp.save(this.user.username, this.user.password, this.user.requiredServer, this.user.fullScreen, this.user.lang)
        this.bodyQuestion = true
      } catch (e) {
        this.setStatus('error', `${e}`)
        this.bodyQuestion = false
      }
    },
    loadThenClose () {
      this.cpp.launch()
      this.cpp.close()
    },
    close () {
      this.cpp.close()
    },
    async fetchData () {
      let { data: { version } } = await this.$axios.get('v1/start-up')
      this.version = version
    },
    authorClick () {
      this.cpp.author(this.authorUrl)
    }
  }
}
</script>
