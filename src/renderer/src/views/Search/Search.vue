<template>
  <div @scroll="pageUp" class="searchOutcome">
    <div ref="tab" class="tag">
      <p data-path="/search/music" @click="Tag($event)" class="a">歌曲</p>
      <p data-path="/search/song" @click="Tag($event)">歌单</p>
    </div>
    <router-view></router-view>
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
      this.pageNext(true)
    }
  },
  methods: {
    Tag(event) {
      this.$refs.tab.querySelector('.a').classList.remove('a')
      event.currentTarget.classList.add('a')
      router.push({
        path: event.currentTarget.dataset.path,
        state: {
          value: this.searchValue
        }
      })
    },
    play(i) {
      window.Music.getURL(i)
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
          this.limit * this.page
        this.page += 1
        fetch(URL)
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            this.isPage = false
            // Object.assign(this.list,response.result.songs)
            if (code) {
              this.list = response.result.songs
            } else {
              let list = this.list
              this.list = [...list, ...response.result.songs]
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
<style>
.searchOutcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.searchOutcome > .tab {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}

.searchOutcome > .tab > p {
  flex: 1;
  color: #717171;
  margin-left: 10px;
  margin-top: 20px;
}

.searchOutcome > .tab > ul {
  width: 100%;
}

.searchOutcome > .tab > ul li {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 10px;
}

.searchOutcome > .tab > ul li:hover {
  background-color: #eeeeee;
}

.searchOutcome > .tab > ul li img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 5px;
}

.searchOutcome > .tab > ul li span {
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  margin-right: 10px;
}

.searchOutcome > .tab > ul li span p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */
}

.searchOutcome .load {
  width: 150px;
  height: 150px;
  margin: auto;
}

.searchOutcome .tag {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
}
.searchOutcome .tag a {
  text-decoration: none;
}
.searchOutcome .tag p {
  font-size: 1.2em;
  color: #000;
  position: relative;
  margin-right: 20px;
}
.searchOutcome .tag p.a {
  color: #12d4bd;
}
.searchOutcome .tag p.a::after {
  content: '';
  position: absolute;
  bottom: -10px;
  width: 80%;
  height: 3px;
  left: 5px;
  background-color: #12d4bd;
}
</style>
