<template>
  <div>
    <div class="top">
      <playcard
        title="随便听点"
        backdrop="rgba(0, 0, 0, 0.5)"
        icon="https://qpic.y.qq.com/music_cover/hibfiaAxRNS1RjW0COLstX3oOfXuLJDIVqRK5TJ088HyiauAT6hdLILDw/300?n=1"
      >
      </playcard>
      <playcard
        title="每日必听"
        backdrop="#0148ee"
        icon="https://qpic.y.qq.com/music_cover/SianGsAL2tnK6y5e1ETYNI4GFKRN9N9ttEZpKJk3ib3VbYprctTvVG2A/300?n=1"
      >
      </playcard>
      <playcard
        title="随机歌单"
        backdrop="#00b7ee"
        icon="https://qpic.y.qq.com/music_cover/ZoK2d65kQunV5VeI7JafW27F3DnicVWzLiaVyqv5qFF5KrUuyHWseHfQ/300?n=1"
      >
      </playcard>
    </div>
    <div class="center">
      <hotsearch :array="HotSearchList" class="hot_search"></hotsearch>
      <RecommendedPlaylist :array="RecommendedPlayList"></RecommendedPlaylist>
    </div>
  </div>
</template>

<script>
import playcard from './PlayCard.vue'
import hotsearch from './HotSearch.vue'
import RecommendedPlaylist from './RecommendedPlaylist.vue'
export default {
  name: 'app',
  components: {
    playcard,
    hotsearch,
    RecommendedPlaylist
  },
  data() {
    return {
      HotSearchList: [
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
      ],
      RecommendedPlayList: [
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
.top {
  display: flex;
}

.center {
  display: flex;
}

.hot_search {
  margin-top: 20px;
  width: 270px;
}

.RecommendedPlaylist {
  margin-top: 20px;
}
</style>
