const routes = [
    {
        path: '/',
        title: '主页',
        component: () => import('../Home.vue'),
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: '',
                component: () => import('../views/Index/Home/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'home', //首页
                component: () => import('../views/Index/Home/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'songlist',//歌单
                component: () => import('../views/Song/SongList.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path: 'search', // 搜索
                component: () => import('../views/Search/Search.vue'),
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
