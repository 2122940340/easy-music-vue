import router from '../router/index'


export class Music {
    constructor(audio, $refs) {
        this.audio = audio
        this.dataArray = {};
        // const fs = require('fs')
        // const fs = require('fs')

    }
    // 下一首
    start() {
        this.listPath = './user/data/playlist.json'
        this.likeListPath = './user/data/likelist.json'
        // this.listPath = './user/data/songlist.json'
        this.items = document.querySelector(".MusicStatusBar");
        this.duration = this.items.querySelector('.right p:nth-child(3)');
        this.currentTime = this.items.querySelector('.right p:nth-child(1)');
        this.schedule = this.items.querySelector('.scheduleBox p');
        this.icon = this.items.querySelector('#icon');
        this.name = this.items.querySelector('#name');
        this.title = this.items.querySelector('#title');
        this.play_ = this.items.querySelector('#play');
        this.pause_ = this.items.querySelector('#pause');
        this.playList = document.querySelector('.playList');
        this.like = this.items.querySelector('.likes')
        this.likes = this.items.querySelector('.islike')
        this.inception()
        // 绑定事件
        this.click()
    }

    // 按钮事件
    click() {
        // 播放
        this.play_.addEventListener('click', () => {
            this.resume()

        });
        // 暂停
        this.pause_.addEventListener('click', () => {
            this.pause()

        })
        // 跳转播放
        this.icon.addEventListener('click', () => {
            router.push({
                name: 'play',
            })
        })

        // 收藏
        this.like.addEventListener('click', () => {
            this.like.style.display = 'none'
            this.likes.style.display = 'block'
            this.songLike(this.array);
        })
        // 取消收藏
        this.likes.addEventListener('click', () => {
            this.like.style.display = 'block'
            this.likes.style.display = 'none'
        })
    }
    // 是否收藏
    isLike(id) {
        const datas = fs.readFileSync(this.likeListPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        for (let i in data.data) {
            if (data.data[i].songid == id) {
                this.like.style.display = 'none'
                this.likes.style.display = 'block'
                console.console.log(('有'));
                break
            } else {
                this.like.style.display = 'block'
                this.likes.style.display = 'none'
                this.songLikeDelete(this._songid)
            }
        }
    }
    // 取消收藏歌曲
    songLikeDelete(id) {
        const datas = fs.readFileSync(this.likeListPath, 'utf-8', err => { })
        console.log(datas)
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
        this.listPath = './user/data/songlist.json'
        const datas = fs.readFileSync(this.listPath, 'utf-8', err => { })
        let data = JSON.parse(datas)
        if (typeof data === String) {
            data = JSON.parse(data)
        }
        data.data = [...list]
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
        // this.play(data.data[data.id])
        // this.pause()
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
    resume() {
        this.audio.play();
        console.log(1111)
        this.play_.style.display = 'none';
        this.pause_.style.display = 'flex';
    }
    pause() {
        this.audio.pause();
        this.play_.style.display = 'flex';
        this.pause_.style.display = 'none';
    }
    // 添加到播放列表
    songAdd() {
        window.fs.readFile(this.listPath, 'utf-8', (err, data) => {
            if (err) {
            } else {
                data = JSON.parse(data)
                if (typeof data === String) {
                    data = JSON.parse(data)
                }
                for (let i = 0; i <= data.data.length; i++) {
                    if (data.data[i] != undefined) {
                        if (data.data[i].songid == this.array.songid) {
                            console.log(data.data[i].songid);
                            data.id = i;
                            window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
                            return void 0;
                            // break;
                        } else {
                        }
                    }
                }
                data.id = data.id + 1
                if (this.array.songid != undefined) {
                    data.data.splice(data.id, 0, this.array)
                } else {

                }
                window.fs.writeFile(this.listPath, JSON.stringify(data), (err) => { })
            }
        })
    }
    // 歌词
    lyric() {

    }
    lyricList() {
        this.array.lrc.split('[').forEach((item, index) => {
            if (item != undefined || item != ' ') {
                let time = item.split(']')[0].split('.')[0]
                let lrc = item.split(']')[1]
                this.lrcList.push({ 'lrc': lrc, 'time': time })
            }
        });
    }
    // 播放时间
    time() {
        clearInterval(this.timer);
        this.lrcList = [

        ]
        this.lyricList()
        this.timer = setInterval(() => {
            //总
            let duration = audio_size(this.audio.duration);
            let currentTime = audio_size(this.audio.currentTime);
            this.currentTime.innerHTML = currentTime;
            this.duration.innerHTML = duration;
            if (this.audio.currentTime >= this.audio.duration) {
                this.nextSong()
            }
            const value = (this.audio.currentTime / this.audio.duration * 100) * (this.schedule.parentNode.clientWidth / 100)
            this.schedule.style.width = value + 'px'


            this.lrcList.forEach(item => {
                if (item.time == currentTime) {
                    this.lrc = item
                }
            })
            // console.log(this.lrcList.time[currentTime] )
            // console.log(this.lrcList.time)
            // this.lrc = this.lrcList[currentTime] 
            // this.schedule.value = this.audio.currentTime / this.audio.duration * 100;
        }, 1000)
        // 时间转换
        function audio_size(num) {
            let num1 = Math.trunc(Math.trunc(num) / 60);
            let num2 = Math.trunc(Math.trunc(num) % 60);
            if (num1 < 10) {
                num1 = "0" + Math.trunc(Math.trunc(num) / 60);
            }
            if (num2 < 10) {
                num2 = "0" + Math.trunc(Math.trunc(num) % 60);
            }
            return num1 + ":" + num2;
        }
    }

    async play(array, isAnalysis = false) {
        console.log(array)
        if (isAnalysis) {
            this.getURL(array)
            return false
        }
        this._url = array.url
        this._title = array.title
        this._pic = array.pic
        this._name = array.author
        this.array = array
        this._songid = array.songid;
        this.pause();
        this.icon.src = this._pic
        this.title.innerHTML = this._title
        this.name.innerHTML = this._name

        // 模拟播放
        const AudioTime = async () => {
            while (isNaN(this.audio.duration) || this.audio.duration === Infinity) {
                {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    audio.currentTime = 1 * Math.random();
                }
            }
        }
        // 写入链接
        this.audio.crossOrigin = 'anonymous';
        this.audio.src = this._url;
        this.audio.title = array.title;
        this.audio.author = array.author;
        this.audio.load();
        this.audio.play(); //开始播放

        this.resume();
        // 添加播放列表
        this.songAdd()
        //记时
        this.time();
        // 歌单更新
        // this.inception()
        //是否收藏
        this.isLike(this._songid)

        //音频可视化
       
        // }, 1000)

    }
    getURL(i) {
        let data = {
            "input": "https://music.163.com/#/song?id=" + i.id,
            "filter": "url",
            "type": '_',
            "page": 1,
        }
        const formData = new FormData();
        Object.keys(data).map((key) => {
            formData.append(key, data[key])
        })
        // myHeaders.append("Hm_lpvt_50027a9c88cdde04a70f5272a88a10fa", "1587636659");
        fetch('https://music.liuzhijin.cn/', {
            method: 'post',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Hm_lpvt_50027a9c88cdde04a70f5272a88a10fa": "1587636659",
            },
            credentials: 'include',
            body: formData
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                this.play(response.data[0]);
            })
    }
}