<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
    </el-upload>
    <video v-if="videoUrl" style="display:block; width:200px;height:100px " :src="videoUrl" controls loop></video>
  </div>
</template>

<script>
export default {
  props:['value'],
  data() {
    return {
      actionUrl: process.env.VUE_APP_URL + "/question/upload",
      videoUrl: this.value
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.$emit('input',this.videoUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 8;

      if (!isJPG) {
        this.$message.error("上传文件是视频只能是mp4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 8MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>