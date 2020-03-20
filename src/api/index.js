import axios from 'axios'
import {
    getToken
} from "@/utils/myToken.js";

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

export function getInfo() {
    return instance({
        url: '/info',
        headers: {
            token: getToken()
        }
    })
}

export function exitLogout() {
    return instance({
        url: '/logout',
        headers: {
            token: getToken()
        }
    })
}