<template>
    <div class="MusicStatusBar">
        <div class="scheduleBox">
            <p id="schedule"></p>
        </div>
        <div class="left">
            <img id="icon" src="../assets/icon.png" alt="">
            <div :style="styleColor">
                <p id="title">
                    轻松音乐
                </p>
                <p id="name">
                    未知歌手
                </p>
            </div>
        </div>
        <div class="play">
            <svg @click="Music.previousSong()" id="up" t="1700703139855" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3661" width="30" height="30">
                <path :style="styleColor"
                    d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z"
                    fill="#000" p-id="3662"></path>
            </svg>
            <svg id="play" t="1700703101242" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3305" width="30" height="30">
                <path
                    d="M836.526491 434.667753C656.714048 297.440472 476.912443 160.200546 297.101806 22.973265c-64.023142-48.859957-156.302732-3.213259-156.302732 77.331343v823.390784c0 80.544602 92.27959 126.1913 156.302732 77.329537 179.810637-137.227282 359.612242-274.467207 539.424685-411.694488 51.014773-38.93841 51.014773-115.724277 0-154.662688z"
                    fill="#000" p-id="3306"></path>
            </svg>
            <svg style="display: none;" id="pause" t="1700890261734" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3284" width="20" height="20">
                <path
                    d="M358.40298 959.996726V64.001468C358.40298 28.652009 329.750971 0 294.401513 0c-35.349459 0-64.003274 28.652009-64.003274 64.001468v895.995258c0 35.338621 28.652009 64.003274 64.003274 64.003274 35.349459 0 64.001468-28.662846 64.001467-64.003274zM793.599955 959.996726V64.001468C793.599955 28.652009 764.947946 0 729.598487 0c-35.335009 0-63.988824 28.652009-63.988824 64.001468v895.995258c0 35.338621 28.652009 64.003274 63.988824 64.003274 35.349459 0 64.001468-28.662846 64.001468-64.003274z"
                    fill="#ffffff" p-id="3285"></path>
            </svg>
            <svg @click="Music.nextSong()" id="nextSong" t="1700703160048" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3911" width="30" height="30">
                <path :style="styleColor"
                    d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                    fill="#000" p-id="3912"></path>
            </svg>
        </div>
        <div class="right">
            <div :style="styleColor" class="time">
                <p>00:00</p>
                <p>/</p>
                <p>00:00</p>
            </div>
            <div id="playList"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
            styleColor: {
                color: '#000',
                fill: '#000'
            },
            Music: window.Music
        }
    },
    methods: {
    }
}
</script>

<style>
.MusicStatusBar {
    position: relative;
    display: flex;
    align-items: center
}

.MusicStatusBar .left {
    display: flex;
    align-items: center;
    padding-left: 25px;
    z-index: 2;
}

.MusicStatusBar .left #icon {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.MusicStatusBar .left div {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
}

.MusicStatusBar .left div #title {
    font-size: 1.1em;
    font-weight: bold;
}

.MusicStatusBar .left div #name {
    font-size: 0.9em;
}

.MusicStatusBar .play {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 0;
}

.MusicStatusBar .play #up,
.MusicStatusBar .play #nextSong {
    width: 35px;
    height: 35px;
}

.MusicStatusBar .play #up path,
.MusicStatusBar .play #nextSong path {
    fill: #000;
}

.MusicStatusBar .play #play {
    width: 50px;
    height: 50px;
    background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
    padding: 10px 5px 10px 7px;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 15px;
}

.MusicStatusBar #pause {
    width: 50px;
    height: 50px;
    background-image: linear-gradient(to left top, #42ffaa, #12d4bd);
    padding: 10px 5px 10px 5px;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 15px;
}

.MusicStatusBar .play #play path {
    fill: #ffffff;
}

.MusicStatusBar .right {
    display: flex;
    align-items: center;
    padding-right: 25px;
}

.MusicStatusBar .right .time {
    display: flex;
    align-items: center;
    color: #717171;
}

.MusicStatusBar .right .time p {
    font-size: 0.9em;

}

.MusicStatusBar .right .time p:nth-child(2) {
    margin: 0 10px 0px 10px;
}

.MusicStatusBar .scheduleBox {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: #d7d7d7;

}

.MusicStatusBar .scheduleBox p {
    width: 0;
    height: 100%;
    background-color: #12d4bd;
    transition: all 1s;
}

.MusicStatusBar .active {
    color: #fff;
    fill: #fff;
}
</style>