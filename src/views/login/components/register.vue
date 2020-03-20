<template>
  <div>
    <el-dialog title="用户注册" :close-on-click-modal= "false" :visible.sync="dialogFormVisible" class="titleVisib">
      <el-form :model="form" ref="form" :rules="rules">
        <!-- 头像上传 -->
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-upload
            :label-width="formLabelWidth"
            class="avatar-uploader"
            name="image"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 输入框 -->
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
            <img :src="imgsrc" @click="changeImg" alt />
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
            <el-button
              class="getBtn"
              :disabled="time !=0"
              @click="getCode"
            >{{time === 0? '获取用户验证码':time}}</el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- 下面两个按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiCode, registerPost } from "@/api/register.js";
import myCheck from "@/utils/mycheck.js"
export default {
  data() {
  
    return {
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        txMa: "",
        yzMa: "",
        avatar: ""
      },
      rules: {
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        userName: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        userEmail: [
          { validator: myCheck.checkEmail, trigger: "blur" },
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        userPhone: [
          { validator: myCheck.checkPhone, trigger: "blur" },
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        txMa: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        yzMa: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "67px",
      imgsrc: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(),
      timer: "",
      time: 0,
      // 头像上传url地址
      imageUrl: null,
      uploadUrl: process.env.VUE_APP_URL + "/uploads"
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          registerPost({
            username: this.form.userName,
            phone: this.form.userPhone,
            email: this.form.userEmail,
            avatar: this.form.avatar,
            password: this.form.userPassword,
            rcode: this.form.yzMa
          }).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("注册成功!");
              this.$refs.form.resetFields();
              this.imageUrl = null;
              this.dialogFormVisible = false;
            } else {
              this.$message.error("注册失败!");
            }
          });
        } else {
          this.$message.error("注册失败！");
          return false;
        }
      });
    },
    changeImg() {
      this.imgsrc =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getCode() {
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.userPhone)) {
        this.$message.error("手机号不合法!");
        return;
      }
      if (this.form.txMa.trim().length !== 4) {
        return this.$message.error("验证码不合法!");
      }

      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      apiCode({
        code: this.form.txMa,
        phone: this.form.userPhone
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("手机验证码为:" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    cancle() {
      this.$refs.form.resetFields();
      this.imageUrl = null;
      this.dialogFormVisible = false;
    },
    // 头像上传成功之后执行的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    // 头像上传之前执行的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 png jpg gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  // 头像上传模块
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader {
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>