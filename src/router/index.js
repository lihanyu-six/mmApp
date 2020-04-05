import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
import store from '../store/index'
// 首页中的嵌套子路由
import children from './childrenCom'

import {
    Message
} from 'element-ui'
import {
    getToken
} from '../utils/myToken'
import {
    getInfo
} from '../api/index'

// 导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            component: login
        },
        {
            path: '*',
            component: login
        },
        {
            path: '/index',
            component: index,
            meta: {
                roles: ['超级管理员','管理员', '老师', '学生']
            },
            children: children
        }
    ]
})

// 路由跳转之前执行的函数
router.beforeEach((to, from, next) => {
    const meta = to.meta.title;
    if (meta) {
        document.title = meta
    }
    // 开启进度条
    NProgress.start()
    if (to.path !== '/login') {
        // 判断是否token是否为空
        if (!getToken()) {
            // 关闭进度条
            NProgress.done()
            next("/login");
            Message.error('请您先登录!')
        } else {
            getInfo().then(res => {
                if (res.data.data.status == 0) {
                    Message.error('账号已禁用');
                    next("/login");
                    NProgress.done();
                } else {
                    // 判断token是否为假的
                    if (res.data.code == 200) {
                        var userInfo = {
                            username: res.data.data.username,
                            userImg: process.env.VUE_APP_URL + '/' + res.data.data.avatar
                        }
                        store.commit('setUserInfo', userInfo)
                        // window.console.log(store.state.userImg)
                        const role = res.data.data.role;
                        store.commit('setRole',role);
                        if (to.meta.roles.includes(role)) {
                            next()
                        } else {
                            NProgress.done()
                            Message.error('对不起,您没有访问本路由的权限!');
                        }
                        next()
                    } else if (res.data.code == 206) {
                        // 关闭进度条
                        NProgress.done()
                        next("/login");
                        Message.error('请先登录!')
                    }
                }

            })
        }
    } else {
        next();
    }

})
// 路由跳转后执行的函数
router.afterEach(() => {
    NProgress.done()
})


export default router