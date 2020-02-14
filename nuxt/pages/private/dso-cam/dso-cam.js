/* eslint-disable */
import Rotator from '~/components/dso-client/rotator/index'

export default {
  name: 'Index',
  components: {
    Rotator
  },
  layout: 'client',
  head () {
    return {
      title: 'DSO_Cam by Юки'
    }
  },
  filters: {
    dateFormat (value) {
      let d = new Date(value)
      return d.toISOString().split('.')[0].replace('T', ' ')
    }
  },
  data () {
    return {
      debug: false,
      load: {
        state: true,
        info: '',
        error: false,
        progress: 0,
        labels: [
          'Channel',
          'Bridge-Data',
          'Version',
          'Game',
          'Init'
        ]
      },
      o: [],
      values: {},
      standardValues: {
        x: 0,
        y: 25,
        z: 0.5,
        oX: -0.7854,
        oY: -0.7854,
        zoom: 25,
        exZoom: 0.5934,
        fog: 25
      },
      sendingValues: {},
      exceptLocations: [
        'b1102_dm', // Event "PvP Season" map 1v1, 1v1
        'c2103_ctf', // Event "PvP Season" map 5v5 (Capture the Flag), 5v5
        'a0206_tdm' // Event "PvP Season" map 5v5 (Storm the Fortress), 5v5
      ],
      writeInterval: null,
      startUp: {},
      valuesFromStorage: [],
      showStorage: false,
      renameStorageItemDialog: false,
      storageItem: { index: 0, item: {} }
    }
  },
  mounted () {
    this.resetSendingValues()
    this.initValuesFromStorage()

    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', e => {
        e.preventDefault()
      }, false)
      this.run()
    } else {
      this.load.state = false
      return
    }
  },
  methods: {
    async run () {
      this.load.state = true
      this.load.progress = 0

      // Инициализация объектов Qt

      this.load.info = 'Channel... test.'

      try {
        await this.getChannelObjects()
        this.load.info = 'Channel... ok.'
        this.load.progress = 1
      } catch (e) {
        this.load.info = 'Channel... error.'
        this.load.error = true
        return
      }

      // Получение версии

      try {
        let { data } = await this.$axios.get('/v1/start-up')
        this.startUp = data
      } catch (e) {
        this.load.info = 'Any exception...'
        this.load.error = true
        return
      }

      // Прослушка сигнала из Bridge

      this.load.info = 'Bridge data... await.'
      this.o.bridge.toJavaScript.connect(this.fromChannel)
    },
    async fromChannel (obj) {
      this.values = obj

      if (this.load.progress === 1) {
        this.load.info = 'Bridge data... ok.'
        this.load.progress = 2
      }

      if (this.load.progress === 2) {
        this.load.info = 'Version... test.'

        if (this.startUp.dso_cam.core_version === obj.version) {
          document.title = `DSO_Cam ${this.startUp.dso_cam.version} by Юки`
          this.load.info = 'Version... ok'
          this.load.progress = 3
        } else {
          this.o.bridge.toJavaScript.disconnect(this.fromChannel)
          this.load.info = `Version... is outdated. Upgrade to ${this.startUp.dso_cam.version}.`
          this.load.error = true
          this.o.bridge.cmdExecute('start https://dso.earedrodent.com')
        }
      }

      if (this.load.progress === 3) {
        this.load.info = 'Game location... await.'

        if (obj.isValid) {
          this.writeInterval = setInterval(() => {
            if (!this.can(obj.cityName)) {
              this.resetSendingValues()
            }
            this.sendValues(this.sendingValues)
          }, 50)

          this.load.info = 'Game location... ok.'
          this.load.progress = 4
          setTimeout(() => {
            this.load.state = false
          }, 500)
        }
      }

      if (this.load.progress === 4) {
        if (!obj.isValid) {
          clearInterval(this.writeInterval)
          this.load.progress = 3
          this.load.state = true
        }
      }
    },

    getChannelObjects () {
      return new Promise((resolve, reject) => {
        let webChannel = new QWebChannel(window.qt.webChannelTransport, channel => {
          if (channel.hasOwnProperty('objects')) {
            if (channel.objects.hasOwnProperty('bridge')) {
              this.o = channel.objects
              resolve()
            }
          }
          reject()
        })
      })
    },

    cloneObj (object) {
      return JSON.parse(JSON.stringify(object))
    },

    can (location) {
      return this.exceptLocations.indexOf(location) === -1
    },

    sendValues (values) {
      let vls = this.cloneObj(values)
      for (let i in vls) {
        vls[i] = String(vls[i])
      }
      this.o.bridge.fromJavaScript(vls)
    },

    resetSendingValues () {
      this.sendingValues = this.cloneObj(this.standardValues)
    },

    saveValuesToStorage () {
      let values = this.getValuesFromStorage()
      let forSave = this.cloneObj(this.sendingValues)
      forSave.title = ''
      forSave.date = Date.now()
      values.push(forSave)
      localStorage.setItem('values', JSON.stringify(values))
      this.initValuesFromStorage()
    },

    getValuesFromStorage () {
      let values = localStorage.getItem('values')

      if (values) {
        return JSON.parse(values)
      } else {
        return []
      }
    },

    initValuesFromStorage () {
      this.valuesFromStorage = this.getValuesFromStorage()
    },

    removeSaveFromStorage (index) {
      let values = this.getValuesFromStorage()
      values.splice(index, 1)
      localStorage.setItem('values', JSON.stringify(values))
      this.initValuesFromStorage()
    },

    openRenameStorageItemDialog (item, index) {
      this.storageItem = { index, item: this.cloneObj(item) }
      this.renameStorageItemDialog = true
    },

    renameStorageItem () {
      let values = this.getValuesFromStorage()
      values.splice(this.storageItem.index, 1, this.storageItem.item)
      localStorage.setItem('values', JSON.stringify(values))
      this.initValuesFromStorage()
      this.renameStorageItemDialog = false
    },

    applySave (save) {
      this.sendingValues = this.cloneObj(save)
    }
  }
}
