const html = String.raw
import Test from './components/test.js'

export default {
  name: 'app',
  components: { Test },
  template: html`<div id="app">
    <h1>Electron App</h1>
    <Test />
  </div>`
}
