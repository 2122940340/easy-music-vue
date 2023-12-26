<template>
  <div class="download">
    <p class="title">我的下载</p>
    <p class="tip">下载保存在 C:\Users\Administrator\AppData\Roaming\esay-music\user\download 目录下</p>
    <ul class="list">
      <li @click="play($event, i)" v-for="(i, key) in list" :key="i">
        <svg
          @click.stop="downloadDelete(key)"
          t="1701912073371"
          class="removes"
          viewBox="0 0 1094 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4295"
          width="20"
          height="20"
        >
          <path
            d="M748.819181 190.273726q-10.22977 0-17.902098-7.672328t-12.787213-17.902098-7.672328-20.971029-2.557443-17.902098l0-125.826174 2.045954 0q9.206793 0 17.390609 2.045954t19.948052 9.718282 28.643357 21.482517 42.453546 36.315684q27.62038 24.551449 43.988012 41.430569t24.551449 28.643357 10.741259 19.948052 2.557443 14.321678l0 16.367632-151.400599 0zM867.484515 572.867133q47.056943 0 87.976024 17.902098t71.608392 48.591409 48.591409 71.608392 17.902098 86.953047q0 47.056943-17.902098 87.976024t-48.591409 71.608392-71.608392 48.591409-87.976024 17.902098q-46.033966 0-86.953047-17.902098t-71.608392-48.591409-48.591409-71.608392-17.902098-87.976024q0-46.033966 17.902098-86.953047t48.591409-71.608392 71.608392-48.591409 86.953047-17.902098zM912.495504 798.945055l67.516484-67.516484q9.206793-9.206793 9.206793-22.505495t-9.206793-22.505495-22.505495-9.206793-22.505495 9.206793l-67.516484 67.516484-68.539461-67.516484q-9.206793-9.206793-22.505495-9.206793t-22.505495 9.206793-9.206793 22.505495 9.206793 22.505495l67.516484 67.516484-67.516484 68.539461q-9.206793 9.206793-9.206793 22.505495t9.206793 22.505495 22.505495 9.206793 22.505495-9.206793l68.539461-67.516484 67.516484 67.516484q9.206793 9.206793 22.505495 9.206793t22.505495-9.206793 9.206793-22.505495-9.206793-22.505495zM575.936064 767.232767q-1.022977 8.183816-1.022977 14.321678l0 15.344655q0 46.033966 13.298701 87.464535t37.85015 76.211788l-363.156843 0q-19.436563 0-42.453546-11.252747t-42.965035-29.666334-33.246753-41.942058-13.298701-49.102897l0-696.647353q0-21.482517 10.22977-45.010989t27.108891-42.453546 38.361638-31.712288 45.010989-12.787213l391.8002 0 0 127.872128q0 19.436563 6.137862 41.942058t18.925075 41.430569 33.246753 31.712288 49.102897 12.787213l149.354645 0 0 253.698302q-9.206793-1.022977-18.413586-1.534466t-17.390609-0.511489q-76.723277 0-140.659341 35.804196t-102.809191 96.15984l-297.686314 0q-26.597403 0-45.522478 18.925075t-18.925075 45.522478 18.925075 45.010989 45.522478 18.413586l252.675325 0zM323.260739 383.616384q-26.597403 0-45.522478 18.413586t-18.925075 45.010989 18.925075 45.522478 45.522478 18.925075l383.616384 0q26.597403 0 45.522478-18.925075t18.925075-45.522478-18.925075-45.010989-45.522478-18.413586l-383.616384 0z"
            p-id="4296"
            fill="#d81e06"
          ></path>
        </svg>
        <p class="title">{{ i.title }}</p>
        <p class="name">{{ i.author }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    play(event, i) {
        i.url = i.path
      window.Music.play(i)
    },
    downloadDelete(id){
        this.list =  window.Music.downloadDelete(id).data
    }
  },
  mounted() {
    this.list = window.Music.downloadList().data
  }
}
</script>

<style>
.download {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.download > .title {
  font-size: 2em;
  font-weight: bold;
  padding: 0px 15px;
}
.download > .tip {
  font-size: 0.9em;
  padding: 0px 15px;
  color: #717171;
  margin-top: 10px;
}
.download .list {
  margin-top: 20px;
}
.download .list li {
  padding: 15px 5px 15px 35px;
  display: flex;
  align-items: center;
  position: relative;
}
.download .list li.a {
  background-color: #eee;
}
.download .list li.b {
  padding: 15px 50px 15px 30px;
}

.download .list li .removes {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 15px;
  display: block;
  z-index: 3;
}

.download .list li.a {
  background-color: #eee;
}

.download .list li.a p {
  color: #12d4bd;
}

.download .list li .name {
  color: #12d4bd;
  width: 40%;
  font-size: 0.9em;
  color: #717171;
  margin-left: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.download .list li:hover {
  background-color: #eee;
}

.download .list li p:nth-child(1) {
  font-size: 1em;
}
.download .list li .title {
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
