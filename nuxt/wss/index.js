const WebSocketServer = require('ws')

const phpServerIpv4 = '127.0.0.1'
const phpServerIpv6 = '::ffff:127.0.0.1'

class Stack {
  /**
   * Создает стек
   */
  constructor () {
    this.clients = []
  }

  /**
   * Добавить клиента
   * @param ws
   */
  push (ws, req) {
    if (req.headers['x-forwarded-for']) {
      ws.___ip = req.headers['x-forwarded-for']
    } else {
      ws.___ip = req.connection.remoteAddress
    }
    ws.___id = Date.now()
    ws.___ip = ws._socket.remoteAddress
    ws.___isPhpServer = !!((ws._socket.remoteAddress === phpServerIpv4) || (ws._socket.remoteAddress === phpServerIpv6))
    this.clients.push(ws)
    console.log(`wss/[ID: {${ws.___id}]Stack::push: client ip is ${ws.___ip}`)
  }

  /**
   * Широковещательное сообщение
   * @param message
   * @param self
   */
  broadcast (message, self) {
    for (let wsIndex in this.clients) {
      if (this.clients[wsIndex] !== self) {
        this.clients[wsIndex].send(message)
      }
    }
    console.log(`wss/[ID: {${self.___id}]/Stack::push: Broadcasting`)
  }

  /**
   * Удаляет клиента
   * @param id
   */
  destroy (id) {
    for (let wsIndex in this.clients) {
      if (this.clients[wsIndex].___id === id) {
        let clientId = this.clients[wsIndex].___id
        delete this.clients.splice(wsIndex, 1)
        console.log(`wss/[ID: {${clientId}]/Stack::destroy: ID[${clientId}]`)
      }
    }
  }
}

let stack = new Stack()
let webSocketServer = new WebSocketServer.Server({ port: 6002 })
console.log(webSocketServer)
webSocketServer.on('connection', (ws, req) => {
  ws.on('message', function (message) {
    if (this.___isPhpServer) {
      console.log(`wss/[ID: {${this.___id}]/Stack::push: Modified Tables: ${message}`)
    }
    stack.broadcast(message, this)
  })
  ws.on('close', function () {
    stack.destroy(this.___id)
  })
  stack.push(ws, req)
})
