import axios from 'axios'
import {
    getToken
} from "../utils/myToken"

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken()
    return config
}, function (error) {
    return error
})

export default instance