const path = require('path')
const url = require('url')

// Require Electron Modules
const { app, BrowserWindow, protocol } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')
const { createProtocol } = require('./helpers/createProtocol')


//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })


function sendStatusToWindow(text) {
  log.info(text)
  mainWindow.webContents.send('message', text)
}

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'myOffice',
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  
  createProtocol('app')
  
  // Load the index.html when not in development
  mainWindow.loadURL('app://./web/index.html')

  mainWindow.on('closed', () => { mainWindow = null })
}





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.')
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...')
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds')
})

autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    autoUpdater.quitAndInstall()
  }, 5000)
})


app.on('ready', function()  {
  autoUpdater.checkForUpdates()
})
