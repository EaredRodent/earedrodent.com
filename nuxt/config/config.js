let config = {}
config.AXIOS = {
  baseUrl: (process.env.NODE_ENV === 'production') ? 'https://dso.earedrodent.com/' : 'http://dso-client/'
}

/**
 * Web Socket Client
 * Адрес сервера
 * @property {string} url
 */
config.WSC = {
  // url: (process.env.NODE_ENV === 'production') ? 'wss://dso.eared-rodent.com/wss/' : 'ws://dso-client/wss/'
}

/**
 * Описание компонентов страниц
 */
config.PAGES = {
  PAGE_Base_Notfount: {
    name: 'NotFound',
    url: '/base/notfound'
  },
  PAGE_Base_Forbidden: {
    name: 'Forbidden',
    url: '/base/forbidden'
  },
  PAGE_Index: {
    name: 'DSO_QuickLauncher',
    url: '/'
  },
  PAGE_DsoQuicklauncher: {
    name: 'DSO_QuickLauncher',
    url: '/dso-quicklauncher'
  },
  PAGE_Private_DsoQuicklauncher: {
    name: 'DSO_QuickLauncher',
    url: '/private/dso-quicklauncher'
  },
  PAGE_DsoCam: {
    name: 'DSO_Cam',
    url: '/dso-cam'
  },
  PAGE_Private_DsoCam: {
    name: 'DSO_Cam',
    url: '/private/dso-cam'
  },
  PAGE_Eralex: {
    name: 'Eralex',
    url: '/eralex',
    permission: 'roleAdmin'
  },
  PAGE_Test: {
    name: 'Test',
    url: '/test'
  },
  PAGE_34ZDEYpZNrcgadVsHVQS: {
    name: 'Test',
    url: '/34ZDEYpZNrcgadVsHVQS'
  }
}
/**
 * Описание ролей
 */
config.ROLES = {
  // ROLE_User: {
  //   startPage: config.PAGES.PAGE_Index,
  //   logoutPage: config.PAGES.PAGE_Index
  // },
  // ROLE_Moderator: {
  //   startPage: config.PAGES.PAGE_Index,
  //   logoutPage: config.PAGES.PAGE_Index
  // },
  // ROLE_Admin: {
  //   startPage: config.PAGES.PAGE_Base_UserManager,
  //   logoutPage: config.PAGES.PAGE_Index
  // },
  // ROLE_Master: {
  //   startPage: config.PAGES.PAGE_Base_UserManager,
  //   logoutPage: config.PAGES.PAGE_Index
  // }
}
/**
 * Конфиг
 * @type {{THEME: {darkFlag: boolean}}}
 */
config.VUETIFY = {
  THEME: {
    darkFlag: false
  }
}
/**
 * Конфиг AppBar
 */
config.APP = {
  BAR: {
    pages: [
      {
        name: 'More',
        pages: [
          config.PAGES.PAGE_DsoQuicklauncher,
          config.PAGES.PAGE_DsoCam
        ]
      }
      // config.PAGES.PAGE_Test1,
      // {
      //   name: 'Справочник',
      //   pages: []
      // },
      // {
      //   name: 'Администратору',
      //   pages: [
      //     config.PAGES.PAGE_Base_UserManager,
      //     config.PAGES.PAGE_Base_RoleManager
      //   ]
      // }
    ]
  }
}

export default config
