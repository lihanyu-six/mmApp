import instance from '../utils/myHttp'

// 获取用户信息列表
export function getUserList({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: '/user/list',
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

// 后台创建用户
export function getUserAdd({
    username,
    email,
    phone,
    role_id,
    status,
    remark
}) {
    return instance({
        url: '/user/add',
        method: 'post',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })
}

// 修改用户状态。启用或者禁用账号
export function getUserStatus(id) {
    return instance({
        url: '/user/status',
        method: 'post',
        data: {
            id
        }
    })
}

// 用户删除接口
export function removeUser(id) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data: {
            id
        }
    })
}

// 用户信息编辑接口
export function editUser({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id
}) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id
        }
    })
}