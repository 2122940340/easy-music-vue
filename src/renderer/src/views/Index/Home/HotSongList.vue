<template>
  <div class="HotSongList">
    <p class="title">{{ title }}</p>
    <ul>
      <li @click="play(i)" v-for="i in array" v-bind:key="i">
        <img v-on:mouseleave="none" v-on:mouseover="ant" :src="i.picUrl" alt="" />
        <p class="titles">
          {{ i.name }}
        </p>
        <p class="name">
          {{ i.song.artists[0].name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import overlay from "./RecommendedPlayListOverlay.vue";
import { ref, h, render } from "vue";
export default {
  props: {
    array: Array,
    title: {
      type: String,
      default: "推荐",
    },
  },
  components: {
    overlay,
  },
  data() {
    return {};
  },

  methods: {
    play(i) {
      window.Music.getURL(i);
    },
    ant(event) {
      let img = event.target;
      let node = event.target.parentNode.querySelector(".overlay");
      if (node) {
        node.style.display = "flex";
        setTimeout(() => {
          flex();
        }, 10);
      } else {
        render(h(overlay), event.target.parentNode);
        setTimeout(() => {
          let node = event.target.parentNode.querySelector(".overlay");
          node.style.display = "flex";
        }, 10);

        flex();
      }
      function flex() {
        setTimeout(() => {
          let node = event.target.parentNode.querySelector(".overlay");
          node.style.opacity = "1";
          node.style.top = "-30px";
          img.style.marginTop = "-30px";
        }, 100);
      }
    },
    none(event) {
      let img = event.target;
      var node = event.target.parentNode.querySelector(".overlay");
      setTimeout(() => {
        node.style.display = "none";
        flex();
      }, 10);
      function flex() {
        setTimeout(() => {
          node.style.opacity = "1";
          node.style.top = "0px";
          img.style.marginTop = "0px";
        }, 100);
      }
    },
  },
  mounted() {},
};
</script>

<style>
.HotSongList .title {
  font-size: 1.7em;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  margin-top: 20px;
}

.HotSongList ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  margin-left: -40px;
}

.HotSongList li {
  width: calc(100% / 4 - 40px);
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  position: relative;
  margin-left: 40px;
}

.HotSongList li img {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 5px;
  transition: all 0.3s;
}

.HotSongList li .titles {
  font-size: 1.1em;
  margin-top: 10px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.HotSongList li .name {
  font-size: 0.9em;
  margin-top: 5px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #717171;
}
</style>
