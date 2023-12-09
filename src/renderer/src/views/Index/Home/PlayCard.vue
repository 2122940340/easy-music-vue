<template>
  <div @click="songlist()" class="playcard">
    <p class="title">{{ title }}</p>
    <img v-lazy="icon" alt="" class="icon" />
    <div v-bind:style="{ backgroundColor: backdrop }" class="back"></div>
    <svg
      @click.stop="play"
      class="play"
      t="1700460162725"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7951"
      data-spm-anchor-id="a313x.search_index.0.i17.67d83a81ahhhwI"
      width="20"
      height="20"
    >
      <path
        d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
        fill="#ffffff"
        p-id="7952"
        data-spm-anchor-id="a313x.search_index.0.i18.67d83a81ahhhwI"
        class="selected"
      ></path>
    </svg>
  </div>
</template>

<script>
import { Music } from '../../../modules/music'
import router from '../../../router'
export default {
  name: 'playCard',
  data() {
    return {
      icon: 'http://p1.music.126.net/7RJ2J312jRV-2-k3wx97w==/109951163632812955.jpg?param=100y100'
    }
  },
  props: {
    title: {
      type: String,
      default: '暂无标题'
    },
    backdrop: {
      type: String,
      default: '#ee99b7'
    }
  },
  mounted() {
    fetch(
      `${window.APIURL}personalized?limit=1&timestamp=${
        new Date().getTime() / 1000+Math.floor(Math.random() * 1000)
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        this.icon = json.result[0].picUrl
        this.songid = json.result[0].id
      })
  },
  methods: {
    play() {
      fetch(APIURL + 'playlist/track/all?id=' + this.songid)
        .then((response) => response.json())
        .then((json) => {
          this.list = json.songs
          window.Music.addSongList(this.list)
          window.Music.play(this.list[0])
        })
    },
    songlist(){
      router.push({
        path:'/songlist',
        state:{
          id: this.songid 
        }
      })
    }
  }
}
</script>

<style scoped>
.playcard {
  background-image: linear-gradient(to top left, #85eebf, #00eaee);
  position: relative;
  overflow: hidden;
  width: calc(100% / 3 - 30px);
  aspect-ratio: 1/1;
  border-radius: 5px;
  margin-left: 30px;
}
.playcard .title {
  font-size: 1.8em;
  font-weight: bold;
  position: absolute;
  top: 15px;
  left: 15px;
  color: #eee;
  z-index: 2;
}
.playcard .back {
  content: '';
  width: 100px;
  height: 100px;
  background-color: #ee99b7;
  position: absolute;
  top: -30px;
  left: -40px;
  border-radius: 50px;
  z-index: 1;
}
.playcard img {
  width: 100%;
  height: 100%;
}
.playcard img:hover {
  zoom: 1.2;
}
.playcard .play {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
