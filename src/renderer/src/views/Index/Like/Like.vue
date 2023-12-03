<template>
  <div class="like">
    <p class="title">我喜欢</p>
    <ul class="list">
      <li @click="play(i)" :ref="i.songid" v-for="(i, key) in list" :key="i">
        <svg
          @click="songLikeDelete($event, i.songid)"
          t="1701419350343"
          class="islike"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2788"
          width="20"
          height="20"
        >
          <path
            d="M780.8 204.8c-83.2-44.8-179.2-19.2-243.2 44.8L512 275.2 486.4 249.6c-64-64-166.4-83.2-243.2-44.8C108.8 275.2 89.6 441.6 185.6 537.6l32 32 153.6 153.6 102.4 102.4c25.6 25.6 57.6 25.6 83.2 0l102.4-102.4 153.6-153.6 32-32C934.4 441.6 915.2 275.2 780.8 204.8z"
            fill="#d81e06"
            p-id="2789"
          ></path>
        </svg>
        <svg
          @click="songLike($event, i)"
          class="likes"
          t="1701419140569"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2586"
          width="20"
          height="20"
        >
          <path
            d="M332.8 249.6c38.4 0 83.2 19.2 108.8 44.8L467.2 320 512 364.8 556.8 320l25.6-25.6c32-32 70.4-44.8 108.8-44.8 19.2 0 38.4 6.4 57.6 12.8 44.8 25.6 70.4 57.6 76.8 108.8 6.4 44.8-6.4 89.6-38.4 121.6L512 774.4 236.8 492.8C204.8 460.8 185.6 416 192 371.2c6.4-44.8 38.4-83.2 76.8-108.8C288 256 313.6 249.6 332.8 249.6L332.8 249.6M332.8 185.6C300.8 185.6 268.8 192 243.2 204.8 108.8 275.2 89.6 441.6 185.6 537.6l281.6 281.6C480 832 499.2 838.4 512 838.4s32-6.4 38.4-19.2l281.6-281.6c96-96 76.8-262.4-57.6-332.8-25.6-12.8-57.6-19.2-89.6-19.2-57.6 0-115.2 25.6-153.6 64L512 275.2 486.4 249.6C448 211.2 390.4 185.6 332.8 185.6L332.8 185.6z"
            fill="#707070"
            p-id="2587"
          ></path>
        </svg>
        <p class="title">{{ i.title }}</p>
        <p class="name">{{ i.author }}</p>
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
  mounted() {
    if (this.$refs[Music._songid]) {
      this.$refs[Music._songid][0].classList.add("a");
    }
    const datas = fs.readFileSync(Music.likeListPath, "utf-8", (err) => {});
    let data = JSON.parse(datas);
    if (typeof data === String) {
      data = JSON.parse(data);
    }
    this.list = data.data;
  },
  methods: {
    play(i) {
      Music.play(i);
      for (let i in this.$refs) {
        this.$refs[i][0].classList.remove("a");
      }
      this.$refs[i.songid][0].classList.add("a");
    },
    songLikeDelete(event, id) {
      event.currentTarget.nextElementSibling.style.display = "block";
      event.currentTarget.style.display = "none";
      window.Music.songLikeDelete(id);
    },
    songLike(event, array) {
      event.currentTarget.previousElementSibling.style.display = "block";
      event.currentTarget.style.display = "none";
      window.Music.songLike(array);
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

.like .list li .name {
  color: #12d4bd;
}

.like .list li:hover {
  background-color: #eee;
}

.like .list li p:nth-child(1) {
  font-size: 1em;
}
.like .list li .title {
  margin-left: 10px;
}
.like .list li .name {
  font-size: 0.9em;
  color: #717171;
  margin-left: auto;
}
.like .list li .islike {
  display: block;
}
.like .list li .likes {
  display: none;
}
</style>
