import { contextBridge, ipcRenderer, ipcMain, } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// import { Music } from '../renderer/src/modules/music.js'
// const Music = require('./music.js')
const fs = require('fs');
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
      id: 0,
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



// 暴露接口
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('fs', fs)
  } catch (error) {
    console.error(error)
  }

} else {
  window.electron = electronAPI
  window.api = api
  window.fs = fs
  window.music = '111'
  console.log(888888)

  contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping')
  })
}
