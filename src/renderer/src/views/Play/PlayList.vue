<template>
    <div class="playList">
        <ul class="tab">
            <li class="a">最近播放</li>
            <li>歌单播放</li>
        </ul>
        <ul class="list">
            <li>
                <p>轻松音乐</p>
                <p>未知歌手</p>
            </li>
            <li>
                <p>轻松音乐</p>
                <p>未知歌手</p>
            </li>
            <li>
                <p>轻松音乐</p>
                <p>未知歌手</p>
            </li>
            <li>
                <p>轻松音乐</p>
                <p>未知歌手</p>
            </li>
            <li>
                <p>轻松音乐</p>
                <p>未知歌手</p>
            </li>
        </ul>
    </div>
</template>
<script>
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
.playList .list{
    
}
.playList .list li{
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.playList .list li:hover{
    background-color: #eee;
}
.playList .list li p:nth-child(1){
    font-size: 1.0em;
}
.playList .list li p:nth-child(2){
    font-size: 0.9em;
    color: #717171;
}

</style>