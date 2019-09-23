import Vue from 'vue'
// import VueNativeSock from 'vue-native-websocket'
// import config from '~/config/config'
import VeeValidate from 'vee-validate'
import GTag from './base/gtag'

export default (context) => {
  /**
   * Хранилище
   * @property {object} store
   * Если true, при разрыве будет пытаться установить соединение
   * @property {boolean} reconnection
   * Попыток reconnection
   * @property {number, Infinity} reconnectionAttempts
   * Задержка между reconnection
   * @property {number} reconnectionDelay
   */
  // Vue.use(VueNativeSock, config.WSC.url, {
  //   store,
  //   reconnection: true,
  //   reconnectionAttempts: Infinity,
  //   reconnectionDelay: 3000,
  //   passToStoreHandler (eventName, event, next) {
  //     if (eventName.startsWith('SOCKET_')) {
  //       if (event.message) {
  //         this.store.commit(`other/ws/${eventName.toUpperCase()}`, JSON.parse(event.message))
  //       } else {
  //         this.store.commit(`other/ws/${eventName.toUpperCase()}`, event)
  //       }
  //     } else {
  //       next(eventName, event)
  //     }
  //   }
  // })

  Vue.use(VeeValidate, {
    events: ''
  })

  GTag(context)
}
