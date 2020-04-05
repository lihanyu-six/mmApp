import instance from '../utils/myHttp'

//获取题目列表信息接口
export function getListQuest({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}

export function getQuestAdd(data){
    return instance({
        url:'/question/add',
        method:'post',
        data:data
    })
}