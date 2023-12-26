"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const fs = require("fs");
const path = require("path");
const APPDATA = preload.electronAPI.process.env.APPDATA + "\\esay-music";
const api = {};
const fileList = [
  {
    path: APPDATA + "/user/data",
    name: "playlist.json",
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1
    })
  },
  {
    path: APPDATA + "/user/data",
    name: "songlist.json",
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1
    })
  },
  {
    path: APPDATA + "/user/data",
    name: "likelist.json",
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1
    })
  },
  {
    path: APPDATA + "/user/data",
    name: "likesonglist.json",
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1
    })
  },
  {
    path: APPDATA + "/user/download",
    name: "downloadList.json",
    content: JSON.stringify({
      code: 1,
      data: [],
      id: -1
    })
  }
];
fileList.forEach((item) => {
  fs.access(item.path + "/" + item.name, (err) => {
    if (err) {
      fs.mkdir(item.path, { recursive: true }, (err2) => {
        if (err2) {
          console.log(err2);
        } else {
          fs.writeFileSync(item.path + "/" + item.name, item.content, err2 = {
            if(err3) {
              error("文件错误,请尝试重装软件");
            }
          });
        }
      });
    }
  });
});
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("fs", fs);
    electron.contextBridge.exposeInMainWorld("shell", electron.shell);
    electron.contextBridge.exposeInMainWorld("ipcRendererOn", electron.ipcRenderer.on);
    electron.contextBridge.exposeInMainWorld("APIURL", "http://api.tiank.top/");
    electron.contextBridge.exposeInMainWorld("APPDATA", APPDATA);
  } catch (error2) {
    console.error(error2);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
  window.fs = fs;
  window.shell = electron.shell;
  window.APPURL = "http://api.tiank.top/";
  electron.contextBridge.exposeInMainWorld("electron", {
    ping: () => electron.ipcRenderer.invoke("ping")
  });
}
