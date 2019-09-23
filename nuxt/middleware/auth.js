import config from '~/config/config'

/**
 * Проверяет доступ к странице route.fullPath,
 * используя хранилище (права пользователя) и config (требующиеся права для этой страницы)
 * 1. Если конфиг прав PAGES[pageName] не найден, то доступ запрещен
 * 2. Если конфиг прав PAGES[pageName] найден, но permission для страницы не задан, то доступ разрешен
 * 3. Если конфиг прав PAGES[pageName] найден и permission для страницы задан,
 * то проверяется наличие этого права у пользователя
 * @param store
 * @param route
 * @param $axios
 * @param redirect
 * @returns {Promise<*>}
 */
export default async function ({ store, route, $axios, redirect }) {
  store.commit('other/ws/unregisterAllTableDependencies')
  // let userEmail = store.state.user.email ? store.state.user.email : 'Guest'
  // let userId = store.state.user.id ? `${store.state.user.id}/` : ''
  // console.log(`Middleware::auth: User [${userId}${userEmail}] try access for ${route.fullPath}`)

  let pageConfigFound = false
  for (let page in config.PAGES) {
    if (config.PAGES[page].url === route.fullPath) {
      pageConfigFound = true
      if (config.PAGES[page].permission) {
        if (store.getters['other/auth/can'](config.PAGES[page].permission)) {
          // console.log(`Middleware::auth: user has access ${page}`)
          return
        } else {
          // console.log(`Middleware::auth: user does not have access ${page}`)
        }
      } else {
        // console.log(`Middleware::auth: free access page ${page}`)
        return
      }
    }
  }
  if (!pageConfigFound) {
    // console.log(`Middleware::auth: PAGE with url "${route.fullPath}" from config file not found`)
    return redirect(config.PAGES.PAGE_Base_Notfount.url)
  }
  return redirect(config.PAGES.PAGE_Base_Forbidden.url)
}
