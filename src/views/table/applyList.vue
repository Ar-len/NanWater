<template>
  <div class="app-container">
    <el-row :gutter="20" class="filter-container">
      <el-col :span="7">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
      <el-col :span="6" class="text-left">
        <span>用户名:</span>
        <el-select v-model="listQuery.type" placeholder="请选择用户名">
          <el-option label="全部" value="shanghai" />
          <el-option label="管理员" value="beijing" />
        </el-select>
      </el-col>
      <el-col :span="2" class="text-left">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
          查询
        </el-button>
      </el-col>
      <!-- <el-col :span="8" class="text-right">
        <el-button class="filter-item" style="margin-left: 10px;" icon="el-icon-edit">
          打印
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" icon="el-icon-download">
          导出
        </el-button>
      </el-col> -->
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户名" width="165">
        <template slot-scope="scope">
          {{ scope.row.display_time }}
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >安装/升级/卸载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="软件名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="功能操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >已授权/未授权</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >回收/已回收</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: '',
      total: 10,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: 'shanghai',
        sort: '+id'
      },
      options: [{
        value: '1',
        label: '全部软件'
      }, {
        value: '2',
        label: '办公软件'
      }],
      value: '1'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
    padding-right: 20px ;
  }
  .filter-container{
    margin: 20px;
  }
</style>
