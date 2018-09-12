import {
  app,
  BrowserWindow,
  ipcMain,
  Tray
} from 'electron'
import { callbackify } from 'util';


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

var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('./static/');
var fileList = [];

//调用文件遍历方法
fileDisplay(filePath,function(filedir){
  fileList = filedir;
console.log('list',fileList);
});

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath,callback) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    console.log(files);
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
    
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            // var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              // fileList.push(filedir)
              // list.push()
              callback(filedir);
              // console.log(filedir);
            }
            // if (isDir) {
            //   fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            // }
          }
        })
      });
      


    }
  });
}



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
    frame: false
    // titleBarStyle: 'customButtonsOnHover'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

// 利用ipc让html标签获取主进程的方法,最小化,最大化,关闭
ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
});
ipcMain.on('close', e => mainWindow.close());



// console.log(getFiles.getImageFiles());


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