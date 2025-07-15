import { defineStore } from 'pinia';
import { accountLogin, getUserInfoById, getMenusByRoleId } from '@/service/login/login';
import type { Iaccount } from '@/types/index';
import router from '@/router/index';
import type { RouteRecordRaw } from 'vue-router';
import { mapMenusToRoutes } from '@/utils/mapMenus';
import useMainStore from '../main/main';
interface ILoginState {
    token: string;
    userInfo: any;
    userMenus: any;
}

const useLoginStore = defineStore('login', {
    state: (): ILoginState => ({
        token: localStorage.getItem('token') ?? '',
        userInfo: JSON.parse(localStorage.getItem('userInfo') ?? '{}'),
        userMenus: JSON.parse(localStorage.getItem('userMenus') ?? '[]')
    }),
    actions: {
        async loginAccountAction(account: Iaccount) {
            const loginResult = await accountLogin(account);
            const id = loginResult.data.id;
            const name = loginResult.data.name;
            this.token = loginResult.data.token;

            // 进行token本地缓存
            localStorage.setItem('token', this.token);

            // 获取登录用户的详情信息
            const userDetail = await getUserInfoById(id);
            // const userInfo = userDetail.data;
            this.userInfo = userDetail.data;

            // 根据角色请求用户的权限
            const userMenus = await getMenusByRoleId(this.userInfo.role.id);
            this.userMenus = userMenus.data;

            //  进行用户信息本地缓存
            localStorage.setItem('userInfo', JSON.stringify(userDetail.data));
            localStorage.setItem('userMenus', JSON.stringify(userMenus.data));

            // d动态加载路由
            const routes = mapMenusToRoutes(userMenus.data);
            routes.forEach((route) => {
                router.addRoute('main', route);
            });

            // 页面跳转
            // 登录成功时，应该自动跳转动态路由匹配到的第一个页面
            router.push('/main');
        },
        loadLocaldataFromRefresh() {
            const token = localStorage.getItem('token');
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const userMenus = JSON.parse(localStorage.getItem('userMenus'));

            if (token && userInfo && userMenus) {
                this.token = token;
                this.userInfo = userInfo;
                this.userMenus = userMenus;

                // 加载所有数据-------
                const mainStore = useMainStore();
                mainStore.fetchEntireDataAction();

                // 页面刷新时加载路由！！！！！！
                const routes = mapMenusToRoutes(userMenus);
                routes.forEach((route) => {
                    router.addRoute('main', route);
                });
            }
        }
    }
});

export default useLoginStore;
