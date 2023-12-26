/*
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-04 19:03:39
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-04 19:08:39
 * @FilePath: \easy-music-vue-edition\src\renderer\src\modules\musicTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class MusicTool {

    //倍速播放
    speed(size = 1.0){
        this.audio.playbackRate  = size
    }
    //进度条拖动
    pace() {
        this.schedules.onmousedown = (event) => {
            // 元素距离最左边的位置，理解为：你的 left 值是多少
            let offsetLeft = this.schedules.offsetLeft
            let offsetTop = this.schedules.offsetTop

            // 元素距离最左边的位置（注意：这个位置是鼠标点下去距离浏览器左边的位置，是包含 div 元素的）
            let x = event.clientX - offsetLeft
            let y = event.clientY - offsetTop
            this.schedules.style.transition = 'all 0s'
            this.schedule.style.transition = 'all 0s'
            document.onmousemove = (event) => {
                this.pause()
                let left = event.clientX - x
                this.schedules.style.left = left + 'px'
                this.schedule.style.width = left + 'px'
                this.schedules.style.top = top + 'px'
                document.onmouseup = (event) => {
                    let time = (event.clientX / window.innerWidth * 100) * (this.audio.duration / 100)
                    this.audio.currentTime = time

                    this.lrc.time = this.audio_size(this.audio.currentTime)
                    document.onmousemove = null
                    this.schedules.style.transition = 'all 1s'
                    this.schedules.style.transition = 'all 1s'
                    document.onmouseup = null
                }
            }

        }
    }
    // 删除下载
    downloadDelete(id) {
        const datas = fs.readFileSync(this.downloadListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.data.splice(data.data[id], 1)
        try {
            window.fs.unlinkSync(data.data[id].path)
        }
        catch (e) {
            
        }
        window.fs.writeFile(this.downloadListPath, JSON.stringify(data), (err) => { })
        return data
    }
    // 下载列表
    downloadList() {
        const datas = fs.readFileSync(this.downloadListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        return data
    }
    // 是否收藏
    isLike(id) {
        const datas = fs.readFileSync(this.likeListPath, 'utf-8', (err, content) => {
            console.log(content)
            let data = JSON.parse(content)
            if (typeof data === String) {
                data = JSON.parse(data)
            }
            for (let i in data.data) {
                if (data.data[i].songid == id) {
                    this.like.style.display = 'none'
                    this.likes.style.display = 'block'
                    break
                } else {
                    this.like.style.display = 'block'
                    this.likes.style.display = 'none'
                    this.songLikeDelete(this._songid)
                }
            }
        })

    }
    // 取消收藏歌曲
    songLikeDelete(id) {
        const datas = fs.readFileSync(this.likeListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        for (let i in data.data) {
            let item = data.data[i]
            if (item.songid == id) {
                data.data.splice(i, 1)
            }
        }
        window.fs.writeFile(this.likeListPath, JSON.stringify(data), (err) => { })
    }
    //收藏歌单
    likeSongLike(array) {
        const datas = fs.readFileSync(this.likeSongListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        for (let i in data.data) {
            if (data.data[i].id == array.id) {
                console.log('有')
                return
                break
            }
        }
        data.data.unshift({
            name: array.name,
            description: array.description,
            id: array.id
        })
        window.fs.writeFile(this.likeSongListPath, JSON.stringify(data), (err) => { })
    }
    //取消收藏歌单
    likeSongLikeDelete(id) {
        const datas = fs.readFileSync(this.likeSongListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        for (let i in data.data) {
            let item = data.data[i]
            if (item.id == id) {
                data.data.splice(i, 1)
            }
        }
        window.fs.writeFile(this.likeSongListPath, JSON.stringify(data), (err) => { })
    }
    // 收藏歌曲
    songLike(array) {
        const datas = fs.readFileSync(this.likeListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.data.unshift(array);
        window.fs.writeFile(this.likeListPath, JSON.stringify(data), (err) => { })
    }
    // 新增歌单
    addSongList(list) {
        const datas = fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.data = list
        data.id = 0
        window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
        this.list = data
    }
    // 初始化歌单
    inception() {
        const datas = fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        this.list = data
    }
    // 删除歌单的歌
    songListDelete(id) {
        const path = './user/data/playlist.json'
        const datas = fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.data.splice(id, 1)
        window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
    }
    // 下一首
    nextSong() {
        const path = './user/data/playlist.json'
        let datas = window.fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.id += 1
        if (data.id >= data.data.length) {
            data.id = 0
        } else if (data.id < 0) {
            if (data.data.length == 0) {
                data.id = data.data.length
            } else {
                data.id = data.data.length - 1
            }
        }
        window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
        if (data.data[data.id] === undefined) {

        } else {
            this.play(data.data[data.id])
        }
    }
    // 上一首
    previousSong() {
        const path = './user/data/playlist.json'
        let datas = window.fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.id -= 1
        if (data.id >= data.data.length) {
            data.id = 0
        } else if (data.id < 0) {
            if (data.data.length == 0) {
                data.id = data.data.length
            } else {
                data.id = data.data.length - 1
            }
        }
        window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
        if (data.data[data.id] === undefined) {

        } else {
            this.play(data.data[data.id])
        }

    }
    // 开始播放
    resume() {
        this.audio.play();
        this.play_.style.display = 'none';
        this.pause_.style.display = 'flex';
    }
    //暂停播放
    pause() {
        this.audio.pause();
        this.play_.style.display = 'flex';
        this.pause_.style.display = 'none';
    }
    // 添加到播放列表
    songAdd() {
        window.fs.readFile(this.platListPath, 'utf-8', (err, data) => {
            if (err) {
            } else {
                data = JSON.parse(data)
                if (typeof data === String) {
                    data = JSON.parse(data)
                }
                for (let i = 0; i <= data.data.length; i++) {
                    if (data.data[i] != undefined) {
                        if (data.data[i].songid == this.array.songid || data.data[i].id == this.array.songid) {
                            data.id = i;
                            window.fs.writeFile(this.platListPath, JSON.stringify(data), (err) => { })
                            return void 0;
                        } else {
                        }
                    }
                }
                data.id = data.id + 1
                if (this.array.songid != undefined) {
                    data.data.splice(data.id, 0, this.array)
                } else {

                }
                window.fs.writeFile(this.platListPath, JSON.stringify(data), (err) => { })
            }
        })
    }
}