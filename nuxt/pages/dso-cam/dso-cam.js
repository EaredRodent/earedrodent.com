import Viewer from '~/components/dso-client/viewer/index'

export default {
  head () {
    return {
      title: 'DSO_Cam - Drakensang Online',
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
          content: 'DSO_Cam is a tool known to many Drakensang Online players...'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'DSO_Cam, DSO Cam, dso_cam, dso cam, dsocam, DSOCam, Drakensang Online, Drakensang'
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
        name: 'DSO_Cam',
        text: 'DSO_Cam is a tool known to many Drakensang Online players. ' +
          'This will add creativity to any of your ideas. ' +
          'Professional approach to the development of this program and experience gained from previous versions (2012, 2014, 2015). ' +
          'This guarantees you ease of use and high error tolerance.',
        download: '/exe/DSO_Cam.msi',
        release: true,
        youtube: 'i9S6J_1ErIM',
        version: '0.0.0',
        updates: [
          {
            version: '4.1.2',
            date: '16.09.2019 10:29 PM',
            text: 'The project assembly included "vcruntime140.dll".',
            core: true
          },
          {
            version: '4.1.1',
            date: '15.09.2019 10:18 AM',
            text: 'Version comparison method changed.',
            core: false
          },
          {
            version: '4.1.0',
            date: '14.09.2019 06:04 PM',
            text: 'Added the ability to save values in local storage.',
            core: false
          },
          {
            version: '4.0.2',
            date: '14.09.2019 01:45 PM',
            text: 'Bug fixes and GUI tidy up.',
            core: false
          },
          {
            version: '4.0.1',
            date: '13.09.2019 11:09 PM',
            text: 'The new useful button for resetting values to initial.',
            core: false
          },
          {
            version: '4.0.0',
            date: '17.08.2019 10:20 PM',
            text: 'The first public release.',
            core: true
          }
        ]
      }
    }
  },
  async mounted () {
    let { data } = await this.$axios.get('v1/start-up')
    this.init.version = data.dso_cam.version
    document.title = `DSO_Cam ${this.init.version} - Drakensang Online`
  }
}
