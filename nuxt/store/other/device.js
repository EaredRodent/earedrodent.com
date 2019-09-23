export const state = function () {
  return {
    /**
     * Флаг устройства Raspberry
     */
    raspberryDetected: false,
    /**
     * Флаг мобильного устройства
     */
    mobileDetected: false
  }
}

export const mutations = {
  setRaspberryDetected (state, flag) {
    state.raspberryDetected = flag
  },
  setMobileDetected (state, flag) {
    state.mobileDetected = flag
  }
}
