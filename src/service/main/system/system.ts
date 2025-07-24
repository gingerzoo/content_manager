import lxRequest from '../../index';

export function postUsersListData(data: any) {
    return lxRequest.request({
        method: 'post',
        url: '/users/list',
        data
    });
}

export function deleteUserById(userId: number) {
    return lxRequest.request({
        method: 'delete',
        url: `/users/${userId}`
    });
}

export function createNewUser(userInfo: any) {
    return lxRequest.request({
        method: 'post',
        url: `/users`,
        data: userInfo
    });
}

export function editUserInfo(userId: number, userInfo: any) {
    return lxRequest.request({
        method: 'patch',
        url: `/users/${userId}`,
        data: userInfo,
        headers: {
            'Content-Type': 'application/json' // 明确指定
        }
    });
}

// 针对页面的增删改查
export function postPageListData(pageName: string, queryInfo) {
    return lxRequest.request({
        method: 'post',
        url: `/${pageName}/list`,
        data: queryInfo
    });
}

export function deletePageById(pageName: string, userId: number) {
    return lxRequest.request({
        method: 'delete',
        url: `/${pageName}/${userId}`
    });
}

export function createNewPage(pageName: string, userInfo: any) {
    return lxRequest.request({
        method: 'post',
        url: `/${pageName}`,
        data: userInfo
    });
}

export function editPageInfo(pageName: string, userId: number, userInfo: any) {
    return lxRequest.request({
        method: 'patch',
        url: `/${pageName}/${userId}`,
        data: userInfo,
        headers: {
            'Content-Type': 'application/json' // 明确指定
        }
    });
}
