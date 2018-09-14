const fs = require('fs');
const path = require('path');
const dirpath = require('./dir').dirpath;
const {
    ipcMain
} = require('electron');


var fileList = [];

ipcMain.on('files-message', function (event, arg) {
    let filePath = path.resolve(dirpath);
    filePath = (JSON.parse(arg)).filePath;
    fileDisplay(filePath, function (filedir) {
        fileList.push(filedir);
    });
  
});


function fileDisplay(filePath, callback) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
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
                        var isImg = function () {
                            var res = false;
                            if ((filename.split(".")[1]) == 'png' || (filename.split(".")[1]) == 'jpeg' || (filename.split(".")[1]) == 'jpg' || (filename.split(".")[1]) == 'gif') {
                                res = true
                            }
                            // console.log("res:",res);
                            return res
                        }
                        // var isDir = stats.isDirectory(); //是文件夹
                        if (isFile&&isImg()) {
                            callback(filedir);
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


module.exports = {
    fileList: fileList
}