const fs = require('fs');
const path = require('path');
const dirpath = require('./dir').dirpath;
const {
    ipcMain,
    dialog
} = require('electron');

//打开文件
ipcMain.on('open-message', function (e, arg) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (files) {
        if (files) {
            var f = files[0];
            var filePath = f.replace(f.split('/')[f.split('/').length-1],"");
            fileDisplay(filePath, function (fileList) {
                e.sender.send('files-reply', fileList);
            });
        }
    })
});

//拖入文件
ipcMain.on('files-message', function (e, arg) {
    let filePath = path.resolve(dirpath);
    filePath = (JSON.parse(arg)).filePath;
    fileDisplay(filePath, function (fileList) {
        e.sender.send('files-reply', fileList);
    });
});


function fileDisplay(filePath, callback) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            var list = []
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                var isImg = function () {
                    var res = false;
                    var imgType = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'JPG', 'JPEG', 'PNG', 'GIF', 'ICO'];
                    for (var i in imgType) {
                        if (filename.split(".")[1] == imgType[i]) {
                            res = true
                        }
                    }
                    return res
                }
                if (isImg()) {
                    list.push(filedir)

                }
            });
            callback(list);
        }
    });
}