<template>
  <div>
    <el-dialog :title="isAdd? '新增用户' : '编辑用户' " :visible.sync="dialogFormVisible" class="titleBox">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isPost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myCheck from "@/utils/mycheck";
import { getUserAdd, editUser } from "@/api/user";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: "",
        id: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: myCheck.checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "号码不能为空", trigger: "blur" },
          { validator: myCheck.checkPhone, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      },
      isAdd: true,
      dialogFormVisible: false,
      formLabelWidth: "80px"
    };
  },
  methods: {
    isPost() {
      // 新增逻辑
      if (this.isAdd) {
        getUserAdd(this.form).then(res => {
          //   window.console.log(res);
          if (res.data.code == 200) {
            this.$parent.getList();
            this.$message.success("新用户创建成功!");
            this.$refs.form.resetFields();
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        // 编辑逻辑
        editUser(this.form).then(res => {
          window.console.log(res);
          if (res.data.code == 200) {
            this.$message.success("编辑成功!");
            this.dialogFormVisible = false;
            this.$parent.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.titleBox {
  .el-form-item__content {
    text-align: left;
  }
}
</style>