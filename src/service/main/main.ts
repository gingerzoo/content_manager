import lxRequest from '../index';

export function getEntriesRoles(userId) {
    return lxRequest.request({
        method: 'post',
        url: '/role/list'
    });
}

export function getEntriesDepartments() {
    return lxRequest.request({
        method: 'post',
        url: '/department/list'
    });
}
