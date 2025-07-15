import { deleteUserById, postUsersListData } from '@/service/main/system/system';
import { defineStore } from 'pinia';

interface Iuser {
    id: number;
    name: string;
    realname: string;
    cellphone: number;
    enable: number;
    departmentId: number;
    roleId: number;
    createAt: string;
    updateAt: string;
}

interface IsystemState {
    usersList: Iuser[];
    usersTotalCount: number;
}

const useSystemStore = defineStore('user', {
    state: (): IsystemState => ({
        usersList: [],
        usersTotalCount: 0
    }),
    actions: {
        async getUserListAction(data) {
            const res = await postUsersListData(data);

            const { totalCount, list } = res.data;
            console.log('重新请求列表数据-------', res);

            this.usersList = list;
            this.usersTotalCount = totalCount;
        },
        async deleteUserAction(id) {
            const res = await deleteUserById(id);

            // const { totalCount, list } = res.data;
            console.log('删除后的列表数据-------', res);
            this.getUserListAction({ offsize: 0, size: 10 });

            // this.usersList = list;
            // this.usersTotalCount = totalCount;
        }
    }
});

export default useSystemStore;
