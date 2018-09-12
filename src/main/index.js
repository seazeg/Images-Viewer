import {
  app,
  BrowserWindow,
  ipcMain,
  Tray
} from 'electron'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    width: 1200,
    // maxHeight: 750,
    // maxWidth: 1300,
    // minHeight: 750,
    // minWidth: 1300,
    useContentSize: true,
    resizable: true,
    fullscreen: false,
    frame: false,
    titleBarStyle: 'customButtonsOnHover'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

// 利用ipc让html标签获取主进程的方法,最小化,最大化,关闭
ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e=> {
  if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
  } else {
      mainWindow.maximize()
  }
});
ipcMain.on('close', e => mainWindow.close());

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})