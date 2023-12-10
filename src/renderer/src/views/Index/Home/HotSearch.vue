<template>
  <div class="HotSearch">
    <p class="title">大家<br /><b style="font-size: 1.6em">都在搜</b></p>
    <ul>
      <li @click="play(i)" v-for="i in array" v-bind:key="i">
        <img v-lazy="i.al.picUrl" alt="" />
        <div>
          <p class="title">{{ i.name }}</p>
          <p class="name">{{ i.ar[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hotSearch',
  props: {
    array: Array
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    play(i) {
      window.Music.getURL(i)
    }
  },
  mounted() {}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.HotSearch {
  width: 30%;
  position: relative;
  overflow: scroll;
}

.HotSearch > .title {
  font-weight: bold;
  font-size: 1.2em;
  position: sticky;
  top: 0;
  background-color: #fff;
}

.HotSearch ul {
  list-style: none;
  overflow: scroll;
  max-height: 1300px;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scroll-snap-align: end;
}

.HotSearch li {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  /* margin-top: 10px; */
  padding: 15px 0px;
}

.HotSearch li p:hover {
  /* color: #; */
}

/* .HotSearch li img:hover {
  transition: all 0.3s;
  width: 60px;
  height: 60px;
} */

.HotSearch li:hover img {
  width: 6vw;
  aspect-ratio: 1/1;
}

.HotSearch img {
  width: 5vw;
  aspect-ratio: 1/1;
  border-radius: 5px;
  transition: all 0.3s;
}

.HotSearch div {
  width: 100%;
  height: calc(6vw - 15px);
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.HotSearch .title {
  font-size: 1.1em;
  color: #000000;
  width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.5cqw;
}

.HotSearch .name {
  font-size: 0.9em;
  color: #717171;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.2cqw;
}
</style>
