import router from '../renderer/src/router/index'


export class Music {
    constructor(audio) {
        // const fs = require('fs')
        // const fs = require('fs')
        this.audio = audio;
        this.items = document.querySelector(".MusicStatusBar");
        this.duration = this.items.querySelector('.right p:nth-child(3)');
        this.currentTime = this.items.querySelector('.right p:nth-child(1)');
        this.schedule = this.items.querySelector('.scheduleBox p');
        this.icon = this.items.querySelector('#icon');
        this.name = this.items.querySelector('#name');
        this.title = this.items.querySelector('#title');
        this.play_ = this.items.querySelector('#play');
        this.pause_ = this.items.querySelector('#pause');


        this.play_.addEventListener('click', () => {
            this.resume()

        });
        this.pause_.addEventListener('click', () => {
            this.pause()

        })

        this.icon.addEventListener('click', () => {
            // console.log(111)
            router.push({
                name: 'play',
            })
           
        })

    }
    // 下一首
    nextSong() {
        const path = './user/data/playlist.json'
        let datas = window.fs.readFileSync(path, 'utf-8', err => { })
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
        window.fs.writeFile(path, JSON.stringify(data), (err) => { })
        if (data.data[data.id] === undefined) {

        } else {
            this.play(data.data[data.id])
        }
    }
    // 上一首
    previousSong() {
        const path = './user/data/playlist.json'
        let datas = window.fs.readFileSync(path, 'utf-8', err => { })
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
        window.fs.writeFile(path, JSON.stringify(data), (err) => { })
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
        const path = './user/data/playlist.json'
        console.log(path)
        window.fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
            } else {
                data = JSON.parse(data)
                if (typeof data === String) {
                    data = JSON.parse(data)
                }
                data.id += 1
                for (let i = 0; i <= data.data.length; i++) {
                    if (data.data[i] != undefined) {
                        if (data.data[i].songid == this.array.songid) {
                            console.log(data.data[i].songid);
                            data.id = i + 1;
                            console.log(11111)
                            return void 0;
                            // break;
                        } else {
                            console.log(1111)
                        }
                    }
                }
                data.data.push(this.array);
                window.fs.writeFile(path, JSON.stringify(data), (err) => { })
            }

        })
        // console.log(datas)
    }

    // 播放时间
    time() {
        clearInterval(this.timer);

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

    async play(array, coordinate = {}, previousCode = false) {
        console.log(array)
        // console.log(audio)
        this._url = array.url
        this._title = array.title
        this._pic = array.pic
        this._name = array.author
        this.array = array

        this.pause();

        this.icon.src = this._pic
        this.title.innerHTML = this._title
        this.name.innerHTML = this._name

        // this.data = array
        // console.log(array)
        // //是否添加歌单
        // if (previousCode = false) {

        // } else {
        // }


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
        this.audio.src = this._url
        this.audio.title = array.title;
        this.audio.author = array.author;
        this.audio.load();
        this.audio.play(); //开始播放

        this.resume();
        // 添加播放列表
        this.songAdd()
        this.time();
    }
}
// console.log(new Music())
// export const music = new Music();