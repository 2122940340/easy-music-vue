
import router from '../router/index'
import { MusicTool } from './musicTool';
export class Music extends MusicTool {
    constructor(audio, $refs) {
        super()
        this.audio = audio
        this.dataArray = {};
    }
    // 初始化
    start() {
        this.listPath = './user/data/playlist.json'
        this.platListPath = './user/data/playlist.json'
        this.likeListPath = './user/data/likelist.json'
        this.downloadListPath = './user/download/downloadList.json'
        this.likeSongListPath = './user/data/likesonglist.json'
        this.items = document.querySelector(".MusicStatusBar");
        this.duration = this.items.querySelector('.right p:nth-child(3)');
        this.currentTime = this.items.querySelector('.right p:nth-child(1)');
        this.scheduleBox = this.items.querySelector('.scheduleBox');
        this.schedule = this.items.querySelector('.scheduleBox p');
        this.schedules = this.items.querySelector('.scheduleBox #schedules');
        this.icon = this.items.querySelector('#icon');
        this.name = this.items.querySelector('#name');
        this.title = this.items.querySelector('#title');
        this.play_ = this.items.querySelector('#play');
        this.pause_ = this.items.querySelector('#pause');
        this.playList = document.querySelector('.playList');
        this.playListIcon = this.items.querySelector('.playListIcon')
        this.like = this.items.querySelector('.likes')
        this.likes = this.items.querySelector('.islike')
        this.downloadIcon = this.items.querySelector('.downloadIcon')
        this.inception()
        // 绑定事件
        this.click()
    }
    // 下载
    download() {
        let array = JSON.parse(JSON.stringify(this.array))
        console.log(this._url, this.array, array)

        window.electron.ipcRenderer.send('download', {
            url: this._url,
            path: 'music',
            array: array
        });

    }
    // 按钮事件
    click() {
        //拖动
        this.pace()
        //下载按钮
        this.downloadIcon.addEventListener('click', () => {
            this.download()
        })
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
        // 监听下载回调
        window.electron.ipcRenderer.on('Notification', (event, msg, array) => {
            const n = new Notification('下载完成', msg)
            n.onclick = () => {
                router.push({
                    path: '/download',
                })
            }
            const datas = fs.readFileSync(this.downloadListPath, 'utf-8', err => { })
            let data = JSON.parse(datas)
            if (typeof data === String) {
                data = JSON.parse(data)
            }
            if (data.data.length != 0) {
                for (let i in data.data) {
                    if (data.data[i].songid == array.songid) {
                        data.data[i] = array
                        break
                    } else {
                        data.data.unshift(array)
                    }
                }
            } else {
                data.data.unshift(array)
            }
            fs.writeFile(this.downloadListPath, JSON.stringify(data), err => { })
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
            let duration = this.audio_size(this.audio.duration);
            let currentTime = this.audio_size(this.audio.currentTime);

            if (isNaN(this.audio.duration)) {
                currentTime = '00:00'
                duration = '00:00'
            }

            this.currentTime.innerHTML = currentTime;
            this.duration.innerHTML = duration;

            if (this.audio.currentTime >= this.audio.duration) {
                this.nextSong()
            }


            const value = (this.audio.currentTime / this.audio.duration * 100) * (this.schedule.parentNode.clientWidth / 100)
            this.schedule.style.width = value + 'px'
            this.schedules.style.left = value + 'px'
            this.lrcList.forEach(item => {
                if (item.time == currentTime) {
                    this.lrc = item
                }
            })
        }, 1000)
    }
    // 时间转换
    audio_size(num) {
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
    async play(array, isAnalysis = false) {
        if (array.songid == null || array.songid == undefined) {
            this.getURL(array)
            return false
        }
        this._url = array.url
        this._title = array.title
        this._pic = array.pic
        this._name = array.author
        this.array = array
        this._songid = array.songid;
        // this.pause();
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
        this.audio.title = array.title;
        this.audio.author = array.author;
        this.codePlay = true
        this.audio.src = this._url;
        this.audio.load();
        this.audio.play(); //开始播放
        this.audio.addEventListener('error', () => {
            if (this.codePlay) {
                this.codePlay = false
                const n = new Notification('播放失败', {
                    icon: this._pic,
                    body: `音乐 ${this._title} - ${this._name} 播放失败，可能是音乐 已经被下架 或者 音乐文件被删除。已删除对应的记录`,
                    image: this._pic,
                })
                n.onclick = () => {
                    router.push({
                        path: '/search',
                        state: {
                            value: `${this._title} - ${this._name}`
                        }
                    })
                }
                this.nextSong()

            }

        });
        this.audio.addEventListener('canplaythrough', () => {
            this.resume();
            // 添加播放列表
            this.songAdd()
            //记时
            this.time();
            // 歌单更新
            // this.inception()
            //是否收藏
            this.isLike(this._songid)
        })


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
                this.play(response.data[0]);
            })
    }
}