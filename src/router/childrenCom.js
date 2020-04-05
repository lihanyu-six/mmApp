// 首页中的嵌套子路由
import chart from '../views/chart/chart.vue'
import enterprise from '../views/enterprise/enterprise.vue'
import question from '../views/question/question.vue'
import subject from '../views/subject/subject.vue'
import user from '../views/user/user.vue'

// 首页下的子路由
export default [{
    path: 'chart',
    component: chart,
    meta: {
        title: '数据概览',
        roles: ['超级管理员','管理员', '老师'],
        fullPath:'/index/chart',
        icon :'el-icon-pie-chart'
    }
},
{
    path: 'enterprise',
    component: enterprise,
    meta: {
        title: '企业列表',
        roles: ['超级管理员','管理员'],
        fullPath:'/index/enterprise',
        icon:'el-icon-office-building'
    }
},
{
    path: 'question',
    component: question,
    meta: {
        title: '题库列表',
        roles: ['超级管理员','管理员', '老师', '学生'],
        fullPath:'/index/question',
        icon:'el-icon-edit-outline'
    }
},
{
    path: 'subject',
    component: subject,
    meta: {
        title: '学科列表',
        roles: ['超级管理员','管理员'],
        fullPath:'/index/subject',
        icon:'el-icon-notebook-2'
    }
},
{
    path: 'user',
    component: user,
    meta: {
        title: '用户列表',
        roles: ['超级管理员','管理员', '老师'],
        fullPath:'/index/user',
        icon:'el-icon-user'
    }
},
]