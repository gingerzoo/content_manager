import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('../views/main/main.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/login.vue')
        },
        /* :pathMatch 是一个参数名（你可以叫它别的，比如 :anyPath，只是个变量名）； */
        {
            path: '/:pathMatch(.*)',
            component: () => import('../views/not-found/not-found.vue')
        }
    ]
});

// component选项对应react里面的element哟
// 导航守卫！！！！
// 路由首位
// 返回值决定了返回的路径
router.beforeEach((to, from) => {
    const token = localStorage.getItem('token');
    console.log('不对啊，没有token吗------------', token);
    if (to.path === '/main' && !token) {
        return '/login';
    }
});

export default router;
