<template>
  <div class="Play">
    <svg
      class="end icon"
      @click="$router.go(-1)"
      t="1701086358349"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="9375"
      width="30"
      height="30"
    >
      <path
        d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
        p-id="9376"
        fill="#ffffff"
      ></path>
    </svg>
    <img class="back" :src="icon" alt="" />
    <div ref="mask" class="mask"></div>
    <canvas ref="canvas" class="can"></canvas>
    <div class="left">
      <img ref="icon" id="icon" :src="icon" alt="" />
    </div>
    <div class="right">
      <p id="title">{{ title }}</p>
      <p id="name">{{ name }}</p>
      <ul ref="scroll" class="list">
        <li :data-time="i.time" v-for="i in list" v-bind:key="i">
          {{ i.lrc }}
        </li>
      </ul>
    </div>
    <div class="theme">
      <p @click="defaults" class="default">默认模式</p>
      <p @click="immerse" class="immerse">沉浸模式</p>
    </div>
    <div class="barrage">
      <ul>
        <li
          :style="{
            top: 35 * index + 'px',
            animationDelay: Math.random() * (10 - 1) + 1 + 's'
          }"
          v-for="(i, index) in hotList"
          :key="(i, index)"
        >
          <p>{{ i.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import router from '../../router/index'
var seti
export default {
  setup() {
    const route = useRoute()
  },
  data() {
    return {
      icon: '',
      title: '轻松音乐',
      nmae: '未知歌手',
      tops: false,
      list: {
        lrc: [],
        time: []
      },
      hotList: {}
    }
  },
  methods: {
    immerse() {
      this.$refs.mask.classList.add('masks')
      this.$refs.canvas.style.display = 'block'
    },
    defaults() {
      this.$refs.mask.classList.remove('masks')
      this.$refs.canvas.style.display = 'none'
    },
    start(list) {
      const cvs = document.querySelector('canvas')
      this.list = window.Music.lrcList
      if (window.Music.lrcList != undefined || window.Music.lrcList != '') {
        this.time()
        this.icon = window.Music._pic
        this.name = window.Music._name
        this.title = window.Music._title
      }
    },
    time(lrc) {
      const ul = this.$refs.scroll
      let list
      clearInterval(window.set)
      window.set = setInterval(() => {
        //vue实在不道咋写，只能操作原生了 by tiank 11.27
        list = document.querySelectorAll('li')
        list.forEach((item, index) => {
          if (item.getAttribute('data-time') == window.Music.lrc.time) {
            item.classList.add('selected')
            console.log(item,window.Music.lrc.time)
            ul.scrollTo(0, item.getBoundingClientRect().height * index)
          } else {
            item.classList.remove('selected')
          }
        })
        if (ul != null) {
          let chang = ul.scrollHeight / list.length
          //无视性能，拥抱结果  by tiank 11.28
          this.list = window.Music.lrcList
          this.icon = window.Music._pic
          this.name = window.Music._name
          if (this.$refs.icon.src != window.Music._pic) {
            fetch(window.APIURL + 'comment/hot?id=' + Music._songid + '&type=0&limit=20')
              .then((response) => response.json())
              .then((json) => {
                this.hotList = json.hotComments
              })
          }
          this.time()
        }

        this.title = window.Music._title
      }, 1000)
    }
  },
  mounted() {
    // console.log(window)
    const cvs = document.querySelector('canvas')
    const ctx = cvs.getContext('2d')
    // 初始化 canvas 尺寸
    function initCvs() {
      cvs.width = (window.innerWidth / 2) * devicePixelRatio
      cvs.height = (window.innerHeight / 2) * devicePixelRatio
    }
    initCvs()

    const audioCtx = new AudioContext()
    const source = audioCtx.createMediaElementSource(Music.audio) // 创建音频源节点
    let analyser = audioCtx.createAnalyser() // 创建分析器
    analyser.fftSize = 512 // 设置分析器的 fft 大小
    Music.audio.dataArray = new Uint8Array(analyser.frequencyBinCount)
    source.connect(analyser) // 连接分析器
    analyser.connect(audioCtx.destination) // 连接音频上下文和分析器
    const draw = () => {
      requestAnimationFrame(draw)
      const { width, height } = cvs
      ctx.clearRect(0, 0, width, height)
      analyser.getByteFrequencyData(Music.audio.dataArray)

      const len = Music.audio.dataArray.length / 2
      // 每个柱子的宽度
      const barWidth = width / len / 1
      for (let i = 0; i < len; i++) {
        const data = Music.audio.dataArray[i] // <256
        const barHeight = (data / 250) * height
        // 二个 x 点画出对称图形
        const x1 = i * barWidth + width / 2
        const x2 = width / 2 - i * barWidth
        const y = height - barHeight
        ctx.fillStyle = '#00ffd9'
        ctx.fillRect(x1, y, barWidth - 0, barHeight)
        ctx.fillRect(x2, y, barWidth - 0, barHeight)
      }
    }
    draw()
  }
}
</script>
<style>
.Play {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.Play .end {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  left: 40px;
  z-index: 10;
}

.Play .left {
  min-width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.Play .left #icon {
  min-width: 250px;
  min-height: 250px;
}

.Play .right {
  min-width: 50%;
  height: calc(100% - 100px);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.Play .theme {
  color: #ffffff;
  position: absolute;
  right: 25px;
  top: 25px;
}

.Play .theme p {
  margin-bottom: 10px;
}

.Play .back {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -3;
  filter: blur(30px);
  object-fit: cover;
  transform: scale(1.2);
}

.Play .can {
  width: 70%;
  height: 60%;
  position: absolute;
  z-index: -1;
  filter: blur(100px);
  top: 20%;
  left: 15%;
}

.Play .mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  z-index: -2;
}

.Play .masks {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 0;
  z-index: -2;
}

.Play #title {
  font-size: 2em;
  font-weight: bold;
  color: #ffffff;
  margin-top: 100px;
  text-align: center;
}

.Play #name {
  font-size: 1em;
  color: #0af8f1;
  margin-top: 15px;
  text-align: center;
}

.Play .list {
  height: 100%;
  margin-top: 30px;
  color: #fff;
  overflow: scroll;
  scroll-behavior: smooth;
}

.Play .list li {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  height: 50px;
  transition: all 0.5s;
}

.Play .list .selected {
  font-size: 1.5em;
  color: #0af8f1;
}

.Play .barrage {
}

.Play .barrage ul {
  height: 400px;
  overflow: hidden;
}

.Play .barrage li {
  padding: 5px 15px;
  max-width: 200px;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  position: absolute;
  z-index: 10;
  top: 0;
  right: -500px;
  animation: ant 15s linear infinite;
}

.Play .barrage li p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes ant {
  0% {
  }

  100% {
    right: 120vw;
  }
}
</style>
