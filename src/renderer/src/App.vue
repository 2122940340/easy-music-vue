<template>
    <div class="region"></div>
    <router-view ref="Plays" class="App" v-slot="{ Component }">
        <Transition name="fade">
            <component ref="Main" :is="Component"></component>
        </Transition>
    </router-view>
    <MusicStatusBar ref="MusicStatusBar" class="MusicStatusBar"></MusicStatusBar>
</template>

<script>
// import { Music } from "./modules/music";
import { Music } from "./modules/music";
import router from "./router/index";
import MusicStatusBar from './views/MusicStatusBar.vue'
import { ref } from 'vue'
// router.push('/')
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
    mounted() {
        this.home = this.$refs.Main
        window.Music.start()

    },
    watch: {
        async $route(to, from) {
            console.log(to.path);//到哪去
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
                    Play.start(window.Music.lrcList)
                    break
                case '/':
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
}

.App {
    width: 100%;
    height: calc(100vh - 80px);
}
.region{
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