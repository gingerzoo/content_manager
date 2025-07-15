import lxRequest from '../../index';

export function postUsersListData(data) {
    return lxRequest.request({
        method: 'post',
        url: '/users/list',
        data
    });
}

export function deleteUserById(userId) {
    return lxRequest.request({
        method: 'delete',
        url: `/users/${userId}`
    });
}
