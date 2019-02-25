const { protocol } = require('electron')
const path = require('path')
const { readFile } = require('fs')
const { URL } = require('url')


module.exports.createProtocol = (scheme) => {
  protocol.registerBufferProtocol(
    scheme,
    (request, callback) => {
      let pathName = new URL(request.url).pathname
      pathName = decodeURI(pathName) // Needed in case URL contains spaces
    
      readFile(path.join(__dirname, '../..', pathName), (error, data) => {
        if (error) {
          console.error(`Failed to register ${scheme} protocol`, error)
        }
        let extension = path.extname(pathName).toLowerCase()
        let mimeType = ''
    
        if (extension === '.js') {
          mimeType = 'text/javascript'
        } else if (extension === '.html') {
          mimeType = 'text/html'
        } else if (extension === '.css') {
          mimeType = 'text/css'
        } else if (extension === '.svg' || extension === '.svgz') {
          mimeType = 'image/svg+xml'
        } else if (extension === '.json') {
          mimeType = 'application/json'
        }
    
        callback({ mimeType, data })
      })
    },
    (error) => {
      if (error) {
        console.error(`Failed to register ${scheme} protocol`, error)
      }
    }
  )
}
