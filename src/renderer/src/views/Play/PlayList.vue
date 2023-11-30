<template>
    <div ref="playList" class="playList">
        <ul class="tab">
            <li class="a">最近播放</li>
            <li>歌单播放</li>
        </ul>
        <svg @click="remove()" t="1701340039245" class="remove" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4277" width="20" height="20">
            <path
                d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
                fill="#8a8a8a" p-id="4278"></path>
            <path
                d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
                fill="#8a8a8a" p-id="4279"></path>
            <path
                d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
                fill="#8a8a8a" p-id="4280"></path>
            <path
                d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
                fill="#8a8a8a" p-id="4281"></path>
        </svg>
        <ul ref="list" class="list">
            <li @click="play(i)" :ref="i.songid" v-for="(i, key) in list" :key="i">
                <p>{{ i.title }}</p>
                <p>{{ i.author }}</p>
                <svg @click="elRemove($event, key)" t="1701340255394" class="removes" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4626"
                    data-spm-anchor-id="a313x.search_index.0.i3.12603a81fKfRbu" width="20" height="20">
                    <path
                        d="M875.432137 148.567863c-198.090484-198.090484-523.981279-198.090484-722.071763 0s-198.090484 523.981279 0 722.071763 523.981279 198.090484 722.071763 0S1073.522621 353.048362 875.432137 148.567863zM670.951638 717.279251 511.201248 557.528861l-159.75039 159.75039c-12.780031 12.780031-31.950078 12.780031-44.730109 0-12.780031-12.780031-12.780031-31.950078 0-44.730109L466.471139 512.798752 306.720749 353.048362C293.940718 340.268331 293.940718 321.098284 306.720749 308.318253c12.780031-12.780031 31.950078-12.780031 44.730109 0L511.201248 468.068643l159.75039-159.75039c12.780031-12.780031 31.950078-12.780031 44.730109 0 12.780031 12.780031 12.780031 31.950078 0 44.730109L555.931357 512.798752l159.75039 159.75039c12.780031 12.780031 12.780031 31.950078 0 44.730109S683.731669 730.059282 670.951638 717.279251z"
                        fill="#d81e06" p-id="4627" data-spm-anchor-id="a313x.search_index.0.i2.12603a81fKfRbu" class="">
                    </path>
                </svg>
            </li>

            <!-- <li @click="play(i, true)" :ref="i.id" v-for="(i, key) in list" :key="i, key">
                <p>{{ i.name }}</p>
                <p>{{ i.ar[0].name }}</p>
                <svg @click="elRemove($event, key)" t="1701340255394" class="removes" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4626"
                    data-spm-anchor-id="a313x.search_index.0.i3.12603a81fKfRbu" width="20" height="20">
                    <path
                        d="M875.432137 148.567863c-198.090484-198.090484-523.981279-198.090484-722.071763 0s-198.090484 523.981279 0 722.071763 523.981279 198.090484 722.071763 0S1073.522621 353.048362 875.432137 148.567863zM670.951638 717.279251 511.201248 557.528861l-159.75039 159.75039c-12.780031 12.780031-31.950078 12.780031-44.730109 0-12.780031-12.780031-12.780031-31.950078 0-44.730109L466.471139 512.798752 306.720749 353.048362C293.940718 340.268331 293.940718 321.098284 306.720749 308.318253c12.780031-12.780031 31.950078-12.780031 44.730109 0L511.201248 468.068643l159.75039-159.75039c12.780031-12.780031 31.950078-12.780031 44.730109 0 12.780031 12.780031 12.780031 31.950078 0 44.730109L555.931357 512.798752l159.75039 159.75039c12.780031 12.780031 12.780031 31.950078 0 44.730109S683.731669 730.059282 670.951638 717.279251z"
                        fill="#d81e06" p-id="4627" data-spm-anchor-id="a313x.search_index.0.i2.12603a81fKfRbu" class="">
                    </path>
                </svg>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: window.Music.list.data,
            removeCode: false
        }

    },
    mounted() {
        // 寻找在播放的
        if (this.$refs[window.Music._songid]) {
            this.$refs[window.Music._songid][0].classList.add('a')
        }
    },
    methods: {
        play(i, code) {
            if (code != true) {
                if (this.removeCode != true) {
                    window.Music.play(i);
                    for (let i in this.$refs) {
                        if (i != window.Music._songid || i != null || i != undefined) {
                            this.$refs[i][0].classList.remove('a')
                        } else {
                            this.$refs[i][0].classList.add('a')
                        }
                    }
                }
            } else {
                window.Music.getURL(i)
            }
        },
        remove() {
            if (this.removeCode) {
                this.removeCode = false
                for (let i in this.$refs) {
                    if (this.$refs[i][0] != null || this.$refs[i][0] != undefined) {
                        this.$refs[i][0].querySelector('.removes').style.display = 'none';
                        this.$refs[i][0].classList.remove('b')
                    }
                }

            } else {
                this.removeCode = true
                for (let i in this.$refs) {
                    if (this.$refs[i][0] != null || this.$refs[i][0] != undefined) {
                        this.$refs[i][0].querySelector('.removes').style.display = 'block';
                        this.$refs[i][0].classList.add('b')
                    }
                }
            }

        },
        elRemove(e, id) {
            e.currentTarget.parentNode.remove()
            window.Music.songListDelete(id)
            this.list.splice(id, 1)
        }
    }
}
</script>
<style>
.playList {
    width: 30%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 10px #717171;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    transition: all 0.5s;
    transform: translateX(100vw);
}

.playList .remove {
    width: 25px;
    height: 25px;
    float: right;
    margin-right: 30px;
}

.playList .tab {
    width: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    padding: 15px 0;
}

.playList .tab li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #717171;
    position: relative;
}

.playList .tab li.a {
    font-weight: bold;
    font-size: 1.1em;
    color: #000;
    position: relative;
}

.playList .tab li.a::before {
    content: '';
    bottom: -15px;
    width: 80%;
    height: 3px;
    background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
    position: absolute;

}

.playList .list {
    height: 80%;
    overflow: scroll;
    margin-top: 10%;
}

.playList .list li {
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.playList .list li.b {
    padding: 15px 50px 15px 30px;
}

.playList .list li .removes {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    display: none;
    z-index: 3;
}

.playList .list li.a {
    background-color: #eee;
}

.playList .list li.a p {
    color: #12d4bd;
}

.playList .list li.a p:nth-child(2) {
    color: #12d4bd;

}

.playList .list li:hover {
    background-color: #eee;
}

.playList .list li p:nth-child(1) {
    font-size: 1.0em;
}

.playList .list li p:nth-child(2) {
    font-size: 0.9em;
    color: #717171;
}
</style>