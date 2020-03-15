<template>
  <div class="bigbox">
    <!-- 左边的盒子 -->
    <div class="left_box">
      <!-- 盒子里最上面的标题布局 -->
      <div class="title">
        <img class="icon_left" src="../../assets/images/01.png" alt />
        <span class="one">黑马面面</span>
        <span class="two"></span>
        <span class="three">用户登录</span>
      </div>
      <!-- 饿了么UI 写的ipt框-->
      <div>
        <el-input placeholder="请输入手机号" prefix-icon="el-icon-search" v-model="input1"></el-input>
      </div>
    </div>
    <!-- 右边的照片 -->
    <img class="right_box" src="../../assets/images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
    data() {
        return {
            input1:''
        }
    },
};
</script>

<style lang = less scoped>
.bigbox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* 左边的盒子 */
  .left_box {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    /* 盒子里最上面的标题布局 */
    .title {
      display: flex;
      align-items: center;
      .icon_left {
        width: 22px;
        height: 17px;
      }
      .one {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .two {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .three {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 14px;
      }
    }
  }
  /* 右边的照片 */
  .right_box {
    width: 633px;
    height: 435px;
  }
}
</style>