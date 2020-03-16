<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="titleVisib">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail">
          <el-input v-model="form.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model="form.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
          <el-input v-model="form.userPassword" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图形码 -->
        <el-row>
          <el-col :span="18">
            <el-form-item label="图形码" :label-width="formLabelWidth" prop="txMa">
              <el-input v-model="form.txMa" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="imgInner">
            <img src="../../../assets/images/login_captcha.png" alt />
          </el-col>
        </el-row>

        <!-- 验证码 -->
        <el-row>
          <el-col :span="18">
            <el-form-item label="验证码" :label-width="formLabelWidth" prop="yzMa">
              <el-input v-model="form.yzMa" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="imgInner">
            <el-button class="getBtn">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- 下面两个按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        txMa: "",
        yzMa: ""
      },
      rules: {
        userName: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        userEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        txMa: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        yzMa: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "67px"
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
        } else {
          this.$message.error("注册失败！");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.titleVisib {
  .el-dialog__header {
    height: 100%;
    padding: 0;
    text-align: center;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    height: 54px;
    line-height: 54px;
    .el-dialog__title {
      color: white;
    }
  }
  .imgInner {
    height: 40px;
    text-align: right;
    img {
      width: 143px;
      height: 41px;
    }
    .getBtn {
      width: 143px;
      height: 41px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>