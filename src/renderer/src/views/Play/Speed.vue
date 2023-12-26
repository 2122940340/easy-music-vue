<template>
  <div tabindex="1" class="speeds">
    <p>0.5X</p>
    <input
      id="range"
      type="range"
      min="0.1"
      max="3.0"
      step="0.1"
      :value="size"
      @change="change($event)"
      v-on:focus="inputFocus($event)"
      v-on:blur="inputBlur($event)"
    />
    <p>3.0X</p>
    <p class="current">{{ size + 'X' }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: '1.0',
    }
  },
  methods: {
    change(e) {
      this.$parent.speedSize = e.target.value + 'X'
      this.size = e.target.value
      Music.speedSize = e.target.value
      Music.speed(e.target.value)
    },
    inputFocus(e) {
      console.log('获取')
      this.$parent.speedInputCode = true
    },
    inputBlur(e) {
      this.$parent.speedInputCode = false
    }
  }
}
</script>
<style lang="less">
.speeds {
  width: 400px;
  height: 100px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 20px #dcdcdc;
  font-size: 0.9em;
  p {
    color: #000000;
  }
  input {
    width: 50%;
    margin: 0 15px;
  }
  .current {
    position: absolute;
    margin-bottom: 55px;
  }
}
</style>
