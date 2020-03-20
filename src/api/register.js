import axios from 'axios'

// 获取图形码
export function apiCode({
    code,
    phone
}) {
    return axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data: {
            code: code,
            phone: phone
        },
        // 携带cooies 跨域请求
        withCredentials: true
    })
}

// 用户注册
export function registerPost({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return axios({
        url: process.env.VUE_APP_URL + '/register',
        method: 'post',
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}