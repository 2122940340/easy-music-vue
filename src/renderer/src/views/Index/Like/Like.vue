<!--
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-03 18:59:38
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-04 18:37:23
 * @FilePath: \easy-music-vue-edition\src\renderer\src\views\Index\Like\Like.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="like">
    <p class="title">我喜欢&&收藏</p>
    <div ref="tab" class="tab">
      <p data-path="/like/music" @click="Tag($event)" class="a">歌曲</p>
      <p data-path="/like/song" @click="Tag($event)">歌单</p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  data() {
    return {
      list: []
    }
  },
  methods:{
    Tag(event){
      this.$refs.tab.querySelector('.a').classList.remove('a')
      event.currentTarget.classList.add('a')
      router.push({
        path:event.currentTarget.dataset.path
      })

    }
  }
}
</script>
<style>
.like {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.like > .title {
  font-size: 2em;
  font-weight: bold;
  padding: 0px 15px;
}
.like .tab {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.like .tab a {
  text-decoration: none;
}
.like .tab p {
  padding: 0px 20px;
  font-size: 1.2em;
  color: #000;
  position: relative;
}
.like .tab p.a {
  color: #12d4bd;
}
.like .tab p.a::after {
  content: '';
  position: absolute;
  bottom: -10px;
  width: 80%;
  height: 3px;
  left: 5px;
  background-color: #12d4bd;
}
.like .list {
  flex: 1;
  overflow: scroll;
  padding: 20px 0;
}
.like .list li {
  padding: 15px 15px;
  display: flex;
  align-items: center;
  position: relative;
}
.like .list li.a {
  background-color: #eee;
}
.like .list li.b {
  padding: 15px 50px 15px 30px;
}

.like .list li .removes {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  display: none;
  z-index: 3;
}

.like .list li.a {
  background-color: #eee;
}

.like .list li.a p {
  color: #12d4bd;
}

.like .list li .name {
  color: #12d4bd;
  width: 40%;
  font-size: 0.9em;
  color: #717171;
  margin-left: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.like .list li:hover {
  background-color: #eee;
}

.like .list li p:nth-child(1) {
  font-size: 1em;
}
.like .list li .title {
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.like .list li .islike {
  display: block;
}
.like .list li .likes {
  display: none;
}
</style>
