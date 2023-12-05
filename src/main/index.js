/*
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-03 18:59:36
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-05 20:08:28
 * @FilePath: \easy-music-vue-edition\src\main\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use strict";
import { contextBridge, Notification, ipcRenderer, ipcMain, app, shell, BrowserWindow, nativeImage } from 'electron'
import { join } from 'path'
const path = require('node:path')
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { array } from 'yargs';

require('../../api/app.js')

// contextBridge.exposeInMainWorld('electron', {
//   ping: () => ipcRenderer.invoke('ping')
// })
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 700,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false

    },
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false,
    frame: false
  })
  ipcMain.handle('ping', () => 'pong')
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  // 监听渲染进程发出的download事件
  ipcMain.on('download', async (evt, args) => {
    var code = false
    console.log('cishu')
    mainWindow.webContents.downloadURL(args.url) // 触发 will-download 事件
    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
      const filePath = path.join(process.cwd(), 'user', 'download', args.path, args.array.title + '-' + args.array.author + '.mp3');
      item.setSavePath(filePath);
      item.on('done', (evt, state) => {
        if (code == true) {

        } else {
          code = true
          mainWindow.webContents.send('Notification', {
            icon: args.array.pic,
            body: `音乐 ${args.array.title} - ${args.array.author} 下载成功`,
            image: args.array.pic
          })
          console.log(code)
        }


      })
    })
  });


  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
