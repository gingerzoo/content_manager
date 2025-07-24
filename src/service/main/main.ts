import lxRequest from '../index';

export function getEntriesRoles() {
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

export function getEntriesMenus() {
    return lxRequest.request({
        method: 'post',
        url: '/menu/list'
    });
}
