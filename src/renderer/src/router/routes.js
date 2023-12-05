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
                children:[
                    {
                        path:'',
                        component:()=> import('/src/views/Search/SearchMusic.vue')
                    },
                    {
                        path:'music',
                        component:()=> import('/src/views/Search/SearchMusic.vue')
                    },
                    {
                        path:'song',
                        component:()=> import('/src/views/Search/Songlist.vue')
                    }
                ]

            },
            {
                path:'like', // 喜欢
                component:()=> import('/src/views/Index/Like/Like.vue'),
                children:[
                    {
                        path:'',
                        component:()=> import('/src/views/Index/Like/LikeMusic.vue')
                    },
                    {
                        path:'music',
                        component:()=> import('/src/views/Index/Like/LikeMusic.vue')
                    },
                    {
                        path:'song',
                        component:()=> import('/src/views/Index/Like/LikeSong.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/play',
        name: 'play',
        title: '主页',
        component: () => import('../views/Play/Play.vue'),
    },

]
export default routes
