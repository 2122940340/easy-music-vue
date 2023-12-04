<!--
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-04 19:34:07
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-04 20:22:06
 * @FilePath: \easy-music-vue-edition\src\renderer\src\views\Search\SongList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div @scroll="pageUp" class="searchOutcome">
    <div class="tab">
      <ul>
        <li @click="play(i)" v-for="i in list" v-bind:key="i">
          <span>
            <img v-lazy="i.coverImgUrl" alt="" />
            <p>{{ i.name }}</p>
          </span>
          <span>
            <p>
              {{ i.creator.nickname }}
            </p>
          </span>
          <span>
            <p>{{ i.description }}</p>
          </span>
        </li>
      </ul>
    </div>
    <img class="load" src="/src/assets/lo.gif" alt="" />
  </div>
</template>
<script>
import router from '../../router'
export default {
  data() {
    return {
      list: [],
      isPage: false,
      limit: 30,
      page: 0
    }
  },
  watch: {
    $route(to, from) {
      this.page = 0
      this.pageNext(true)
    }
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
    pageUp(e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollTop + clientHeight === scrollHeight) {
        this.pageNext()
      }
    },
    pageNext(code) {
      if (this.isPage != true) {
        this.isPage = true
        this.searchValue = history.state.value
        let URL =
          window.APIURL +
          'cloudsearch?keywords=' +
          this.searchValue +
          '&limit=30' +
          '&offset=' +
          this.limit * this.page +
          '&type=1000'
        this.page += 1
        fetch(URL)
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            this.isPage = false
            if (code) {
              this.list = response.result.playlists
            } else {
              let list = this.list
              this.list = [...list, ...response.result.playlists]
            }
          })
      }
    }
  },
  mounted() {
    this.pageNext()
  }
}
</script>
