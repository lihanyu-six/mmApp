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
      <div class="formIpt">
        <!-- form表单 -->
        <el-form ref="form" :model="form" label-width="0px" :rules="rules">
          <!-- input表单域 -->
          <el-form-item prop="phone">
            <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-row class="yanzhenIpt">
            <el-col :span="16">
              <el-form-item prop="yanzhen">
                <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.yanzhen"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <img :src="imgUrl" @click="getImg" alt class="yzimg" />
            </el-col>
          </el-row>

          <!-- 多选框表单域 -->
          <el-form-item prop="type">
            <div class="el-form-item__content checkBox">
              <el-checkbox v-model="form.type">
                我已阅读并同意
                <el-link type="primary">用户协议</el-link>和
                <el-link type="primary">隐私条款</el-link>
              </el-checkbox>
            </div>
          </el-form-item>

          <!-- 下面得登录以及注册按钮 -->
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="onSubmit">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="openRg">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 右边的照片 -->
    <img class="right_box" src="../../assets/images/login_banner_ele.png" alt />
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./components/register";
import myCheck from "@/utils/mycheck.js";
import { getlogin } from '@/api/login.js';  
import { setToken } from '@/utils/myToken.js'
export default {
  components: {
    register
  },
  data() {
    return {
      form: {
        phone: "",
        password: "",
        yanzhen: "",
        type: []
      },
      rules: {
        phone: [
          { validator: myCheck.checkPhone, trigger: "blur" },
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        yanzhen: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为 4 个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请您确定您已阅读并同意协议条款",
            trigger: "change"
          }
        ]
      },
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now()
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getlogin({
            phone : this.form.phone,
            password : this.form.password,
            code : this.form.yanzhen
          }).then(res=>{
            // window.console.log(res)
            if(res.data.code == 200){
              this.$message.success('登录成功!')
              setToken(res.data.data.token);
              this.$router.push('/index')
            }else{
              this.$message.error('登录失败!')
            }
          })
        } else {
          this.$message.error("验证失败！");
          return false;
        }
      });
    },

    openRg() {
      this.$refs.register.dialogFormVisible = true;
    },
    getImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang = less scoped>
.bigbox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
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
    .formIpt {
      margin-top: 29px;
      .yzimg {
        height: 40px;
        width: 100%;
      }
      .el-form-item__content.checkBox {
        line-height: 20px;
      }
      .loginBtn {
        width: 100%;
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