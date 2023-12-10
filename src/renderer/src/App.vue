<template>
  <div class="region"></div>
  <router-view ref="Plays" class="App" v-slot="{ Component }">
    <Transition name="fade">
      <keep-alive>
        <component ref="Main" :is="Component"></component>
      </keep-alive>
    </Transition>
  </router-view>
  <MusicStatusBar ref="MusicStatusBar" class="MusicStatusBar"></MusicStatusBar>
</template>
<script>
import { Music } from './modules/music'
import router from './router/index'
import MusicStatusBar from './views/Play/MusicStatusBar.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

let audio = new Audio()
window.Music = new Music(audio)
export default {
  components: {
    MusicStatusBar
  },
  data() {
    return {}
  },
  methods: {},
  activated() {},
  async mounted() {
     await router.push({
      path: '/home'
    })
    this.tagActive('/home')
    this.home = this.$refs.Main
    window.Music.start()
    fetch(window.APIURL + 'register/anonimous')
      .then((data) => data.json())
      .then((json) => {})
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
          SvgColor(window.Music.like.querySelectorAll('path'), '#fff')
          SvgColor(window.Music.likes.querySelectorAll('path'), '##fff')
          SvgColor(window.Music.playListIcon.querySelectorAll('path'), '#fff')
          SvgColor(window.Music.downloadIcon.querySelectorAll('path'), '#fff')

          function SvgColor(item, color) {
            item.forEach((items) => {
              items.style.fill = color
              items.style.color = color
            })
          }
          break
        case '/home':
          this.$refs.MusicStatusBar.styleColor = {
            color: '#000',
            fill: '#000'
          }
          SvgColor(window.Music.like.querySelectorAll('path'), '#717171')
          SvgColor(window.Music.likes.querySelectorAll('path'), '#717171')
          SvgColor(window.Music.playListIcon.querySelectorAll('path'), '#717171')
          SvgColor(window.Music.downloadIcon.querySelectorAll('path'), '#717171')
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
