import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({store}){
  Vue.use(new VueSocketIO({
    debug: false,
    connection: "https://whispering-tor-65674.herokuapp.com:3000",
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))

}
