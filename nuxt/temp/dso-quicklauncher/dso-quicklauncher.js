import Viewer from '~/components/dso-client/viewer/index'

export default {
  head () {
    return {
      title: 'DSO_QuickLauncher - Drakensang Online',
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
          content: 'DSO_QuickLauncher makes your Drakensang Online always handy...'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'DSO_QuickLauncher, Drakensang Online'
        }
      ]
    }
  },
  components: {
    Viewer
  },
  data () {
    return {
      init: {
        name: 'DSO_QuickLauncher',
        text: 'DSO_QuickLauncher makes your Drakensang Online always handy. ' +
          'Configure once, run Drakensang Online with one click for the rest of time.',
        version: '0.0.0',
        download: '/exe/DSO_QuickLauncher.msi',
        release: true,
        youtube: 'rFJFzTepQ2M',
        updates: [
          {
            version: '0.3.1',
            date: '07.04.2019 18:00:00',
            text: 'The program is adapted to work with the new domain. Startup configuration bug fixed.',
            core: true
          },
          {
            version: '0.3.0',
            date: '23.03.2019 22:00:00',
            text: 'Added field for selecting a language. Installer improved.',
            core: true
          },
          {
            version: '0.2.2',
            date: '09.03.2019 22:00:00',
            text: 'General bugfix.',
            core: true
          },
          {
            version: '0.2.1',
            date: '07.03.2019 21:50:00',
            text: 'Fixed "Does not contain the required script." API error.',
            core: true
          },
          {
            version: '0.2.0',
            date: '07.03.2019 01:00:00',
            text: 'Force use of OpenGL ES 2.0 for any rendering. ' +
              'LibEGL.dll and libGLESv2.dll libraries were added to the project build.',
            core: true
          },
          {
            version: '0.1.1',
            date: '06.03.2019 21:30:00',
            text: 'New production build. Attempt to add all .exe dependencies.',
            core: true
          },
          {
            version: '0.1.0',
            date: '02.03.2019 23:30:00',
            text: 'First version (alpha).',
            core: true
          }
        ]
      }
    }
  },
  async mounted () {
    let { data } = await this.$axios.get('v1/start-up')
    this.init.version = data['dso_quicklauncher']
    document.title = `DSO_QuickLauncher ${this.init.version} - Drakensang Online`
  },
  methods: {
    async download () {
      await this.$axios.get('v1/start-up/download')
    }
  }
}
