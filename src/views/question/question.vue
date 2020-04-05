<template>
  <div>
    <!-- 上面的表单 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <div class="topBox">
          <el-form-item label="学科" class="longBox">
            <!-- <subjectCom class="short_width" :value="form.subject" @input="getSub" ref="subject" /> -->
            <subjectCom class="short_width" v-model="form.subject" />
          </el-form-item>
          <el-form-item label="阶段" class="longBox">
            <el-select v-model="form.step" class="short_width">
              <el-option label="请选择" value></el-option>
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" class="longBox">
            <enterCom class="short_width" v-model="form.enterprise" />
          </el-form-item>
          <el-form-item label="题型" class="longBox">
            <el-select v-model="form.type" class="short_width">
              <el-option label="请选择" value></el-option>
              <el-option label="单选" value="1"></el-option>
              <el-option label="多选" value="2"></el-option>
              <el-option label="简答" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" class="longBox">
            <el-select v-model="form.difficulty" class="short_width">
              <el-option label="请选择" value></el-option>
              <el-option label="简单" value="1"></el-option>
              <el-option label="一般" value="2"></el-option>
              <el-option label="困难" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" class="longBox">
            <el-input v-model="form.username" class="short_width"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="longBox">
            <el-select v-model="form.status" class="short_width">
              <el-option label="请选择" value></el-option>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="longBox">
            <div class="block short_width">
              <el-date-picker v-model="form.create_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="标题">
          <el-input v-model="form.title" class="titleBox"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="clearBtn">清除</el-button>
        <el-button type="primary" @click="questionAdd">+新增试题</el-button>
      </el-form>
    </el-card>
    <!-- 下面的表格和分页 -->
    <el-card class="bottom_card">
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="题目" width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.answer_analyze"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{scope.row.subject_name}}
            <span v-if="scope.row.step == 1">.初级</span>
            <span v-else-if="scope.row.step == 2">.中级</span>
            <span v-else>.高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-if="scope.row.type == 2">多选</span>
            <span v-if="scope.row.type == 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status ==0? '禁用':'启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-link type="primary">编辑</el-link>&nbsp;&nbsp;
            <el-link type="primary">启用</el-link>&nbsp;&nbsp;
            <el-link type="primary">删除</el-link>&nbsp;&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageBox"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="form.page"
        :page-sizes="[2,4,6]"
        :page-size="form.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <questionAdd ref="qutAdd" />
  </div>
</template>

<script>
import { getListQuest } from "@/api/question";
import questionAdd from "./components/questionAdd";
export default {
  data() {
    return {
      form: {
        time: "",
        subject: "",
        enterprise: "",
        step: "",
        type: "",
        difficulty: "",
        username: "",
        create_date: "",
        title: "",
        page: 1,
        limit: 4,
        status: ""
      },
      tableData: [],
      subjectData: [],
      total: 0
    };
  },
  components: {
    questionAdd
  },
  methods: {
    // 获取题目数据
    getList() {
      getListQuest(this.form).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 子传父得学科数据
    getSub(value) {
      this.form.subject = value;
    },
    // 子传父得企业数据
    getEnt(v) {
      this.form.enterprise = v;
    },
    // 清空搜索列表
    clearBtn() {
      this.form.subject = "";
      this.form.step = "";
      this.form.enterprise = "";
      this.form.type = "";
      this.form.difficulty = "";
      this.form.username = "";
      this.form.status = "";
      this.form.create_date = "";
      this.getList();
    },
    // 页面容量改变触发
    sizeChange(index) {
      this.form.limit = index;
      this.getList();
    },
    // 页面当前页改变触发
    currentChange(index) {
      this.form.page = index;
      this.getList();
    },
    questionAdd() {
      this.$refs.qutAdd.dialogFormVisible = true;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang = "less">
.demo-form-inline {
  padding: 0 30px;
  .topBox {
    height: 140px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .longBox {
      width: 280px;
      display: flex;
      .el-form-item__content {
        margin-left: 20px;
      }
      .short_width {
        width: 150px;
        .el-date-editor {
          width: 150px;
        }
      }
    }
  }
  .titleBox {
    width: 455px;
    margin-left: 20px;
  }
}
.bottom_card {
  margin-top: 20px;
  .pageBox {
    text-align: center;
    margin-top: 20px;
  }
}
</style>