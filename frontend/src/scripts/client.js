export const client = {
  connect(context) {
      context.commit('setSocket', new WebSocket(process.env.VUE_APP_SOCKET_SERVER))

      context.state.socket.onopen = () => {

          console.log('Connected to server')

          context.state.socket.send(JSON.stringify({ msg: 'Hello server', status: 1 }))
      }

      context.state.socket.onmessage = (message) => {

          let data = JSON.parse(message.data)

          console.log(data)

          client.checkStatus(context, data)
      }

      context.state.socket.onclose = () => {
          console.log('Disconnected from server')
      }
  },
  disconnect(context) {
    context.state.socket.close()
    context.commit('setSocket', null)
  },
  checkStatus(context, data) {
      if (data.status === 1) {
          context.commit('setImages', data.data)
      } else if (data.status === 2) {
          client.like(context, data)
      } else if (data.status === 3) {
          client.comment(context, data)
      } else if (data.status === 4) {
          client.deleteComment(context, data)
      }
  },
  // METHODS FOR HANDLING INCOMING SOCKET DATA
  like(context, data) {
      context.commit('setLike', data)
  },
  comment(context, data) {
      context.commit('setComment', data)
  },
  deleteComment(context, data) {
      context.commit('deleteComment', data)
  }
}