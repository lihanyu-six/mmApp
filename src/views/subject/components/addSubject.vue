<template>
  <div>
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible" class="titleBox">
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
        <el-button type="primary" @click="addBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubApi } from "@/api/subject";
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
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    addBtn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addSubApi(this.form).then(res=>{
              // window.console.log(res)
              if(res.data.code == 200){
                  this.$message.success('新增成功!');
                  this.dialogFormVisible = false;
                  this.$refs.form.resetFields();
                  this.$parent.getList();
              }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang = "less">
.titleBox {
  text-align: center;
  .el-dialog__header {
    background: linear-gradient(
      to right,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    padding: 0;
    line-height: 54px;
    .el-dialog__title {
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 18px;
      color: white;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>