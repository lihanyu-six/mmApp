<template>
  <div class="chart">
    <el-card class="box-card">
      <ul>
        <li v-for="(item, index) in 6" :key="index">
          <div>
            <span>5</span>
          </div>
          <span>今日新增用户</span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card2"></el-card>
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data() {
    return {
      myChart:null
    }
  },
  mounted(){
    this.myChart = echarts.init(document.querySelector('.box-card2'));
    this.myChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: 200,
        top:200,
        data: ['直接访问', '邮件营销', '联盟广告',]
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
            ]
        }
    ]
});
  }
}
</script>

<style lang="less">
.chart {
  .box-card {
    ul {
      display: flex;
      li {
        text-align: center;
        flex: 1;
        list-style: none;
        div {
          margin: 0 auto;
          width: 90px;
          height: 90px;
          border: 2px solid #f60;
          border-radius: 50%;
          span {
            line-height: 90px;
            font-size: 18px;
            color: blue;
          }
        }
      }
    }
  }
  .box-card2 {
    height: 580px;
    margin-top: 20px;
  }
}
</style>