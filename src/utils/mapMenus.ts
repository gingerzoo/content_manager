import type { RouteRecordRaw } from 'vue-router';

function loadLocalRoutes() {
    //  动态加载文件
    const localRoutes: RouteRecordRaw[] = [];
    // 1.读取router/main所有的ts文件
    const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
        eager: true
    });

    // 将加载的放入localRoute
    for (const key in files) {
        const module = files[key];
        localRoutes.push(module.default);
    }

    return localRoutes;
}

export let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]) {
    const localRoutes = loadLocalRoutes();

    const routes: RouteRecordRaw[] = [];
    // let firstMenu: any = null;
    // 2.根据菜单去匹配正确的路由
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            const route = localRoutes.find((item) => item.path === submenu.url);
            console.log('匹配到的路由------', route);
            if (route) {
                // 给route的外层菜单加一个重定向
                if (!routes.find((item) => item.path === menu.url)) {
                    routes.push({
                        path: menu.url,
                        redirect: route.path
                    });
                }
                routes.push(route);
            }

            if (!firstMenu && route) {
                firstMenu = submenu;
            }
        }
    }

    return routes;
}

export function mapPathToMenu(path: string, userMenus: any[]) {
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            // const route = localRoutes.find((item) => item.path === submenu.url);
            if (submenu.url === path) {
                return submenu;
            }
        }
    }

    return routes;
}

interface Ibreadcrumb {
    name: string;
    path: string;
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
    const breadcrumb: Ibreadcrumb[] = [];
    for (const menu of userMenus) {
        for (const submenu of menu.children) {
            // const route = localRoutes.find((item) => item.path === submenu.url);
            if (submenu.url === path) {
                // 上一级路由
                breadcrumb.push({
                    name: menu.name,
                    path: menu.url
                });
                breadcrumb.push({
                    name: submenu.name,
                    path: submenu.url
                });
            }
        }
    }

    return breadcrumb;
}
