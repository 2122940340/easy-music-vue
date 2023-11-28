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
                component: () => import('../views/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'home',
                component: () => import('../views/Home.vue'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: 'songlist',
                component: () => import('../views/SongList.vue'),
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
        component: () => import('../views/Play.vue'),
    },

]
export default routes
