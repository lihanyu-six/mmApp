<template>
  <div>
    <el-dialog title="企业编辑" :visible.sync="dialogFormVisible" class="titleBox">
      <el-form :model="form" ref="form">
        <el-form-item label="修改名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="修改简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="修改简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="修改备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属领域" :label-width="formLabelWidth">
          <el-select v-model="form.tag" placeholder="请选择领域" style="width :100%">
            <el-option value="金融" label="金融"></el-option>
            <el-option value="互联网" label="互联网"></el-option>
            <el-option value="电商" label="电商"></el-option>
          </el-select>
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
import { getPriseEdit } from "@/api/enterprise";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        id: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        eid: ""
      },
    };
  },
  methods: {
    editBtn() {
     getPriseEdit(this.form).then(res=>{
         window.console.log(res)
         if(res.data.code == 200){
             this.$message.success('修改成功!');
             this.dialogFormVisible = false;
             this.$parent.getlist();
         }else{
             this.$message.error(res.data.message)
         }
     })
    }
  }
};
</script>

<style>
</style>