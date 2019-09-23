import config from '~/config/config'

/**
 * Настроит axios на клиенте, используя токен из user в хранилище
 * @param store
 * @param $axios
 */
export default ({ store, $axios }) => {
  $axios.defaults.baseURL = config.AXIOS.baseUrl
  if (store.state['other']['auth'].user && store.state['other']['auth'].user.hasOwnProperty('accesstoken')) {
    console.log(`Plugins::base: Axios configured by token [${store.state['other']['auth'].user.accesstoken}]`)
    $axios.setToken(store.state['other']['auth'].user.accesstoken, 'Bearer')
  }
}
