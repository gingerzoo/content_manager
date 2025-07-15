import { getEntriesRoles, getEntriesDepartments } from '@/service/main/main';
import { defineStore } from 'pinia';

interface IMainState {
    entireRoles: any[];
    entireDepartments: any[];
}

const useMainStore = defineStore('main', {
    state: (): IMainState => ({
        entireRoles: [],
        entireDepartments: []
    }),
    actions: {
        async fetchEntireDataAction() {
            const rolesResult = await getEntriesRoles();
            this.entireRoles = rolesResult.data.list;
            const departmentResult = await getEntriesDepartments();
            console.log('当前角色数据--------和部门数据', rolesResult, departmentResult);
            this.entireDepartments = departmentResult.data.list;
        }
    }
});

export default useMainStore;
