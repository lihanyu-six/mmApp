<template>
  <div>
    <!-- 顶部表单卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="obj.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button type="primary" @click="getList()">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSub">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的表格卡片 -->
    <el-card class="box-card tableBox">
      <!-- 表格 -->
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | mytime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status === 1? "启用" : "禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="editSub(scope.row)">编辑</el-link>&nbsp;
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
        class="paginBox"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="obj.page"
        :page-sizes="[2,4,6]"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </el-card>
    <!-- 新增学科对话框 -->
    <addSubject ref="addDialog"></addSubject>
    <!-- 编辑学科对话框 -->
    <editSubject ref="editDialog"></editSubject>
  </div>
</template>

<script>
import { getSubjectList, getStatus, delSubApi } from "@/api/subject.js";
import addSubject from "./components/addSubject";
import editSubject from "./components/editSubject";
export default {
  data() {
    return {
      // 数据总条数
      totalNum: 0,
      // 进入页面需要渲染的数据
      subjectList: [],
      // 渲染页面需要传入的实参对象
      obj: {
        name: "",
        page: 1, //当前页
        limit: 4, //页容量
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  components: {
    addSubject,
    editSubject
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    sizeChange(index) {
      this.obj.limit = index;
      this.getList();
    },
    currentChange(index) {
      this.obj.page = index;
      this.getList();
    },
    getList() {
      // 一进入页面把数据渲染到页面
      getSubjectList(this.obj).then(res => {
        // window.console.log(res)
        this.subjectList = res.data.data.items;
        this.totalNum = res.data.data.pagination.total;
        // window.console.log(this.subjectList);
      });
    },
    isDisable(row) {
      getStatus(row.id).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.getList();
          if (row.status == 0) {
            this.$message.success("启用成功!");
          } else {
            this.$message("禁用成功!");
          }
        }
      });
    },
    addSub() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    clearSearch() {
      (this.obj.name = ""),
        (this.obj.rid = ""),
        (this.obj.username = ""),
        (this.obj.status = "");
      this.getList();
    },
    editSub(row) {
      this.$refs.editDialog.dialogFormVisible = true;
      // window.console.log(row);
      // 由于row中值和编辑中表单中值是双向绑定的,所以可以通过JSON进行二次加工再赋值
      if (row.id !== this.$refs.editDialog.form.id) {
        let _row = JSON.parse(JSON.stringify(row));
        this.$refs.editDialog.form = _row;
      }
    },
    delBtn(id) {
      this.$confirm("你确定删除该科目信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSubApi(id).then(res => {
            if (res.data.code == 200) {
              if (this.subjectList.length == 1) {
                this.obj.page--;
              }
              this.$message.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang = "less">
/* 顶部表单卡片样式 */
.el-card__body {
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__content {
      .short {
        width: 130px;
      }
      .long {
        width: 180px;
      }
    }
  }
}
/* 下面的表格卡片样式 */
.tableBox {
  margin-top: 20px;
  .paginBox {
    text-align: center;
    margin-top: 20px;
  }
}
</style>