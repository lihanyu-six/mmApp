<template>
  <div>
    <el-select :value="value" @input="v=>$emit('input',v)">
      <el-option label="请选择" value></el-option>
      <el-option
        v-for="(item, index) in priseData"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getPriseList } from "@/api/enterprise";
export default {
  props: ["value"],
  data() {
    return {
      //   enterprise: "",
      priseData: []
    };
  },
  methods: {
    // 获取企业数据
    getPrise() {
      getPriseList({}).then(res => {
        if (res.data.code == 200) {
          this.priseData = res.data.data.items;
        }
      });
    }
  },
  created() {
    this.getPrise();
  }
};
</script>

<style>
</style>