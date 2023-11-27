<template>
  <div class="RecommendedPlaylist">
    <p class="title">推荐歌单</p>
    <ul>
      <li v-for="i in array" v-bind:key="i">
        <img :src="i.img" alt="" />
        <p class="titles">
          {{ i.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    array: Array
  },
  data() {
    return {}
  }
}
</script>

<style>
.RecommendedPlaylist .title {
  font-size: 1.7em;
  font-weight: bold;
}

.RecommendedPlaylist ul {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  column-gap: 37px;
  row-gap: 30px;
  margin-top: 30px;
}

.RecommendedPlaylist li {
  /* width: calc(100% / 3); */
  display: flex;
  flex-direction: column;
}

.RecommendedPlaylist li img {
  width: 133px;
  height: 133px;
}

.RecommendedPlaylist li p {
  font-size: 1.1em;
  margin-top: 10px;
}
</style>
