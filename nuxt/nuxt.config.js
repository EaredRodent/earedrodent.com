module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Drakensang Online Apps',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Drakensang Online, DSO_Cam, DSO_QuickLauncher'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext'
      }
    ],
    script: [
      { src: 'qrc:///qtwebchannel/qwebchannel.js' },
      { src: 'https://cdn.rawgit.com/BrainJS/brain.js/45ce6ffc/browser.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: require('./webpack.config'),
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios'
  ],
  axios: {
    // proxyHeaders: false
  },
  plugins: [
    // {src: '~/plugins/bootstrap.js', ssr: false },
    {
      src: '~/plugins/clientServer.js',
      ssr: true
    },
    {
      src: '~/plugins/clientOnly.js',
      ssr: false
    },
    {
      src: '~/jquery/onMountUpdate.js',
      ssr: false
    }
  ],
  router: {
    middleware: ['auth', 'mobileDetect']
  }
}
