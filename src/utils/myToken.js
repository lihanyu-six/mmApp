// 设置一个统一的键
const token_key = 'heimamm'

// 设置token
export function setToken(value){
    // var strValue = JSON.stringify(value)
    window.localStorage.setItem(token_key,value)
}

// 获取token
export function getToken(){
    return window.localStorage.getItem(token_key)
}

// 删除token
export function removeToken(){
    window.localStorage.removeItem(token_key)
}