import router from '../router/index'
import { MusicTool } from './musicTool';


export class Music extends MusicTool{
    constructor(audio, $refs) {
        super() 
        this.audio = audio
        this.dataArray = {};
    }
    // 下一首
    start() {
        this.listPath = './user/data/playlist.json'
        this.platListPath = './user/data/playlist.json'
        this.likeListPath = './user/data/likelist.json'
        this.likeSongListPath = './user/data/likesonglist.json'
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
        this.playListIcon = this.items.querySelector('.playListIcon')
        this.like = this.items.querySelector('.likes')
        this.likes = this.items.querySelector('.islike')
        this.downloadIcon = this.items.querySelector('.download')
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

            this.lrcList.forEach(item => {
                if (item.time == currentTime) {
                    this.lrc = item
                }
            })
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
        this.audio.title = array.title;
        this.audio.author = array.author;

        this.audio.src = this._url;
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

        setTimeout(() => {
            console.log(this.audio.duration)
            if (isNaN(this.audio.duration)) {
                this.nextSong()
            }
        }, 3000)

        //音频可视化

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