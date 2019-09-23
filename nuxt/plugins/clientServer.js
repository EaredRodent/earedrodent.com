import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAuth from './base/auth'
import RaspberryDetector from './base/raspberryCssFix/raspberryCssFix'
import ru from 'vuetify/es5/locale/ru'

// import 'vuetify/dist/vuetify.min.css'
import '~/assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

export default (context) => {
  Vue.use(Vuetify, {
    customProperties: true,
    lang: {
      locales: { ru },
      current: 'ru'
    }
  })
  VueAuth(context)
  RaspberryDetector(context)
}
