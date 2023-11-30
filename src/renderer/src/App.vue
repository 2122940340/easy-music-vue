<template>
    <div class="region"></div>
    <router-view ref="Plays" class="App" v-slot="{ Component }">
        <Transition name="fade">
            <keep-alive>
                <component ref="Main" :is="Component"></component>
            </keep-alive>

        </Transition>
    </router-view>
    <MusicStatusBar ref="MusicStatusBar" class="MusicStatusBar"></MusicStatusBar>
</template>

<script>
// import { Music } from "./modules/music";
import { Music } from "./modules/music";
import router from "./router/index";
import MusicStatusBar from './views/Play/MusicStatusBar.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// music.start()
// console.log(new music())
// const a =  new music()
// console.log(Vue)

let audio = new Audio()
window.Music = new Music(audio);

export default {

    components: {
        MusicStatusBar
    },
    methods: {

    },
    activated() {
        if (!this.$route.meta.keepAlive) {
            // 如果该页面不需要缓存，则在页面激活时销毁缓存
            this.$destroy()
        }
        console.log(this.destroy)
    },
    mounted() {
        this.home = this.$refs.Main
        window.Music.start()

        setTimeout(() => {
            router.push({
                path: '/home'
            })
        }, 100)
    },
    watch: {
        async $route(to, from) {
            console.log(to);//到哪去
            console.log(from)
            if (to.path != '/play') {
                this.$refs.MusicStatusBar.styleColor = {
                    color: '#000',
                    fill: '#000'
                }
            }
            switch (to.path) {
                case '/play':
                    this.$refs.MusicStatusBar.styleColor = {
                        color: '#fff',
                        fill: '#fff'
                    }
                    let Main = await this.$refs
                    let home = this.$refs
                    const Play = Main.Main
                    window.Play = Play
                    // console.log(window.Music.lrcList)
                    if (window.Music.lrcList != undefined) Play.start(window.Music.lrcList)

                    break
                case '/home':
                    this.$refs.MusicStatusBar.styleColor = {
                        color: '#000',
                        fill: '#000'
                    }
                    break
            }
            if (to.path == '/play') {
            }
        }
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    outline: none;
}

svg:hover path {
    fill: #0ccfb1;
}

.App {
    width: 100%;
    height: calc(100vh - 80px);
}

.region {
    width: 100vw;
    height: 25px;
    position: absolute;
    top: 0px;
    left: 0px;
    -webkit-app-region: drag;
}

html,
body {
    width: 100vw;
    height: 100vh;
}
ul{
    list-style: none;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave {}

.MusicStatusBar {
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
}

*::-webkit-scrollbar {
    height: 0;
    display: none;
}
</style>