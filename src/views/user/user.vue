<template>
  <div>
    <!-- 顶部表单卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="obj.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="obj.email" class="long"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="obj.role_id" class="long">
            <el-option value label="请选择"></el-option>
            <el-option :value="1" label="超级管理员"></el-option>
            <el-option :value="2" label="管理员"></el-option>
            <el-option :value="3" label="老师"></el-option>
            <el-option :value="4" label="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="clearBtn">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">
            <i class="el-icon-plus"></i> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的表格卡片 -->
    <el-card class="box-card tableBox">
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" :border="true">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">{{scope.row.role_id | chanceJs}}</template>
        </el-table-column>
        <el-table-column prop="username" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status === 1? "启用" : "禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="editUser(scope.row)">编辑</el-link>&nbsp;
            <el-link
              @click="isDisable(scope.row)"
              type="primary"
            >{{scope.row.status === 1? "禁用" : "启用"}}</el-link>&nbsp;
            <el-link type="primary"  v-if="['超级管理员','管理员'].includes($store.state.role)" @click="delBtn(scope.row)">删除</el-link>&nbsp;
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
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增以及编辑模块 -->
    <addEdit ref="addEdit"></addEdit>
  </div>
</template>

<script>
import { getUserList, getUserStatus, removeUser } from "@/api/user";
import addEdit from "./components/addEdit";
export default {
  data() {
    return {
      obj: {
        username: "",
        name: "",
        email: "",
        role_id: "",
        limit: 4,
        page: 1
      },
      userList: [],
      total: 0
    };
  },
  components: {
    addEdit
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getUserList(this.obj).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.userList = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    search() {
      this.getList();
    },
    isDisable(row) {
      getUserStatus(row.id).then(res => {
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
    sizeChange(index) {
      this.obj.limit = index;
      this.getList();
    },
    currentChange(index) {
      this.obj.page = index;
      this.getList();
    },
    clearBtn() {
      (this.obj.email = ""),
        (this.obj.role_id = ""),
        (this.obj.username = ""),
        this.getList();
    },
    delBtn(row) {
      this.$confirm("是否删除本条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeUser(row.id).then(res => {
            if (res.data.code == 200) {
              if (this.userList.length == 1) {
                this.obj.page--;
              }
              this.$message.success("删除成功!");
              this.getList();
            } else {
              this.$message(res.data.message);
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
    // 新增用户
    addUser() {
      this.$refs.addEdit.dialogFormVisible = true;
      this.$refs.addEdit.form.id = "";
      this.$refs.addEdit.$refs.form.resetFields();
      this.$refs.addEdit.isAdd = true;
    },
    // 编辑用户
    editUser(row) {
      this.$refs.addEdit.dialogFormVisible = true;
      this.$refs.addEdit.isAdd = false;
      if (this.$refs.addEdit.form.id != row.id) {
        this.$refs.addEdit.$nextTick(() => {
          this.$refs.addEdit.form = JSON.parse(JSON.stringify(row));
        });
      }
    }
  },
  filters: {
    chanceJs(num) {
      let str = "";
      if (num == 2) {
        str = "管理员";
      } else if (num == 3) {
        str = "老师";
      } else if (num == 1) {
        str = "超级管理员";
      } else {
        str = "学生";
      }
      return str;
    }
  }
};
</script>

<style>
</style>