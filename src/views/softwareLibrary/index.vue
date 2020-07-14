<template>
  <div class="softwareLibrary-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="allSoftware">
        <span slot="label">全部软件</span>
      </el-tab-pane>
      <el-tab-pane name="videoSoftware">
        <span slot="label"><el-divider direction="vertical" />视频软件</span>
      </el-tab-pane>
      <el-tab-pane name="chatTools">
        <span slot="label"><el-divider direction="vertical" />聊天工具</span>
      </el-tab-pane>
      <el-tab-pane name="browser">
        <span slot="label"><el-divider direction="vertical" />浏览器</span>
      </el-tab-pane>
      <el-tab-pane name="officeSoftware">
        <span slot="label"><el-divider direction="vertical" />办公软件</span>
      </el-tab-pane>
      <el-tab-pane name="typeWriting">
        <span slot="label"><el-divider direction="vertical" />输入法</span>
      </el-tab-pane>
      <el-tab-pane name="musicSoftware">
        <span slot="label"><el-divider direction="vertical" />音乐软件</span>
      </el-tab-pane>
      <el-tab-pane name="gameRrecreation">
        <span slot="label"><el-divider direction="vertical" />游戏娱乐</span>
      </el-tab-pane>
      <el-tab-pane name="networkGame">
        <span slot="label"><el-divider direction="vertical" />网络游戏</span>
      </el-tab-pane>
      <el-tab-pane name="DownloadTools">
        <span slot="label"><el-divider direction="vertical" />下载工具</span>
      </el-tab-pane>
      <el-tab-pane name="salfAntiVirus">
        <span slot="label"><el-divider direction="vertical" />安全杀毒</span>
      </el-tab-pane>
    </el-tabs>
    <div class="softwareLibrary-text">name: {{ name }}
      <el-table
        :data="tableData"
        style="width: 100%"
        :show-header="false"
      >
        <el-table-column>
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <span>--{{ scope.row.details }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <!-- <p>姓名: {{ scope.row.name }}</p> -->
              <p>详细大小: {{ scope.row.size }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.size }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleDetails(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isDownload"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >已下载</el-button>
            <el-button
              v-else
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >一键下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tableData: [{
        isDownload: false,
        details: '软件说明',
        size: '***M',
        name: '天霸1号',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        isDownload: true,
        details: '软件说明',
        size: '***M',
        name: '天霸2号',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      activeName: 'allSoftware'
    }
  },
  methods: {
    handleDetails(index, row) {
      console.log(index, row)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }

}
</script>

<style lang="scss" scoped>
.softwareLibrary {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
