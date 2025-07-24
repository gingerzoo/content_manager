import { getEntriesRoles, getEntriesDepartments, getEntriesMenus } from '@/service/main/main';
import { defineStore } from 'pinia';

interface IMainState {
    entireRoles: any[];
    entireDepartments: any[];
    entireMenus: any[];
}

const useMainStore = defineStore('main', {
    state: (): IMainState => ({
        entireRoles: [],
        entireDepartments: [],
        entireMenus: []
    }),
    actions: {
        async fetchEntireDataAction() {
            const rolesResult = await getEntriesRoles();
            this.entireRoles = rolesResult.data.list;
            const departmentResult = await getEntriesDepartments();

            this.entireDepartments = departmentResult.data.list;
            // console.log('当前角色数据--------和部门数据', rolesResult, departmentResult);
            const menusResult = await getEntriesMenus();

            this.entireMenus = menusResult.data.list;

            console.log('所有菜单数据------------', this.entireMenus);
        }
    }
});

export default useMainStore;
