<template>
  <div>
    <page-search :formItems="formItems" />
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="name" label="用户名" min-width="180" />
      <el-table-column prop="createAt" label="创建时间" min-width="180" />
      <el-table-column prop="updateAt" label="更新时间" min-width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'

import { formItems } from './config/form'

export default defineComponent({
  components: {
    PageSearch
  },
  setup() {
    const store = useStore()

    store.dispatch('system/getSystemData', {
      url: '/role/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    // const userCounter = computed(() => store.state.system.userCounter)
    console.log(userList)

    return {
      formItems,
      userList
    }
  }
})
</script>

<style scoped></style>
