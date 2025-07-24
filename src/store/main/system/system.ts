import {
    deleteUserById,
    postUsersListData,
    createNewUser,
    editUserInfo,
    deletePageById,
    postPageListData,
    createNewPage,
    editPageInfo
} from '@/service/main/system/system';
import { defineStore } from 'pinia';
import useMainStore from '../main';

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
    pageList: any[];
    pageTotalCount: number;
}

const useSystemStore = defineStore('user', {
    state: (): IsystemState => ({
        usersList: [],
        usersTotalCount: 0,
        pageList: [],
        pageTotalCount: 0
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

            console.log('删除后的列表数据-------', res);
            this.getUserListAction({ offset: 0, size: 10 });
        },
        async createNewUserAction(userInfo) {
            const res = await createNewUser(userInfo);
            this.getUserListAction({ offset: 0, size: 10 });
        },
        async editUserInfoAction(userId, userInfo) {
            await editUserInfo(userId, userInfo);

            this.getUserListAction({ offset: 0, size: 10 });
        },

        // 通用页面调用抽取
        async getPageListAction(pageName: string, data: any) {
            console.log('发送获取list的网络请求');
            const res = await postPageListData(pageName, data);

            const { totalCount, list } = res.data;
            console.log('重新请求列表数据-------pageName', pageName, list);

            this.pageList = list;
            this.pageTotalCount = totalCount;
        },

        async deletePageAction(pageName: string, id: number) {
            const res = await deletePageById(pageName, id);

            console.log('删除后的列表数据-------', res);
            this.getPageListAction(pageName, { offset: 0, size: 10 });
        },

        async createNewPageAction(pageName: string, userInfo: any) {
            const res = await createNewPage(pageName, userInfo);

            this.getPageListAction(pageName, { offset: 0, size: 10 });

            // 还需要获取别的list吗
            const mainStore = useMainStore();
            mainStore.fetchEntireDataAction();
        },

        async editPageInfoAction(pageName: string, userId: number, userInfo: any) {
            const res = await editPageInfo(pageName, userId, userInfo);

            console.log('编辑后的列表数据-------', res);
            this.getPageListAction(pageName, { offset: 0, size: 10 });
            // 还需要获取别的list吗
            const mainStore = useMainStore();
            mainStore.fetchEntireDataAction();
        }
    }
});

export default useSystemStore;
