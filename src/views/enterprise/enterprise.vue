<template>
  <div>
    <!-- 顶部表单卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="obj.eid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="obj.name" class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="obj.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="obj.status" class="long">
            <el-option value label="所有状态"></el-option>
            <el-option :value="1" label="启用"></el-option>
            <el-option :value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getlist">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="clearList">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPrise">
            <i class="el-icon-plus"></i> 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的表格卡片 -->
    <el-card class="box-card tableBox">
      <!-- 表格 -->
      <el-table :data="priseList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | mytime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status === 1? "启用" : "禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="editent(scope.row)">编辑</el-link>&nbsp;
            <el-link
              @click="isDisable(scope.row)"
              type="primary"
            >{{scope.row.status === 1? "禁用" : "启用"}}</el-link>&nbsp;
            <el-link type="primary" @click="delBtn(scope.row.id)">删除</el-link>&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        class="paginBox"
        :current-page="obj.page"
        :page-sizes="[2,4,6]"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </el-card>
    <!-- 新增企业 -->
    <addPrise ref="addBtn"></addPrise>
    <!-- 编辑企业 -->
    <editprise ref="editprise"></editprise>
  </div>
</template>

<script>
import { getPriseList, getPriseStatus, removePrise } from "@/api/enterprise";
import addPrise from "./components/addPrise";
import editprise from "./components/editprise";
export default {
  data() {
    return {
      totalNum: 0,
      total: 1,
      priseList: [],
      obj: {
        name: "",
        eid: "",
        username: "",
        status: "",
        page: 1,
        limit: 4
      }
    };
  },
  components: {
    addPrise,
    editprise
  },
  created() {
    this.getlist();
  },
  methods: {
    // 渲染企业列表数据
    getlist() {
      getPriseList(this.obj).then(res => {
        // window.console.log(res)
        this.priseList = res.data.data.items;
        this.totalNum = res.data.data.pagination.total;
      });
    },
    // 页容量发生改变触发
    sizeChange(index) {
      this.obj.limit = index;
      this.getlist();
    },
    // 当前页发生改变触发
    currentChange(index) {
      this.obj.page = index;
      this.getlist();
    },
    isDisable(row) {
      getPriseStatus(row.id).then(res => {
        if (res.data.code == 200) {
          this.getlist();
          if (row.status == 0) {
            this.$message.success("启用成功!");
          } else {
            this.$message("禁用成功!");
          }
        }
      });
    },
    addPrise() {
      this.$refs.addBtn.dialogFormVisible = true;
    },
    clearList() {
      (this.obj.name = ""),
        (this.obj.eid = ""),
        (this.obj.username = ""),
        (this.obj.status = "");
      this.getlist();
    },
    delBtn(id) {
      this.$confirm("你确定要删除本条数据嘛?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removePrise(id).then(res => {
            if (res.data.code == 200) {
              if (this.priseList.length == 1) {
                this.obj.page--;
              }
              this.getlist();
              this.$message.success("删除成功!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editent(row) {
      this.$refs.editprise.dialogFormVisible = true;
      if (row.id != this.$refs.editprise.form.id) {
        this.$refs.editprise.form = JSON.parse(JSON.stringify(row));
      }
    }
  }
};
</script>

<style>
</style>