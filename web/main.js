const { ipcRenderer } = require('electron')
console.log('ipcRendere required..')

import Vue from './lib/vue.esm.js'
import App from './App.js'
import store from './store/index.js'

new Vue({
  store,
  data: {},
  beforeMount() {
    console.log('before...')
    ipcRenderer.on('message', function(event, text) {
      console.log('message reseved:')
      console.log(text)
    
      var container = document.getElementById('messages');
      var message = document.createElement('div');
      message.innerHTML = text;
      container.appendChild(message);
    })
  },
  render: h => h(App),
  methods: {
  }
}).$mount('#app')

// Listen for messages
