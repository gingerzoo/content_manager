export default function mapMenuListToIds(menulist: any[]) {
    const ids: number[] = [];

    function recurseGetId(menus: any[]) {
        console.log('传进来的meus-------', menus);
        for (const menu of menus) {
            if (menu.children) {
                recurseGetId(menu.children);
            } else {
                ids.push(menu.id);
            }
        }
    }

    recurseGetId(menulist);

    return ids;
}

// 从菜单映射到按钮权限
export function mapUserMenusToPermissions(menuList: any[]) {
    const permissions: string[] = [];
    console.log('传进来的参数=====', menuList);

    // 又是递归
    function recurseGetPermission(menus: any[]) {
        for (const menu of menus) {
            if (menu.type === 3) {
                permissions.push(menu.permission);
            } else {
                recurseGetPermission(menu.children ?? []);
            }
        }
    }

    recurseGetPermission(menuList);

    return permissions;
}
