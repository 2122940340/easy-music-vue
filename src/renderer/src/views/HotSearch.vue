<template>
  <div class="HotSearch">
    <p class="title">大家<br /><b style="font-size: 1.6em">都在搜</b></p>
    <ul>
      <li @click="play(i)" v-for="i in array" v-bind:key="i">
        <img :src="i.al.picUrl" alt="" />
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
      this.$parent.$parent.$parent.play(i)
    }
  },
  mounted() {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.HotSearch {
  width: 270px;
  /* height: 100px; */
  position: relative;
  overflow: scroll;
}

.HotSearch>.title {
  font-weight: bold;
  font-size: 1.2em;
  position: sticky;
  top: 0;
  background-color: #fff;
}

.HotSearch ul {
  list-style: none;
  overflow: scroll;
  width: 270px;
}

.HotSearch li {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  /* margin-top: 10px; */
  padding: 15px 0px;
}

.HotSearch img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.HotSearch div {
  width: 100%;
  height: 50px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.HotSearch .title {
  font-size: 1.1em;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.HotSearch .name {
  font-size: 0.9em;
  color: #717171;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
