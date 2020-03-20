import axios from 'axios'

var instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // 携带cooies 跨域请求
    withCredentials: true
})
export function getlogin({
    phone,
    password,
    code
}) {
    return instance({
        url: '/login',
        method: 'POST',
        data: {
            phone,
            password,
            code
        }
    })
}