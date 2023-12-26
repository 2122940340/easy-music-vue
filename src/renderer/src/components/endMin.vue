<template>
  <div class="endMin" @click="btn_end()">
    <div class="box">
      <p class="title">退出</p>
      <div class="content">
        退出：完全退出应用，下载和音乐的播放被终止
        <br />
        最小化：仅最小化到系统托盘，应用仍在后台运行
      </div>
      <div class="btn">
        <p @click="close()" class="end">退出</p>
        <p @click="min()" class="ok">最小化</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {
    min(url) {
      electron.ipcRenderer.send('window-min')
      this.$parent.endMainCode = false
    },
    btn_end() {
      this.$parent.endMainCode = false
    },
    close() {
      electron.ipcRenderer.send('window-close')

      this.$parent.endMainCode = false
    }
  },
  mounted() {}
}
</script>
<style lang="less">
.endMin {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    min-height: 250px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 25px;
    padding-bottom: 80px;
    position: relative;
    .title {
      font-size: 1.5em;
      color: #000000;
      font-weight: bold;
    }
    .content {
      font-size: 1em;
      color: #717171;
      padding: 10px 0;

      img {
        width: 100%;
        max-height: 150px;
      }
      p {
        font-size: 1em;
        color: #717171;
        padding: 10px 0;
      }
    }
    .btn {
      position: absolute;
      right: 25px;
      bottom: 25px;
      display: flex;
      p {
        padding: 10px 15px;
        min-width: 100px;
        min-height: 40px;
        text-align: center;
        color: #ffffff;
        font-size: 0.9em;
      }
      .ok {
        background-color: #000000;
        margin-left: 20px;
      }
      .end {
        background-color: #717171;
      }
    }
  }
}
</style>
