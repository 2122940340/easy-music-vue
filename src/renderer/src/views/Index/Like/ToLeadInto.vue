<template>
  <div class="ToLeadInto">
    <p class="title">导入第三方的收藏的歌曲&收藏</p>

    <div class="input">
      <input
        type="text"
        v-model="value"
        placeholder="只支持网易云的歌单导入"
        @keydown.enter="search()"
      />
      <i class="icon">&#xeafe;</i>
    </div>
    <p class="errtips" v-show="errCode">
      {{ error }}
    </p>
    <div class="result" v-show="resultCode">
      <img class="icon" :src="icon || '/src/assets/icon.png'" alt="" />
      <div>
        <p class="title">{{ title || '正在加载中' }}</p>
        <p class="length">歌曲数量:{{ list.length }}</p>
      </div>
      <p class="btn_ok" @click.stop="ok()">{{ btnOk }}</p>
    </div>
    <div class="tips">
      <p class="title">手机版</p>
      <p>
        最后的链接必须是这样的(不能有空格,中文):<br />https://y.music.163.com/m/playlist?id=9098159271
      </p>

      <p>1.依次点击 我的-我喜欢的音乐-分享-复制链接</p>
      <p>2.删除链接多余的内容(就是所有中文的)</p>
      <p>3.粘贴到上面的输入框</p>
      <p class="title">电脑版</p>
      <p>1.依次点击 我喜欢的音乐-分享-复制链接</p>
      <p>2.删除链接多余的内容(就是所有中文的)</p>
      <p>3.粘贴到上面的输入框</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      errCode: false,
      resultCode: false,
      btnOk: '导入',
      error: ''
    }
  },
  mounted() {},
  methods: {
    ok() {
      Music.toLeadInto(this.list)
        .then((res) => {
          this.errormsg(res)
          this.btnOk = '导入成功'
        })
        .catch((res) => {
          this.errormsg(res)
        })
    },
    search() {
      if (
        this.value === undefined ||
        this.value === '' ||
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
          this.value
        ) === false
      ) {
        return void 0
      }
      const results = this.GetRequest(this.value)
      if (this.id == results['id']) {
        return void 0
      }
      this.id = results['id']
      fetch(APIURL + 'playlist/track/all?id=' + results['id'])
        .then((response) => response.json())
        .then((json) => {
          this.list = json.songs
        })
      fetch(APIURL + 'playlist/detail?id=' + results['id'])
        .then((response) => response.json())
        .then((json) => {
          if (json.playlist.name && json.code === 200) {
            this.resultCode = true
            this.data = json.playlist
            this.title = json.playlist.name
            this.icon = json.playlist.coverImgUrl
            this.content = json.playlist.description
          } else {
            this.errormsg('错误的请求,请仔细检查,或者没有公开')
          }
        })
    },
    GetRequest(urlStr) {
      if (typeof urlStr == 'undefined') {
        var url = decodeURI(location.search) //获取url中"?"符后的字符串
      } else {
        var url = '?' + urlStr.split('?')[1]
      }
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        let strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
        }
      }
      return theRequest
    },
    errormsg(str) {
      this.errCode = true
      this.error = str
      setTimeout(() => {
        this.errCode = false
      }, 3000)
    }
  }
}
</script>
<style lang="less">
.ToLeadInto {
  width: 100%;
  height: 100%;

  > .title {
    font-size: 2em;
    font-weight: bold;
    padding: 0px 15px;
  }
  .input {
    width: 100%;
    height: 45px;
    margin-top: 40px;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0px 15px;

    .icon {
      font-size: 1.7em;
      color: #000000;
      position: absolute;
      left: 30px;
    }
    input {
      width: 100%;
      height: 100%;
      font-size: 1em;
      background-color: transparent;
      padding-left: 50px;
      border: 2px solid #04e2a3;
      border-radius: 22.5px;
      background-color: #ffffff;
    }
  }
  .errtips {
    padding: 15px 15px;
    color: red;
    font-weight: bold;
  }
  .result:hover {
    background-color: #eeeeee;
  }
  .result {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 15px;

    .icon {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    > div {
      height: 90px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding-left: 15px;
      .title {
        width: 100%;
        font-weight: bold;
        font-size: 1.5em;
      }
      .length {
        color: #717171;
      }
    }
    .btn_ok {
      margin-left: auto;
      width: 100px;
      height: 35px;
      background-color: #04e2a3;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      border-radius: 20px;
    }
  }
  .tips {
    margin-top: 20px;
    padding: 0 15px;
    .title {
      font-weight: bold;
      font-size: 1.2em;
      color: #000000;
    }
    > p {
      color: #717171;
      margin-top: 10px;
    }
  }
}
</style>
