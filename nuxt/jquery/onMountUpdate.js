import Vue from 'vue'

Vue.use({
  install (Vue, options) {
    /**
     * Вызывает функцию handler в контексте DOM-элемента el, как только элемент el появится или изменится
     * @param el
     * @param handler
     */
    Vue.prototype.$customize = function (el, handler) {
      const onMounted = () => {
        console.log('Mouneted')
        this.$off(['hook:updated'], onUpdated)
        this.$nextTick(() => {
          let elEx = el()
          if (elEx) {
            handler.call(elEx)
            this.$on(['hook:updated'], () => { handler.call(el()) })
          }
        })
      }

      const onUpdated = () => {
        console.log('Updated')
        this.$nextTick(() => {
          let elEx = el()
          if (elEx) {
            this.$off(['hook:updated'], onUpdated)
            handler.call(elEx)
            this.$on(['hook:updated'], () => { handler.call(el()) })
          }
        })
      }

      this.$on(['hook:updated'], onUpdated)
      this.$once(['hook:mounted'], onMounted)
    }
  }
})
