import lxRequest from '..';
export function accountLogin(account: any) {
    lxRequest.request({
        method: 'post',
        url: '/login',
        data: account
    });
}
