<template>
  <el-cascader :value="value" @input="v=>$emit('input',v)" :props="{value:'label'}" :options="options"></el-cascader>
</template>

<script>
import { regionData  } from "element-china-area-data";
export default {
    props:['value'],
    data() {
        return {
            options : regionData
        }
    },
}
</script>

<style>

</style>