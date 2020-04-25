import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({store}){
  Vue.use(new VueSocketIO({
    debug: false,
    connection: "http://https://floating-castle-80355.herokuapp.com/",
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))

}
