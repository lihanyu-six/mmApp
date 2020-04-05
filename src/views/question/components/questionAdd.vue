<template>
  <el-dialog title="新增题库测试" :visible.sync="dialogFormVisible" :fullscreen="true" class="questTitle">
    <!-- 表单区域 -->
    <el-form :model="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <subjectCom v-model="form.subject" />
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.step">
          <el-option label="请选择阶段" value></el-option>
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <subjectCom v-model="form.enterprise" />
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <myCity v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio label="1">单选</el-radio>
          <el-radio label="2">多选</el-radio>
          <el-radio label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio label="1">简单</el-radio>
          <el-radio label="2">一般</el-radio>
          <el-radio label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="试题标题" class="editor">
        <quill-editor v-model="form.title" @change="titleChange($event)" />
      </el-form-item>
      <el-form-item v-if="form.type==1" label="单选" :label-width="formLabelWidth">
        <el-radio-group v-model="form.single_select_answer">
          <radioBox
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @textChange="v=>item.text=v"
            @imgChange="v=>item.image=v"
          />
        </el-radio-group>
        {{form.single_select_answer}}
      </el-form-item>
      <el-form-item v-if="form.type==2" label="多选" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.multiple_select_answer">
          <checkBox
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @textChange="v=>item.text=v"
            @imgChange="v=>item.image=v"
          />
        </el-checkbox-group>
        {{form.multiple_select_answer}}
      </el-form-item>
      <el-form-item v-if="form.type==3" label="简答" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.answer_analyze"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item :label-width="formLabelWidth">
        <videoBox v-model="form.video" />
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="答案解析" class="editor">
        <quill-editor
          v-model="form.answer_analyze"
          @change="($event)=>form.answer_analyze = $event.text"
        />
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="试题备注" class="editor" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <!-- 取消以及确定 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="isOkBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import radioBox from "./radioBox";
import checkBox from "./checkBox";
import videoBox from "./videoBox";
import { getQuestAdd } from "@/api/question.js";
export default {
  data() {
    return {
      form: {
        title: '',
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: 1,
        difficulty: "",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      textarea: "",
      dialogFormVisible: false,
      formLabelWidth: "300px"
    };
  },
  components: {
    radioBox,
    checkBox,
    videoBox
  },
  methods: {
    getSubject(v) {
      this.form.subject = v;
    },
    getCity(v) {
      this.form.city = v;
    },
    titleChange(e) {
      this.form.title = e.text;
    },
    getVideo(v) {
      this.form.video = v;
    },
    isOkBtn() {
      getQuestAdd(this.form).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("新增成功!");
          this.dialogFormVisible = false;
          this.$parent.getList();
        }
      });
    }
  },
};
</script>

<style lang="less">
.questTitle {
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
  .el-dialog__header {
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    padding: 0;
    .el-dialog__title {
      line-height: 53px;
      margin-left: 40px;
      color: white;
    }
  }
  .editor .el-form-item__content {
    margin-top: 60px;
  }
  .el-radio-group {
    margin-left: 40px;
  }
  .el-select {
    width: 470px;
    margin-left: 40px;
  }
  .el-cascader {
    width: 470px;
    margin-left: 40px;
  }
}
</style>