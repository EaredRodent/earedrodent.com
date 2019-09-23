export default (context) => {
  function gtag () {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments)
  }

  function report (to) {
    gtag('js', new Date())
    gtag('config', 'UA-145843375-1', {
      page_path: to ? to.path : window.location.pathname
    })
  }

  if (process.env.NODE_ENV === 'production') {
    let script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-145843375-1'
    script.async = true
    document.getElementsByTagName('head')[0].appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = gtag

    report()
    context.app.router.afterEach((to, from) => {
      report(to)
    })
  }
}
