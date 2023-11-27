<template>
  <div class="nav">
    <img src="../assets/tuijian.png" alt="" />
    <p>标题</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
<style scoped>
.nav {
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.nav:hover {
  background-image: linear-gradient(to left top, rgb(18, 216, 104), #12d4bd);
}
.nav img {
  height: 25px;
  width: 25px;
}
.nav p {
  margin-left: 10px;
  font-size: 1.2em;
}
</style>
