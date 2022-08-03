<template>
  <div class="nav-header">
    <el-icon class="foldIcon" @click="changeFold">
      <fold v-show="!isFold" />
      <expand v-show="isFold" />
    </el-icon>
    <div class="userheader">
      <div>
        <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { currentBreadcumb } from '@/utils/map-menus'

import UserInfo from './user-info.vue'
import NavBreadcrumb from '@/base-ui/breadcrumb'
export default defineComponent({
  components: {
    UserInfo,
    NavBreadcrumb
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    //面包屑数据[{name: string,path?:string}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenu = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return currentBreadcumb(userMenu, currentPath)
    })

    return {
      isFold,
      changeFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .foldIcon {
    font-size: 30px;
  }
  .userheader {
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    div {
      line-height: 100%;
    }
  }
}
</style>
