const routes = [
    {
        path: '/',
        title: '主页',
        component: () => import('../Home.vue'),
        children: [
            {
                path: '/',
                component: () => import('../views/Home.vue'),
            },
        ]
    },
    {
        path: '/home',
        title: '主页',
        component: () => import('../Home.vue'),
        children: [
            {
                path: '/',
                component: () => import('../views/Home.vue'),
            }
        ]
    },
    {
        path: '/play',
        name: 'play',
        title: '主页',
        component: () => import('../views/Play.vue'),
        children: [
            {
                path: 'aaa',
                component: () => import('../views/Home.vue'),
            }
        ]
    },
]
export default routes
