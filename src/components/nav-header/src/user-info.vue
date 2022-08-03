<template>
  <div class="user_info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span> {{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Avatar">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Edit">修改资料</el-dropdown-item>
          <el-dropdown-item icon="CircleCloseFilled">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const userName = store.state.login.userInfo.name
    return { userName }
  }
})
</script>

<style scoped lang="less">
.user_info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
