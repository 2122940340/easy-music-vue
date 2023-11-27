<template>
    <div class="Play">
        <router-link class="end" to="/">
            <svg t="1701086358349" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="9375" width="30" height="30">
                <path
                    d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
                    p-id="9376" fill="#ffffff"></path>
            </svg>
        </router-link>
        <img class="back" :src=icon alt="">
        <div class="mask"></div>
        <div class="left">
            <img id="icon" :src=icon alt="">
        </div>
        <div class="right">
            <p id="title">{{ title }}</p>
            <p id="name">{{ name }}</p>
            <ul ref="scroll" class="list">
                <li :data-time='i.time' v-for="(i, index) in list" v-bind:key="i">
                    {{ i.lrc }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script >
import { useRouter, useRoute } from 'vue-router'
import router from '../router/index'
var seti
export default {
    setup() {
        const route = useRoute()
    },
    data() {
        return {
            icon: 'http://p2.music.126.net/v0LaYOX44ZiJjC1bzZbKOg==/109951163884032084.jpg?param=300x300',
            title: '轻松音乐',
            nmae: '未知歌手',
            list: {
                lrc: [],
                time: []
            },
        }
    },
    methods: {
        start(list) {
            this.list = list
            console.log(list)
            this.time()
            this.icon = window.Music._pic
            // console.log
            this.name = window.Music._name
            this.title = window.Music._title
        },
        time(lrc) {
            const ul = this.$refs.scroll
            let list;
            setInterval(() => {
                //vue实在不道咋写，只能操作原生了 by 11.27  tiank
                list = document.querySelectorAll('li')
                list.forEach((item, index) => {
                    // console.log(item.getAttribute('class'))
                    if (item.getAttribute('data-time') == window.Music.lrc.time) {
                        item.classList.add('selected')
                        // ul.scrollTo(0,(ul.scrollHeight / list.length) + (ul.scrollHeight / list.length / 2))
                        ul.scrollTo(0, (item.getBoundingClientRect().height) * index)
                    } else {
                        item.classList.remove('selected')
                    }
                });
                let chang = ul.scrollHeight / list.length
                // if (ul.scrollTop == 300){

                // }
                //     console.log(ul.scroll)
            }, 1000)

        },
    },
    mounted() {
        console.log(window)
    }
}
</script>
<style>
.Play {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    /* background-color: #000; */
}

.Play .end {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 25px;
    left: 40px;
}

.Play .left {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 100px;
}

.Play .left #icon {
    width: 250px;
    height: 250px;
}

.Play .right {
    width: calc(100% - 380px);
    height: calc(100% - 100px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.Play .back {
    width: 120vw;
    height: 105vh;
    position: absolute;
    top: 0;
    z-index: -2;
    filter: blur(30px);
    object-fit: cover;
    margin-left: -10vw;
    margin-top: -5vh;
}

.Play .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    z-index: -1;
}

.Play #title {
    font-size: 2em;
    font-weight: bold;
    color: #ffffff;
    margin-top: 100px;
}

.Play #name {
    font-size: 1em;
    color: #0af8f1;
    margin-top: 15px;
}

.Play .list {
    height: 100%;
    margin-top: 30px;
    color: #fff;
    overflow: scroll;
    scroll-behavior: smooth;

}

.Play .list li {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    height: 50px;
    transition: all 0.5s;
}

.Play .list .selected {
    font-size: 1.5em;
    color: #0af8f1;
}
</style>