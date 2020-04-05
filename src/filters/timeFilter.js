import Vue from 'vue'
import Moment from 'moment'

// 用于把时间过滤成年月日
Vue.filter("mytime",function(value){
    return Moment(value).format("YYYY-MM-DD")
})
