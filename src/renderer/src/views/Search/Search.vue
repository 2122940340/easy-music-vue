<template>
    <div @scroll="pageUp" class="searchOutcome">
        <div class="tab">
            <p>歌曲</p>
            <p>歌手</p>
            <p>专辑</p>

            <ul>
                <li @click="play(i)" v-for="i in list" v-bind:key="i">
                    <span>
                        <img :src=i.al.picUrl alt="">
                        <p>{{ i.name }}</p>
                    </span>
                    <span>
                        <p v-for="x in i.ar" v-bind:key="x">
                            {{ x.name }}
                        </p>
                    </span>
                    <span>
                        <p>{{ i.al.name }}</p>
                    </span>
                </li>
            </ul>
        </div>
        <img class="load" src="/src/assets/lo.gif" alt="">
    </div>
</template>
<script>

export default {
    data() {
        return {
            list: [],
            isPage: false,
            limit: 30,
            page: 0,
        }
    },
    watch: {
        $route(to, from) {
            this.pageNext(true)
        }
    },
    methods: {
        play(i) {
            window.Music.getURL(i)
        },
        pageUp(e) {
            const { scrollTop, clientHeight, scrollHeight } = e.target
            if (scrollTop + clientHeight === scrollHeight) {
                this.pageNext()
            }
        },
        pageNext(code) {
            if (this.isPage != true) {
                this.isPage = true
                this.searchValue = history.state.value
                let URL = window.APIURL + 'cloudsearch?keywords=' + this.searchValue + '&limit=30' + '&offset=' + this.limit * this.page
                this.page += 1
                fetch(URL)
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response)
                        this.isPage = false
                        // Object.assign(this.list,response.result.songs)
                        if (code) {
                            this.list = response.result.songs
                        } else {
                            let list = this.list
                            this.list = [...list, ...response.result.songs]
                        }
                    })
            }

        }
    },
    mounted() {
        this.pageNext()
    }
}
</script>
<style>
.searchOutcome {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
}

.searchOutcome>.tab {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
}

.searchOutcome>.tab>p {
    width: calc(100% / 3);
    color: #717171;
}

.searchOutcome>.tab>ul {
    width: 100%;
}

.searchOutcome>.tab>ul li {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 10px;
}

.searchOutcome>.tab>ul li:hover {
    background-color: #eeeeee;
}

.searchOutcome>.tab>ul li img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border-radius: 5px;
}

.searchOutcome>.tab>ul li span {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    margin-right: 10px;
}

.searchOutcome>.tab>ul li span p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* text-overflow: ellipsis; */
}

.searchOutcome .load {
    width: 150px;
    height: 150px;
    margin: auto;
}
</style>