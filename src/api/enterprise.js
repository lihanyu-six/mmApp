import instance from '../utils/myHttp'

// 获取企业列表信息接口
export function getPriseList({
    name,
    page,
    limit,
    eid,
    username,
    status
}) {
    return instance({
        url: '/enterprise/list',
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}

// 企业添加接口
export function getPriseAdd({
    eid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

// 修改企业状态。启用或者禁用账号
export function getPriseStatus(id) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data: {
            id
        }
    })
}

// 企业删除接口
export function removePrise(id) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data: {
            id
        }
    })
}

// 企业编辑接口
export function getPriseEdit({
    id,
    name,
    eid,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data: {
            id,
            name,
            eid,
            short_name,
            intro,
            remark
        }
    })
}