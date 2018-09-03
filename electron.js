const path = require('path')
const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require('electron-updater')

const defaults = require(path.join(__dirname, 'src', 'backend', 'defaults'))
require(path.join(__dirname, 'src', 'backend', 'index'))

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 354,
    show: false,
    frame: false,
    resizable: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#ffffff'
  })
  win.loadURL(`http://localhost:${defaults.port}`)
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })

  autoUpdater.checkForUpdatesAndNotify()
}

app.on('ready', createWindow)
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
app.on('window-all-closed', () => {
  app.quit()
})
