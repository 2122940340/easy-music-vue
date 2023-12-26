<template>
  <updateVue></updateVue>
  <div class="region"></div>
  <router-view ref="Plays" class="App" v-slot="{ Component }">
    <Transition name="fade">
      <keep-alive>
        <component ref="Main" :is="Component"></component>
      </keep-alive>
    </Transition>
  </router-view>
  <div>
    <MusicStatusBar ref="MusicStatusBar" class="MusicStatusBar"></MusicStatusBar>
  </div>
</template>
<script>
import router from './router/index'
import MusicStatusBar from './views/Play/MusicStatusBar.vue'
import { ref } from 'vue'
import { Music } from './modules/music'
import updateVue from './components/update.vue' //更新模块

let audio = new Audio()
window.Music = new Music(audio)
export default {
  components: {
    MusicStatusBar,
    updateVue
  },
  props: {
    blur: Object
  },
  data() {
    return {}
  },
  methods: {},
  activated() {},
  async mounted() {
    //游客登录
    fetch(window.APIURL + 'register/anonimous')
      .then((data) => data.json())
      .then(async (json) => {
        await router.push({
          path: '/home'
        })
        this.tagActive('/home')
        this.home = this.$refs.Main
        window.Music.start()
      })
  },
  methods: {
    tagActive(path) {
      // 标签激活
      console.log(document.querySelectorAll('.tag'))
      document.querySelectorAll('.tag').forEach((item) => {
        if (path == item.getAttribute('data-path')) item.classList.add('active')
        else item.classList.remove('active')
      })
    }
  },
  watch: {
    async $route(to, from) {
      this.tagActive(to.path)

      if (to.path != '/play') {
        this.$refs.MusicStatusBar.styleColor = {
          color: '#000',
          fill: '#000'
        }
      }
      switch (to.path) {
        case '/play':
          this.$refs.MusicStatusBar.styleColor = {
            color: '#fff',
            fill: '#fff'
          }
          window.Music.up.style.color = '#fff'
          window.Music.next.style.color = '#fff'
          window.Music.like.style.color = '#fff'
          window.Music.likes.style.color = '#fff'
          window.Music.playListIcon.style.color = '#fff'
          window.Music.downloadIcon.style.color = '#fff'
          window.Music.speeds.style.color = '#fff'
          window.Music.speeds.style.border = '1px solid #fff'

          console.log(window.Music.speeds)
          break
        case '/home':
          this.$refs.MusicStatusBar.styleColor = {
            color: '#000',
            fill: '#000'
          }
          window.Music.up.style.color = '#000'
          window.Music.next.style.color = '#000'
          window.Music.like.style.color = '#717171'
          window.Music.likes.style.color = '#f00000'
          window.Music.playListIcon.style.color = '#717171'
          window.Music.downloadIcon.style.color = '#717171'
          window.Music.speeds.style.color = '#717171'
          window.Music.speeds.style.border = '1px solid #717171'

          // SvgColor(window.Music.like.querySelectorAll('path'), '#717171')
          // SvgColor(window.Music.likes.querySelectorAll('path'), '#f00000')
          // SvgColor(window.Music.playListIcon.querySelectorAll('path'), '#717171')
          // SvgColor(window.Music.downloadIcon.querySelectorAll('path'), '#717171')
          break
      }
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont'; /* Project id 4388505 */
  src:
    url('./assets/font/iconfont.woff2') format('woff2'),
    url('./assets/font/iconfont.woff') format('woff'),
    url('./assets/font/iconfont.ttf') format('truetype');
}
i {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
svg:hover path {
  fill: #0ccfb1;
}

.App {
  width: 100%;
  height: calc(100vh - 80px);
}

.region {
  width: 100vw;
  height: 25px;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-app-region: drag;
}

html,
body {
  width: 100vw;
  height: 100vh;
}

ul {
  list-style: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave {
}

.MusicStatusBar {
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
}

*::-webkit-scrollbar {
  height: 0;
  display: none;
}
</style>
