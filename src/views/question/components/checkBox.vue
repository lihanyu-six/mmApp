<template>
    <div>
      <el-checkbox :label="label" class="checkBox">
        <span>{{label}}</span>
        <el-input class="checkIpt" :value="text" @input="v=>$emit('textChange',v)"></el-input>
        <el-upload
          class="avatar-uploader"
          :action="actionUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-checkbox>
    </div>
</template>

<script>
export default {
  props: ["label", "text", "image"],
  data() {
    return {
      radio: "",
      imageUrl: process.env.VUE_APP_URL + this.image,
      actionUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('imgChange',this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
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
.el-checkbox.checkBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  width: 800px;
  .checkIpt {
    width: 470px;
    margin-left: 30px;
  }
  .avatar-uploader {
    display: inline-block;
    margin-left: 30px;
  }
  .el-checkbox__label {
    display: flex;
    align-items: center;
  }
}
</style>