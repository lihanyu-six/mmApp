<template>
  <div>
    <el-select :value="value" @input="v=>$emit('input',v)">
      <el-option label="请选择" value></el-option>
      <el-option
        v-for="(item, index) in subjectData"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getSubjectList } from "@/api/subject";
export default {
  props: ["value"],
  data() {
    return {
      //   subject: "",
      subjectData: []
    };
  },
  methods: {
    // 获取学科数据
    getSubject() {
      getSubjectList({}).then(res => {
        if (res.data.code == 200) {
          this.subjectData = res.data.data.items;
        }
      });
    }
  },
//   watch: {
//     subject() {
//       this.$emit("input", this.subject);
//     }
//   },
  created() {
    // this.subject = this.value;
    this.getSubject();
  }
};
</script>

<style>
</style>