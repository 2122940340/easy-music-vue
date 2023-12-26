<template>
  <div class="updateBox" v-if="code">
    <div class="box">
      <p class="title">{{ data.title }}</p>
      <div class="content" v-html="data.content"></div>
      <div class="btn">
        <p @click="btn_end()" class="end">{{ data.btn_end }}</p>
        <p @click="btn_ok(data.url)" class="ok">{{ data.btn_ok }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import config from '../../../../package.json'
export default {
  data() {
    return {
      code: false,
      data: ''
    }
  },
  methods: {
    btn_ok(url) {
      shell.openExternal(url)
    },
    btn_end() {
      this.code = false
    },
    compareVersion(v1, v2) {
      console.log(v1)
      if (v1 == v2) {
        return 0
      }

      const vs1 = v1.split('.').map((a) => parseInt(a))
      const vs2 = v2.split('.').map((a) => parseInt(a))

      const length = Math.min(vs1.length, vs2.length)
      for (let i = 0; i < length; i++) {
        if (vs1[i] > vs2[i]) {
          return 1
        } else if (vs1[i] < vs2[i]) {
          return -1
        }
      }

      if (length == vs1.length) {
        return -1
      } else {
        return 1
      }
    }
  },
  mounted() {
    fetch('https://download.tiank.top/api/update.json')
    .then((res)=>res.text())
    .then(res =>{
      console.log(res)
    })
    fetch('https://download.tiank.top/api/update.json')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        this.data = res
        if (this.compareVersion(res.version, config.version)) {
          // 更新
          this.code = true
        } else {
          // 无需更新
        }
      })
  }
}
</script>
<style lang="less">
.updateBox {
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

      img{
        width: 100%;
        max-height: 150px;
      }
      p{
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
