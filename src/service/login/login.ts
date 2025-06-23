import lxRequest from '..';
import type { Iaccount } from '@/types/index';
export function accountLogin(account: Iaccount) {
    return lxRequest.request({
        method: 'post',
        url: '/login',
        data: account
    });
}
