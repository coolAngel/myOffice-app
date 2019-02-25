// Listen for messages
const {ipcRenderer} = require('electron')
console.log('ipcRendere required..')

ipcRenderer.on('message', function(event, text) {
  console.log('message reseved.')
  
  var container = document.getElementById('messages');
  var message = document.createElement('div');
  message.innerHTML = text;
  container.appendChild(message);
})


export default class App {
  doStaff() {
    console.log('i am trying hard...')
  }
}
export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}


function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () { callback(this.responseText) };
  xhr.open('GET', url, true);
  xhr.send();
}
