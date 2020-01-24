import config from '~/config/config'

export const state = function () {
  return {
    version: {}
  }
}

export const getters = {}

export const mutations = {
  setVersion (state, version) {
    state.version = version
  }
}

export const actions = {
  /**
   * Устанавливает базовый url для axios
   * Устанавливает токен для axios, получая его из кук запроса
   * Устанавливает пользователя в хранилище
   * @param commit    - для вызова mutation в хранилище
   * @param dispatch  - для вызова action в хранилище
   * @param app       - для обращения к модулям nuxt
   * @param $axios
   * @returns {Promise<void>}
   */
  async nuxtServerInit ({ state, commit, dispatch }, { app, $axios, req }) {
    // Авторизация

    $axios.defaults.baseURL = config.AXIOS.baseUrl
    let accesstoken = app.$cookies.get('accesstoken')
    if (accesstoken) {
      try {
        $axios.setToken(accesstoken, 'Bearer')
        let { data: user } = await $axios.get('v1/users/bootstrap')
        commit('other/auth/setUser', user)
      } catch (e) {
        dispatch('other/auth/logout')
        throw new Error('Wrong credentials')
      }
    }
  }
}
