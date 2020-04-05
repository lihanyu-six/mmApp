import instance from '../utils/myHttp'

// 进入页面请求列表数据接口
export function getSubjectList({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: '/subject/list',
        // headers: {
        //     token: getToken
        // },
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}

// 点击切换状态接口
export function getStatus(id) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data: {
            id
        }
    })
}

// 新增学科的接口
export function addSubApi({
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

// 编辑学科的接口
export function editSubApi({
    rid,
    name,
    short_name,
    intro,
    remark,
    id
}) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark,
            id
        }
    })
}

// 删除学科的接口
export function delSubApi(id){
    return instance({
        url:'/subject/remove',
        method: 'post',
        data:{
            id
        }
    })
}