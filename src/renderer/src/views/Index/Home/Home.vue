<template>
  <div class="home">
    <div class="top">
      <playcard title="随便听点" backdrop="rgba(0, 0, 0, 0.5)" :icon="PlayCard[0]"> </playcard>
      <playcard title="每日必听" backdrop="#0148ee" :icon="PlayCard[1]"> </playcard>
      <playcard title="随机歌单" backdrop="#00b7ee" :icon="PlayCard[2]"> </playcard>
    </div>

    <div class="center">
      <hotsearch @setValue="play" :array="HotSearchList" class="hot_search"></hotsearch>
      <div>
        <RecommendedPlaylist title="热门歌单" :array="RecommendedPlayList"></RecommendedPlaylist>
        <HotSearchList title="心动歌曲推荐" :array="HitSongList"></HotSearchList>
      </div>
    </div>
    <p @click="Bottom()" class="scrollBottom">😫到底了，搜搜看吧</p>
  </div>
</template>

<script>
import playcard from './PlayCard.vue' //头部卡片
import hotsearch from './HotSearch.vue' //热门歌曲
import RecommendedPlaylist from './RecommendedPlaylist.vue' //推荐歌单
import HotSearchList from './HotSongList.vue' //热门歌曲
export default {
  name: 'app',
  components: {
    playcard,
    hotsearch,
    RecommendedPlaylist,
    HotSearchList
  },
  data() {
    return {
      HotSearchList: [],
      RecommendedPlayList: [],
      PlayCard: [null, null, null],
      HitSongList: []
    }
  },
  methods: {
    play(value) {},
    Bottom() {

    }
  },
  mounted() {
    // 推荐歌单
    fetch(`${window.APIURL}personalized?limit=8`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.RecommendedPlayList = json.result
      })
    // 推荐歌曲
    fetch(window.APIURL + 'personalized/newsong?limit=20')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.HitSongList = json.result
      })
      .catch((err) => console.log('Request Failed', err))
    fetch(window.APIURL + 'recommend/songs')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.HotSearchList = json.data.dailySongs
        // this.PlayCard[0] = this.HotSearchList[6].al.picUrl
        // this.PlayCard[1] = this.HotSearchList[7].al.picUrl
        // this.PlayCard[2] = this.HotSearchList[8].al.picUrl
      })
      .catch((err) => console.log('Request Failed', err))
  }
}
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.home > div {
  flex-shrink: 0;
}

.home .top {
  min-idth: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: -30px;
  flex-wrap: wrap;
}

.home .center {
  display: flex;
  overflow: scroll;
}

.home .hot_search {
  margin-top: 20px;
  flex-shrink: 0;
}

.home .RecommendedPlaylist {
  margin-top: 20px;
}

.load {
  width: 150px;
  height: 150px;
  margin: auto;
}
.scrollBottom {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #717171;
}
</style>
