import $ from 'jquery'

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        name: 'DSO_Default',
        text: 'DSO_Default is default software.',
        download: '/exe/default.exe',
        release: true,
        youtube: '',
        version: '0.0.0',
        updates: [
          {
            version: '0.0.0',
            date: '01.01.2000 00:00:00',
            text: 'Default core.',
            core: true
          },
          {
            version: '0.0.0',
            date: '01.01.2000 00:00:00',
            text: 'Default other.',
            core: false
          }
        ]
      })
    }
  },
  methods: {
    download (e) {
      if (this.value.release) {
        window.open(this.value.download)
        this.$emit('download')
        // eslint-disable-next-line no-undef
        gtag('event', `Download (${this.value.name})`)
      } else {
        e.preventDefault()
      }
    },
    howTo (e) {
      if (this.value.release) {
        window.open(`https://www.youtube.com/watch?v=${this.value.youtube}`)
        // eslint-disable-next-line no-undef
        gtag('event', `HowTo (${this.value.name})`)
      } else {
        e.preventDefault()
      }
    }
  },
  mounted () {
    $('.st-sticky-share-buttons').click(() => {
      // eslint-disable-next-line no-undef
      gtag('event', `Share (${this.value.name})`)
    })
  }
}
