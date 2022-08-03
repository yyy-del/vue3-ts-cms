<template>
  <div id="login-account">
    <el-form :model="account" :rules="rules" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import type { FormInstance } from 'element-plus'

import { rules } from '../config/config'
import LocalCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })
    const formRef = ref<FormInstance>()
    const accountLogin = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.是否己住密码
          if (isKeepPassword) {
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
          //2.登录请求
          store.dispatch('login/accountLogin', { ...account })
        }
      })
    }
    return { account, rules, accountLogin, formRef }
  }
})
</script>

<style lang="less" scoped>
#login-account {
}
</style>
