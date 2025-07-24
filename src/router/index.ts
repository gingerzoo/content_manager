import { createRouter, createWebHistory } from 'vue-router';
import { firstMenu } from '@/utils/mapMenus';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
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

const localRoutes = [
    {
        path: '/main/analysis/overview',
        component: () => import('../views/main/analysis/overview/overvew.vue')
    },
    {
        path: '/main/analysis/dashboard',
        component: () => import('../views/main/analysis/dashboard/dashboard.vue')
    },
    {
        path: '/main/system/role',
        component: () => import('../views/main/system/role/role.vue')
    },
    {
        path: '/main/system/user',
        component: () => import('../views/main/system/user/user.vue')
    }
];

// d动态添加路由

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

    // 如果是进入main
    if (to.path === '/main') {
        return firstMenu?.url;
    }
});

export default router;
