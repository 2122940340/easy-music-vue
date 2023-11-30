<template>
  <div class="playcard">
    <p class="title">{{ title }}</p>
    <img :src="icon" alt="" class="icon" />
    <div v-bind:style="{ backgroundColor: backdrop }" class="back"></div>
    <svg
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
export default {
  name: 'playCard',
  props: {
    title: {
      type: String,
      default: '暂无标题'
    },
    icon: {
      type: String
    },
    backdrop: {
      type: String,
      default: '#ee99b7'
    }
  }
}
</script>
<style scoped>
.playcard {
  background-image: linear-gradient(to top left, #85eebf, #00eaee);
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 250px;
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
.playcard .play {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
