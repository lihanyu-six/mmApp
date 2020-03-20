import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'

// 首页中的嵌套子路由
import chart from '../views/chart/chart.vue'
import enterprise from '../views/enterprise/enterprise.vue'
import question from '../views/question/question.vue'
import subject from '../views/subject/subject.vue'
import user from '../views/user/user.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'*',
            component:login
        },
        {
            path:'/index',
            component:index,
            children:[
                {
                    path:'chart',
                    component:chart
                },
                {
                    path:'enterprise',
                    component:enterprise
                },
                {
                    path:'question',
                    component:question
                },
                {
                    path:'subject',
                    component:subject
                },
                {
                    path:'user',
                    component:user
                },
            ]
        }
    ]
})

export default router
