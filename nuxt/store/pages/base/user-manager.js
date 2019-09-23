export const state = function () {
  return {
    existingRoles: [],
    headers: [],
    items: []
  }
}

export const mutations = {
  init (state, { users, existingRoles, UserData }) {
    state.existingRoles = existingRoles
    state.headers.splice(0, state.headers.length)
    for (let header in UserData) {
      state.headers.push(
        { text: header, value: header }
      )
    }
    state.items.splice(0, state.items.length)
    for (var user of users) {
      state.items.push(user)
    }
  }
}
