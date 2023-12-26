
const click = () => {
    //接收关闭命令
    ipcMain.on('window-close', function () {
        mainWindow.close();
    })
    //接收最小化命令
    ipcMain.on('window-min', function () {
        mainWindow.minimize();
    })

}
module.exports = click;