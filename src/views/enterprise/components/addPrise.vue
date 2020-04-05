<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible" class="titleBox">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getPriseAdd} from "@/api/enterprise";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        short_name:[{ required: true, message: "简称不能为空", trigger: "blur" }],
        intro:[{ required: true, message: "简介不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //   新增企业
    addBtn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          getPriseAdd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$parent.getlist();
              this.$message.success("添加成功!");
              this.dialogFormVisible = false;
            } else {
              this.$message.error("添加失败!");
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

<style>
</style>