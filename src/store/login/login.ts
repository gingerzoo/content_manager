import { defineStore } from 'pinia';
import { accountLogin } from '@/service/login/login';
import type { Iaccount } from '@/types/index';
import router from '@/router/index';

const useLoginStore = defineStore('login', {
    state: () => ({
        id: '',
        token: localStorage.getItem('token') ?? '',
        name: ''
    }),
    actions: {
        async loginAccountAction(account: Iaccount) {
            const loginResult = await accountLogin(account);
            this.id = loginResult.data.id;
            this.name = loginResult.data.name;
            this.token = loginResult.data.token;

            // 进行本地缓存
            localStorage.setItem('token', this.token);

            router.push('/main');
        }
    }
});

export default useLoginStore;
