<!--
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-04 15:57:21
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-04 18:46:58
 * @FilePath: \easy-music-vue-edition\src\renderer\src\views\Index\Like\LikeMusic.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ul class="list">
    <li @click="play(i)" :ref="i" v-for="(i, key) in list" :key="i">
      <svg
        @click.stop="songLikeDelete($event, i.id)"
        t="1701419350343"
        class="islike"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2788"
        width="20"
        height="20"
      >
        <path
          d="M780.8 204.8c-83.2-44.8-179.2-19.2-243.2 44.8L512 275.2 486.4 249.6c-64-64-166.4-83.2-243.2-44.8C108.8 275.2 89.6 441.6 185.6 537.6l32 32 153.6 153.6 102.4 102.4c25.6 25.6 57.6 25.6 83.2 0l102.4-102.4 153.6-153.6 32-32C934.4 441.6 915.2 275.2 780.8 204.8z"
          fill="#d81e06"
          p-id="2789"
        ></path>
      </svg>
      <svg
        @click.stop="songLike($event, i)"
        class="likes"
        t="1701419140569"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2586"
        width="20"
        height="20"
      >
        <path
          d="M332.8 249.6c38.4 0 83.2 19.2 108.8 44.8L467.2 320 512 364.8 556.8 320l25.6-25.6c32-32 70.4-44.8 108.8-44.8 19.2 0 38.4 6.4 57.6 12.8 44.8 25.6 70.4 57.6 76.8 108.8 6.4 44.8-6.4 89.6-38.4 121.6L512 774.4 236.8 492.8C204.8 460.8 185.6 416 192 371.2c6.4-44.8 38.4-83.2 76.8-108.8C288 256 313.6 249.6 332.8 249.6L332.8 249.6M332.8 185.6C300.8 185.6 268.8 192 243.2 204.8 108.8 275.2 89.6 441.6 185.6 537.6l281.6 281.6C480 832 499.2 838.4 512 838.4s32-6.4 38.4-19.2l281.6-281.6c96-96 76.8-262.4-57.6-332.8-25.6-12.8-57.6-19.2-89.6-19.2-57.6 0-115.2 25.6-153.6 64L512 275.2 486.4 249.6C448 211.2 390.4 185.6 332.8 185.6L332.8 185.6z"
          fill="#707070"
          p-id="2587"
        ></path>
      </svg>
      <p class="title">{{ i.name }}</p>
      <p class="name">{{ i.description }}</p>
      <svg
        @click="elRemove($event, key)"
        t="1701340255394"
        class="removes"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4626"
        data-spm-anchor-id="a313x.search_index.0.i3.12603a81fKfRbu"
        width="20"
        height="20"
      >
        <path
          d="M875.432137 148.567863c-198.090484-198.090484-523.981279-198.090484-722.071763 0s-198.090484 523.981279 0 722.071763 523.981279 198.090484 722.071763 0S1073.522621 353.048362 875.432137 148.567863zM670.951638 717.279251 511.201248 557.528861l-159.75039 159.75039c-12.780031 12.780031-31.950078 12.780031-44.730109 0-12.780031-12.780031-12.780031-31.950078 0-44.730109L466.471139 512.798752 306.720749 353.048362C293.940718 340.268331 293.940718 321.098284 306.720749 308.318253c12.780031-12.780031 31.950078-12.780031 44.730109 0L511.201248 468.068643l159.75039-159.75039c12.780031-12.780031 31.950078-12.780031 44.730109 0 12.780031 12.780031 12.780031 31.950078 0 44.730109L555.931357 512.798752l159.75039 159.75039c12.780031 12.780031 12.780031 31.950078 0 44.730109S683.731669 730.059282 670.951638 717.279251z"
          fill="#d81e06"
          p-id="4627"
          data-spm-anchor-id="a313x.search_index.0.i2.12603a81fKfRbu"
          class=""
        ></path>
      </svg>
    </li>
  </ul>
</template>

<script>
import router from '../../../router'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    if (this.$refs[Music._songid]) {
      this.$refs[Music._songid][0].classList.add('a')
    }
    const datas = fs.readFileSync(Music.likeSongListPath, 'utf-8', (err) => {})
    let data = JSON.parse(datas)
    if (typeof data === String) {
      data = JSON.parse(data)
    }
    this.list = data.data
    console.log(data.data)
  },
  methods: {
    play(i) {
      router.push({
        path: '/songlist',
        state: {
          id: i.id
        }
      })
    },
    songLikeDelete(event, id) {
      console.log(id)
      event.currentTarget.nextElementSibling.style.display = 'block'
      event.currentTarget.style.display = 'none'
      window.Music.likeSongLikeDelete(id)
    },
    songLike(event, array) {
      event.currentTarget.previousElementSibling.style.display = 'block'
      event.currentTarget.style.display = 'none'
      window.Music.likeSongLike(array)
    }
  }
}
</script>
