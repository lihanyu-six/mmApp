<template>
  <el-container class="asideBox">
    <!-- 头部模块 -->
    <el-header>
      <div class="leftBox">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
        <img class="imgLogo" src="../../assets/images/index-logo.png" alt />
        <span class="titleHm">黑马面面</span>
      </div>
      <div class="rightBox">
        <img :src="userImgurl" alt />
        <span>{{userInfo.username}},你好</span>
        <el-button type="primary" class="exitBtn" size="mini" @click="exitBtn">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="auto">
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
          <!-- 菜单栏 -->
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 中心内容部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, exitLogout } from "@/api/index.js";
import { removeToken } from "@/utils/myToken";
export default {
  data() {
    return {
      userInfo: {},
      userImgurl: "",
      isCollapse: false
    };
  },
  created() {
    getInfo().then(res => {
      // window.console.log(res)
      this.userInfo = res.data.data;
      this.userImgurl = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  },
  methods: {
    //   退出登录
    exitBtn() {
      this.$confirm("你确定要退出登录嘛!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //先获取本地token再发送给服务器端删除服务器中保存的token
          exitLogout().then(res => {
            // window.console.log(res)
            if (res.data.code == 200) {
              removeToken(); //删除服务端的token后,再删除本地token
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "成功退出!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出操作!"
          });
        });
    }
  }
};
</script>

<style lang = less>
.asideBox {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-s-fold {
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
  }
  .leftBox {
    display: flex;
    align-items: center;
    .imgLogo {
      width: 26px;
      height: 22px;
      padding-left: 15px;
    }
    .titleHm {
      font-size: 20px;
      margin-left: 15px;
      color: #49a1ff;
    }
  }

  .rightBox {
    display: flex;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      padding: 0 15px;
      color: #636363;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }
    .exitBtn {
      width: 57px;
      height: 28px;
      text-align: center;
      span {
        padding: 0;
        color: #fff;
      }
    }
  }
}
.el-aside {
  background-color: #fff;
  color: #333;
  background: rgba(255, 255, 255, 1);
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    min-height: 400px;
  }
}
.el-main {
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  background-color: #e8e9ec;
  color: #333;
}
</style>