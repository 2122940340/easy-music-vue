const routes = [
    // {
    //     path: '/',
    //     name: 'index',
    //     title: '主页',
    //     component: () => import('../Home.vue'),
    //     children:[
    //         {
    //             path:'/'
    //         }
    //     ]
    // },
    {
        path: '/',
        name: 'home',
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
                path: 'home',
                component: () => import('../views/Index/Home/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'songlist',
                component: () => import('../views/Song/SongList.vue'),
                meta: {
                    keepAlive: false
                },
            },
            {
                path:'search',
                component:() => import('../views/Search/Search.vue')
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
