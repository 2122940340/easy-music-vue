/*
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-03 18:59:36
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-05 19:31:41
 * @FilePath: \easy-music-vue-edition\src\preload\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { contextBridge, ipcRenderer, ipcMain, } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// import { Music } from '../renderer/src/modules/music.js'
// const Music = require('./music.js')
const fs = require('fs');
const path = require("path");

// Custom APIs for renderer
const api = {
}
// const music = new Music(new Audio())
// contextBridge.exposeInMainWorld('electron', {
//   ping: () => ipcRenderer.invoke('ping')
// })
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.



const fileList = [
  {
    path: './user/data',
    name: 'playlist.json',
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1,
    })
  },
  {
    path: './user/data',
    name: 'songlist.json',
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1,
    })
  },
  {
    path: './user/data',
    name: 'likelist.json',
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1,
    })
  },
  {
    path: './user/data',
    name: 'likesonglist.json',
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1,
    })
  }
]

// 文件检测
fileList.forEach(item => {
  fs.access(item.path + '/' + item.name, err => {
    if (err) {
      fs.mkdir(item.path, { recursive: true }, err => {
        if (err) {
          console.log(err)
        } else {
          fs.writeFileSync(item.path + '/' + item.name, item.content, err = {
            if(err) {
              error('文件错误,请尝试重装软件');
            }
          })
        }
      })
    }
  })
})



console.log(ipcRenderer)
// 暴露接口
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('fs', fs)
    contextBridge.exposeInMainWorld('path', path)
    contextBridge.exposeInMainWorld('ipcRenderer',ipcRenderer)
    contextBridge.exposeInMainWorld('ipcRendererOn',ipcRenderer.on)
    contextBridge.exposeInMainWorld('ipcMain',ipcMain)

    contextBridge.exposeInMainWorld('APIURL', 'http://localhost:3000/')
  } catch (error) {
    console.error(error)
  }

} else {
  window.electron = electronAPI
  window.api = api
  window.fs = fs
  window.ipcMain = ipcMain
  window.APPURL = 'http://localhost:3000/'


  contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping')
  })
}
