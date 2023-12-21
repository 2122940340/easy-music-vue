<template>
  <div class="about">
    <p class="title">关于软件</p>
    <div class="content">
      <img class="icon" src="/src/assets/icon.png" alt="" />
      <p class="name">轻松音乐</p>
      <p>软件作者：<b>tiankong</b></p>
      <p><br /><br />本软件是 <b>轻松</b> 应用系列的第一款桌面端应用，如果你觉得它很好!你可以：</p>
      <span>
        <p>1.向我捐赠</p>
        <p>2.为我的项目点个赞</p>
      </span>
      <p>
        软件内所有内容均来源网络采集，请于下载后24小时内删除，
        软件开发初衷是为了学习和研究，至停止维护之前不收费！
      </p>
      <p>如果你觉得软件有问题，欢迎反馈给我，谢谢！</p>
      <p>交流群：818749846</p>
      <img class="qq" src="/src/assets/qq.jpg" alt="" srcset="" />
      <p>欢迎下载 轻松音乐 v1.0.0 移动端，体验更佳！</p>
      <p>下载地址：http://a.ruansky.com</p>
      <p><br />本项目已经开源，如果你感兴趣，可以在以下链接获得源码</p>
      <p>Gitee: https://gitee.com/tiankongskya/easy-music-vue-edition</p>
      <p>GitHub: https://github.com/2122940340/easy-music-vue</p>
    </div>
  </div>
</template>
<style>
.about {
  width: 100%;
  height: 100%;
  padding: 0px 15px;
}
.about .title {
  font-size: 2em;
  font-weight: bold;
}

.about .icon {
  width: 80px;
  height: 80px;
}
.about .name {
  font-weight: bold;
  font-size: 1.3em;
}
.about .content {
  margin-top: 25px;
}
.about .content p {
  margin-top: 10px;
  -webkit-user-select: text;
}
.about .content .qq {
  width: 300px;
}
</style>
