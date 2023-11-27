<template>
  <div class="HotSearch">
    <p class="title">大家<br /><b style="font-size: 1.6em">都在搜</b></p>
    <ul>
      <li v-for="i in array" v-bind:key="i">
        <img :src="i.img" alt="" />
        <div>
          <p class="title">{{ i.title }}</p>
          <p class="name">{{ i.name }}</p>
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
      list: [
        {
          img: 'https://y.qq.com/music/photo_new/T002R300x300M0000007r8Wy0nIyAV.jpg?max_age=2592000',
          title: '凄美地',
          name: '郭顶'
        },
        {
          img: 'https://y.qq.com/music/photo_new/T002R300x300M0000007r8Wy0nIyAV.jpg?max_age=2592000',
          title: '凄美地',
          name: '郭顶'
        },
        {
          img: 'https://y.qq.com/music/photo_new/T002R300x300M0000007r8Wy0nIyAV.jpg?max_age=2592000',
          title: '凄美地',
          name: '郭顶'
        },
        {
          img: 'https://y.qq.com/music/photo_new/T002R300x300M0000007r8Wy0nIyAV.jpg?max_age=2592000',
          title: '凄美地',
          name: '郭顶'
        },
        {
          img: 'https://y.qq.com/music/photo_new/T002R300x300M0000007r8Wy0nIyAV.jpg?max_age=2592000',
          title: '凄美地',
          name: '郭顶'
        }
      ]
    }
  }
}
</script>

<style>
.HotSearch {
  width: 250px;
}

.HotSearch > .title {
  font-weight: bold;
  font-size: 1.2em;
}

.HotSearch ul {
  list-style: none;
}

.HotSearch li {
  display: flex;
  padding: 10px 0;
  align-items: center;
}

.HotSearch img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.HotSearch div {
  width: 100%;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.HotSearch .title {
  font-size: 1.1em;
  color: #000000;
}

.HotSearch .name {
  font-size: 0.9em;
  column-rule: #717171;
}
</style>
