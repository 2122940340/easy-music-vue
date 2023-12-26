<template>
  <div class="MusicStatusBar">
    <div class="scheduleBox">
      <p id="schedule"></p>
      <div id="schedules"></div>
    </div>
    <div class="left">
      <img id="icon" src="/src/assets/icon.png" alt="" />
      <div :style="styleColor">
        <p id="title">轻松音乐</p>
        <div>
          <p id="name">未知歌手</p>
          <i class="likes">&#xe603;</i>
          <i class="islike">&#xe614;</i>
          <i class="downloadIcon">&#xe632;</i>
          <div class="speed">
            <p @click="speed($event)">{{ speedSize }}</p>
            <Speed tabindex="1" ref="speed" v-on:blur="speedBlur()" v-show="speedCode"></Speed>
          </div>
        </div>
      </div>
    </div>
    <div class="play">
      <i id="up" @click="Music.previousSong()">&#xe63c;</i>
      <i id="play">&#xe638;</i>
      <i id="pause">&#xe639;</i>
      <i id="nextSong" @click="Music.nextSong()">&#xe63e;</i>
    </div>
    <div class="right">
      <div :style="styleColor" class="time">
        <p>00:00</p>
        <p>/</p>
        <p>00:00</p>
      </div>
      <i @click="Code()" class="playListIcon">&#xe850;</i>
    </div>
  </div>
  <playList
    v-if="code"
    tabindex="1"
    v-on:focus="playLists()"
    v-on:blur="playListBlur()"
    ref="playList"
  ></playList>
</template>

<script>
import playList from './PlayList.vue'
import Speed from './Speed.vue'
export default {
  components: {
    playList,
    Speed
  },
  data() {
    return {
      isActive: false,
      code: false,
      speedCode: false,
      speedSize: '1.0X',
      styleColor: {
        color: '#000',
        fill: '#000'
      },
      Music: window.Music
    }
  },
  methods: {
    speed(e) {
      this.speeds = e.currentTarget
      console.log(e.currentTarget)
      if (this.speedCode === false) {
        this.speedCode = true
        setTimeout(() => {
          this.$refs.speed.$el.focus()
          this.speeds.style.pointerEvents = 'none'
        }, 0)
      }
    },
    speedBlur() {
      //倍速
      setTimeout(() => {
        if (this.speedInputCode) {
          this.speedCode = true
          this.$refs.speed.$el.focus()
        } else {
          this.speedCode = false
          this.speeds.style.pointerEvents = 'auto'
        }
      }, 0)
    },
    Code() {
      //播放列表动画
      this.code = true
      window.Music.inception()
      setTimeout(() => {
        this.$refs.playList.$el.style.transform = ' translateX(0vw)'
        setTimeout(() => {
          this.$refs.playList.$el.focus()
        }, 500)
      }, 100)
    },
    playListBlur() {
      this.$refs.playList.$el.style.transform = ' translateX(100vw)'
      setTimeout(() => {
        this.code = false
      }, 500)
    },
    playLists() {}
  }
}
</script>

<style lang="less">
.MusicStatusBar {
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  .left {
    display: flex;
    align-items: center;
    padding-left: 25px;
    z-index: 2;
    #icon {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    > div {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;
      div {
        display: flex;
        align-items: center;
        i {
          color: #717171;
        }
        .islike {
          font-size: 1.25em;
          display: none;
          -webkit-text-stroke-width: 0.1px;
          color: #f00;
          margin-left: 0px;
        }
        .likes {
          font-size: 1.25em;
          -webkit-text-stroke-width: 0.1px;
          margin-left: 0px;
        }
        .downloadIcon {
          font-size: 1.3em;
          margin-left: 5px;
        }
        .speed {
          margin-left: 5px;
          position: relative;
          > p {
            width: 40px;
            border: 1px solid #717171;
            border-radius: 2px;
            color: #717171;
            font-size: 0.7em;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .speeds {
            top: -150px;
            left: -150px;
          }
        }
      }
      #title {
        font-size: 1.1em;
        font-weight: bold;
      }
      #name {
        font-size: 0.9em;
        margin-right: 10px;
      }
    }
  }
  .play {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 0;
    #up,
    #nextSong {
      font-size: 2em;
      path {
        fill: #000;
      }
    }
    #play {
      width: 50px;
      height: 50px;
      font-size: 1.8em;
      background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
      padding: 10px 5px 10px 11px;
      border-radius: 50%;
      margin-left: 15px;
      margin-right: 15px;
      color: #ffffff;
    }
    #pause {
      width: 50px;
      height: 50px;
      font-size: 1.8em;
      background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
      padding: 10px 5px 10px 11px;
      border-radius: 50%;
      margin-left: 15px;
      margin-right: 15px;
      color: #ffffff;
      display: none;
    }
  }

  .right {
    display: flex;
    align-items: center;
    padding-right: 25px;
    z-index: 2;
    .time {
      display: flex;
      align-items: center;
      color: #717171;
      p {
        font-size: 0.9em;
      }
      p:nth-child(2) {
        margin: 0 10px 0px 10px;
      }
    }
  }

  .scheduleBox {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: #d7d7d7;
    p {
      width: 0;
      height: 100%;
      background-color: #12d4bd;
      transition: all 1s;
    }
    .active {
      color: #fff;
      fill: #fff;
    }
  }
  .playListIcon {
    margin-left: 15px;
    font-size: 1.4em;
    color: #717171;
    -webkit-text-stroke-width: 0.5px;
  }
  #schedules {
    width: 10px;
    height: 10px;
    background-color: #12d4bd;
    border-radius: 50%;
    position: absolute;
    top: -3px;
    transition: all 1s;
  }
}
</style>
