export const state = function () {
  return {
    appDark: true
  }
}

export const mutations = {
  setAppDark (state, v) {
    state.appDark = v
  }
}
