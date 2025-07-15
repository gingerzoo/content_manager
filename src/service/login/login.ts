import lxRequest from '..';
import type { Iaccount } from '@/types/index';
export function accountLogin(account: Iaccount) {
    return lxRequest.request({
        method: 'post',
        url: '/login',
        data: account
    });
}

export function getUserInfoById(id: number) {
    return lxRequest.request({
        method: 'get',
        url: `/users/${id}`
    });
}

export function getMenusByRoleId(id: number) {
    return lxRequest.request({
        method: 'get',
        url: `/role/${id}/menu`
    });
}
