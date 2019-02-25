import Vue from '../lib/vue.esm.js'
import Vuex from '../lib/vuex.esm.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    message: ''
  },
  mutations: {
    SET_MESSAGE: (state, text) => {
      state.message = text
    },
    increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {
    
  }
});

export default store
