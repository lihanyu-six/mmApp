// vuex仓库
import Vue from 'vue'
import vuex from 'vuex'

// 注册使用Vuex
Vue.use(vuex)

// 实例话一个vuex仓库对象
const store = new vuex.Store({
    // 用来管理数据
    state: {
        username:'',
        userImg:'',
        role:''
    },
    // 用来修改数据
    mutations:{
        setUserInfo:function(state,payload){
            state.username = payload.username;
            state.userImg = payload.userImg
        },
        setRole: function(state,payload){
            state.role = payload
        }
    }

})

export default store

