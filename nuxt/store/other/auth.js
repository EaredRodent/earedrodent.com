import config from '~/config/config'

export const state = function () {
  return {
    /**
     * Данные пользователя
     * @property {object} user пользователь
     */
    user: {}
  }
}

export const getters = {
  /**
   * Возвращает true, если пользователь имеет право, иначе false
   * @param {string} permission
   * @returns {boolean}
   */
  can (state) {
    return function (permission) {
      if (this.user && this.user.hasOwnProperty('permissions') && typeof this.user['permissions'] === 'object') {
        return this.user['permissions'].indexOf(permission) !== -1
      } else {
        return false
      }
    }.bind(state)
  },
  /**
   * Возвращает true, если пользователь гость, иначе false
   * @returns {boolean}
   */
  isGuest (state) {
    return (JSON.stringify(state.user) === '{}') || (!state.user)
  },
  /**
   * Возвращает свойство из state.user, иначе undefined
   * @param {string} property
   * @returns {string, undefined}
   */
  userProperty (state) {
    return function (property) {
      if (this.user && this.user.hasOwnProperty(property)) {
        return this.user[property]
      } else {
        return undefined
      }
    }.bind(state)
  },
  /**
   * Возвращает объект страницы для url из файла config свойста PAGES, иначе undefined
   * @param {string} url
   * @returns {object}
   */
  pageConfigByUrl (state) {
    return function (url) {
      for (let page in config.PAGES) {
        if (config.PAGES[page].url === url) {
          return config.PAGES[page]
        }
      }
      return undefined
    }
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  /**
   *
   * Регистрирует нового пользователя
   * @param store
   * @param username
   * @param password
   * @param {object} additionParams  - параметры помимо username и password
   * @returns {Promise<any>}
   */
  registration (store, { username, password, additionParams = null }) {
    return new Promise(async (resolve, reject) => {
      // Попытка регистрации

      try {
        const { data } = await this.$axios.post(
          'v1/users/registration',
          {
            email: username,
            password,
            ...additionParams
          }
        )

        // В случае успеха

        resolve(data)
      } catch (e) {
        // В ином случае

        reject(e)
      }
    })
  },
  /**
   * Авторизирует пользователя с переходом на startPage из config PAGES
   * @param commit
   * @param getters
   * @param username
   * @param password
   * @returns {Promise<any>}
   */
  login ({ commit, getters }, { username, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data: { accesstoken } } = await this.$axios.post('v1/users/login', { email: username, password })
        this.$axios.setToken(accesstoken, 'Bearer')
        let { data: user } = await this.$axios.get('v1/users/bootstrap')
        this.$cookies.set('accesstoken', accesstoken)
        commit('setUser', user)
        this.$router.push(config.ROLES[getters['userProperty']('role')].startPage.url)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  /**
   * Логаут пользователя с переходом на logoutPage из config PAGES
   * @param commit
   * @param getters
   */
  logout ({ commit, getters }) {
    let role = getters['userProperty']('role')
    commit('setUser', {})
    this.$axios.setToken(null)
    this.$cookies.remove('accesstoken')
    if (role) {
      this.$router.push(config.ROLES[role].logoutPage.url)
    }
  }
}
