export const state = function () {
  return {
    /**
     * Данные vue-native-websocket
     * @property {object} socket
     */
    socket: {
      isConnected: false,
      modifiedTables: '',
      reconnectError: false
    },
    /**
     * Табличные зависимости функций см. функцию registerTableDependencies()
     */
    tableDependencies: []
  }
}

export const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
  },
  SOCKET_ONMESSAGE (state, message) {
    message = JSON.parse(message.data)
    console.log(`Store::SOCKET_ONMESSAGE: ModifiedTables: ${JSON.stringify(message)}`)
    state.socket.modifiedTables = message

    let intersectionFlag = false
    for (let tableDependence of state.tableDependencies) {
      for (let modifiedTable of state.socket.modifiedTables) {
        if (tableDependence.tables.indexOf(modifiedTable) !== -1) {
          // console.log(`Store::SOCKET_ONMESSAGE: Has intersection ${JSON.stringify(tableDependence.tables)}`)
          intersectionFlag = true
        }
        if (intersectionFlag) {
          break
        }
      }
      if (intersectionFlag) {
        break
      }
    }
    if (intersectionFlag) {
      for (let tableDependence of state.tableDependencies) {
        for (let func of tableDependence.functions) {
          func()
        }
      }
    }
  },
  SOCKET_RECONNECT (state, count) {
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.socket.reconnectError = true
  },
  registerTableDependencies (state, { tables, functions }) {
    if (state.tableDependencies.indexOf({ tables, functions }) === -1) {
      state.tableDependencies.push({ tables, functions })
    }
  },
  unregisterAllTableDependencies (state) {
    state.tableDependencies.splice(0, state.tableDependencies.length)
  }
}
