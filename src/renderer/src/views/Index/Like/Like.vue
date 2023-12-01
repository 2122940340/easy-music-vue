<template>
  <div class="like">
    <p class="title">我喜欢</p>
    <ul class="list">
      <li @click="play(i)" :ref="i.songid" v-for="(i, key) in list" :key="i">
        <p>{{ i.title }}</p>
        <p>{{ i.author }}</p>
        <svg
          @click="elRemove($event, key)"
          t="1701340255394"
          class="removes"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4626"
          data-spm-anchor-id="a313x.search_index.0.i3.12603a81fKfRbu"
          width="20"
          height="20"
        >
          <path
            d="M875.432137 148.567863c-198.090484-198.090484-523.981279-198.090484-722.071763 0s-198.090484 523.981279 0 722.071763 523.981279 198.090484 722.071763 0S1073.522621 353.048362 875.432137 148.567863zM670.951638 717.279251 511.201248 557.528861l-159.75039 159.75039c-12.780031 12.780031-31.950078 12.780031-44.730109 0-12.780031-12.780031-12.780031-31.950078 0-44.730109L466.471139 512.798752 306.720749 353.048362C293.940718 340.268331 293.940718 321.098284 306.720749 308.318253c12.780031-12.780031 31.950078-12.780031 44.730109 0L511.201248 468.068643l159.75039-159.75039c12.780031-12.780031 31.950078-12.780031 44.730109 0 12.780031 12.780031 12.780031 31.950078 0 44.730109L555.931357 512.798752l159.75039 159.75039c12.780031 12.780031 12.780031 31.950078 0 44.730109S683.731669 730.059282 670.951638 717.279251z"
            fill="#d81e06"
            p-id="4627"
            data-spm-anchor-id="a313x.search_index.0.i2.12603a81fKfRbu"
            class=""
          ></path>
        </svg>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted () {
    if (this.$refs[Music._songid]) {
      this.$refs[Music._songid][0].classList.add("a");
    }
    this.list = Music.list.data
  },
  methods: {
    play(i) {
      Music.play(i);
      for (let i in this.$refs) {
        this.$refs[i][0].classList.remove("a");
      }
      this.$refs[i.songid][0].classList.add("a");
    },
  },
};
</script>
<style>
.like {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.like > .title {
  font-size: 2em;
  font-weight: bold;
  padding: 0px 15px;
}

.like .list {
  flex: 1;
  overflow: scroll;
  padding: 20px 0;
}
.like .list li {
  padding: 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.like .list li.a {
  background-color: #eee;
}
.like .list li.b {
  padding: 15px 50px 15px 30px;
}

.like .list li .removes {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  display: none;
  z-index: 3;
}

.like .list li.a {
  background-color: #eee;
}

.like .list li.a p {
  color: #12d4bd;
}

.like .list li.a p:nth-child(2) {
  color: #12d4bd;
}

.like .list li:hover {
  background-color: #eee;
}

.like .list li p:nth-child(1) {
  font-size: 1em;
}

.like .list li p:nth-child(2) {
  font-size: 0.9em;
  color: #717171;
}
</style>
