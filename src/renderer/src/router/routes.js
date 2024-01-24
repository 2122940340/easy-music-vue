/*
 * @Author: '天空' '2122940340@qq.com'
 * @Date: 2023-12-03 18:59:37
 * @LastEditors: '天空' '2122940340@qq.com'
 * @LastEditTime: 2023-12-05 20:13:56
 * @FilePath: \easy-music-vue-edition\src\renderer\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const routes = [
    {
        path: '/',
        title: '主页',
        component: () => import('/src/Home.vue'),
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: '',
                component: () => import('/src/views/Index/Home/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'home', //首页
                component: () => import('/src/views/Index/Home/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'songlist',//歌单
                component: () => import('/src/views/Song/SongList.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'search', // 搜索
                component: () => import('/src/views/Search/Search.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('/src/views/Search/SearchMusic.vue'),
                        meta: {
                            keepAlive: false
                        },
                    },
                    {
                        path: 'music',
                        component: () => import('/src/views/Search/SearchMusic.vue'),
                        meta: {
                            keepAlive: false
                        },
                    },
                    {
                        path: 'song',
                        component: () => import('/src/views/Search/Songlist.vue'),
                        meta: {
                            keepAlive: false
                        },
                    }
                ]

            },
            {
                path: 'like', // 喜欢
                component: () => import('/src/views/Index/Like/Like.vue'),
                meta: {
                    keepAlive: false
                },
                children: [
                    {
                        path: '',
                        component: () => import('/src/views/Index/Like/LikeMusic.vue'),
                        meta: {
                            keepAlive: false
                        },
                    },
                    {
                        path: 'music',//歌曲
                        component: () => import('/src/views/Index/Like/LikeMusic.vue'),
                        meta: {
                            keepAlive: false
                        },
                    },
                    {
                        path: 'song',//歌单
                        component: () => import('/src/views/Index/Like/LikeSong.vue'),
                        meta: {
                            keepAlive: false
                        },
                    },
                ]
            },
            {
                path: 'download', //下载
                component: () => import('/src/views/Index/Download/download.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'musicHall', //音乐馆
                component: () => import('/src/views/Index/MusicHall/MusicHall.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'radar', //雷达
                component: () => import('/src/views/Index/Radar/Radar.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'recentlyPlayedSongs', //最近
                component: () => import('/src/views/Index/RecentlyPlayedSongs/RecentlyPlayedSongs.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'about', //关于
                component: () => import('/src/views/Index/About/About.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'toLeadInto',//导入
                component: () => import('/src/views/Index/Like/ToLeadInto.vue'),
                meta: {
                    keepAlive: false
                },
            }
        ]
    },
    {
        path: '/play',
        name: 'play',
        title: '主页',
        component: () => import('../views/Play/Play.vue'),
        meta: {
            keepAlive: true
        },
    },

]
export default routes
