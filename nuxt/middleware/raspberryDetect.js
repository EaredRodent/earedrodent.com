export default async function ({ store: { commit }, req, route, redirect }) {
  if ((req.headers['user-agent']).indexOf('Raspbian Chromium') !== -1) {
    commit('other/device/setRaspberryDetected', true)
  }
}
