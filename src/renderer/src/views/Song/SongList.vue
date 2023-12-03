<template>
  <div class="SongList">
    <div class="top">
      <img class="icon" v-lazy="icon" alt="" />
      <div>
        <p class="title">{{ title }}</p>
        <p class="content">介绍:{{ content }}</p>
        <div>
          <span @click="addSongList()">
            <svg
              t="1701134542971"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3438"
              width="20"
              height="20"
            >
              <path
                d="M732.502883 465.602819c-107.883492-82.3454-215.772403-164.681769-323.652282-247.014525-38.414608-29.327534-93.780555-1.929039-93.780555 46.396277v494.029051c0 48.325316 55.365948 75.725617 93.780555 46.398084 107.87988-82.332757 215.76879-164.669126 323.652282-247.014525 30.61356-23.357989 30.61356-69.436372 0-92.794362z"
                fill="#ffffff"
                p-id="3439"
              ></path>
            </svg>
            <p>全部播放</p>
          </span>
          <span>
            <svg
              t="1701134592879"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5602"
              width="20"
              height="20"
            >
              <path
                d="M512 341.333334C483.413334 267.434666 403.328 213.333334 320 213.333334 211.498666 213.333334 128 295.765334 128 405.333334 128 555.904 289.834666 672.341334 512 896 734.165334 672.341334 896 555.904 896 405.333334 896 295.765334 812.501336 213.333334 704 213.333334 620.586666 213.333334 540.586666 267.434666 512 341.333334Z"
                fill="#2c2c2c"
                p-id="5603"
              ></path>
            </svg>
            <p>收藏歌单</p>
          </span>
        </div>
      </div>
    </div>

    <div class="tab">
      <p>歌曲</p>
      <p>歌手</p>
      <p>专辑</p>

      <ul>
        <li @click="play(i)" v-for="i in list" v-bind:key="i">
          <span>
            <img :src="i.al.picUrl" alt="" />
            <p>{{ i.name }}</p>
          </span>
          <span>
            <p v-for="x in i.ar" v-bind:key="x">
              {{ x.name }}
            </p>
          </span>
          <span>
            <p>{{ i.alia[0] }}</p>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import router from "../../router/index";
import { useRoute } from "vue-router";

export default {
  setup() {},
  data() {
    return {
      title: "正在加载中",
      content: "轻松音乐，听我想听",
      icon: "",
      list: {},
      id: false,
    };
  },
  activated() {},
  methods: {
    play(i) {
      window.Music.getURL(i);
    },
    addSongList() {
      window.Music.addSongList(this.list);
    },
  },
  mounted() {
    const id = history.state.id;
    if (id != undefined || id != "") {
      fetch(APIURL + "playlist/detail?id=" + id)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.list = json.playlist.tracks;
          this.title = json.playlist.name;
          this.icon = json.playlist.coverImgUrl;
          this.content = json.playlist.description;
        });
    }
  },
};
</script>
<style>
.SongList {
  width: 100%;
  overflow: scroll;
}

.SongList > .top {
  display: flex;
  padding: 15px 0;
  align-items: center;
}

.SongList > .top > .icon {
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  border-radius: 5px;
}

.SongList > .top > div {
  display: flex;
  height: 200px;
  flex-direction: column;
  margin-left: 25px;
  flex-shrink: 0;
  margin-right: auto;
  width: calc(100% - 225px);
}

.SongList > .top > div .title {
  font-size: 2em;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.SongList > .top > div .content {
  font-size: 1em;
  color: #717171;
  margin-top: 10px;
  height: 80px;
  overflow: scroll;
}

.SongList > .top > div div {
  display: flex;
  align-items: center;
  margin-top: auto;
}

.SongList > .top > div div span {
  display: flex;
  width: 150px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
  border-radius: 22.5px;
}

.SongList > .top > div div span svg {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.SongList > .top > div div span p {
  font-size: 0.9em;
}
.SongList > .top > div div span:nth-child(1) {
  color: #fff;
}

.SongList > .top > div div span:nth-child(1) svg {
  width: 35px;
  height: 35px;
}

.SongList > .top > div div span:nth-child(2) svg path {
  fill: #fff;
}

.SongList > .top > div div span:nth-child(2) {
  margin-left: 25px;
  background-image: none;
  background-color: #c73dda;
}

.SongList > .top > div div span:nth-child(2) {
  color: #fff;
}

.SongList > .tab {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}

.SongList > .tab > p {
  width: calc(100% / 3);
  color: #717171;
}

.SongList > .tab > ul {
  width: 100%;
}

.SongList > .tab > ul li {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 10px;
}
.SongList > .tab > ul li:hover {
  background-color: #eeeeee;
}
.SongList > .tab > ul li img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 5px;
}

.SongList > .tab > ul li span {
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  margin-right: 10px;
}

.SongList > .tab > ul li span p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */
}
</style>
