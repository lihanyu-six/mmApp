<template>
  <div>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" class="titleBox">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editSubApi } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        id:''
      },
      rules: {
        rid: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    editBtn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          editSubApi(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("编辑成功!");
              this.$parent.getList();
              this.dialogFormVisible = false;
            }else if(res.data.code == 201){
                this.$message.error(res.data.message)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

