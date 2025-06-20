import { defineStore } from 'pinia';
import { accountLogin } from '@/service/login/login';

const useLoginStore = defineStore('login', {
    state: () => ({
        id: '',
        token: '',
        name: ''
    }),
    actions: {
        async loginAccountAction(account: any) {
            const loginResult = await accountLogin(account).then((res) => {
                console.log('登录返回信息------', res);
            });
        }
    }
});

export default useLoginStore;
