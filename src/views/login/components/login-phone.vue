<template>
  <el-form :model="phone" label-width="70px" :rules="rules" ref="formRef">
    <el-form-item label="手机号" prop="telnum">
      <el-input v-model="phone.telnum" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import type { FormInstance } from 'element-plus'

import { rules } from '../config/config'

export default defineComponent({
  setup() {
    const phone = reactive({
      telnum: '',
      code: ''
    })
    const formRef = ref<FormInstance>()
    const phoneLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('验证通过')
        }
      })
    }
    return {
      phone,
      rules,
      phoneLogin,
      formRef
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
