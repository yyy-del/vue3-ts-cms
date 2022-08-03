<template>
  <div>
    <search-form
      :formItems="formItems"
      :LabelWidth="LabelWidth"
      v-model="formData"
    >
      <template #heade>
        <h2>搜索</h2>
      </template>
      <template #foot>
        <h2>按钮</h2>
      </template>
    </search-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import SearchForm from '@/base-ui/from'

export default defineComponent({
  components: {
    SearchForm
  },
  props: {
    formItems: {
      type: Object,
      require: true
    }
  },
  setup() {
    const LabelWidth = '100px'
    const formData = ref({
      name: '',
      passward: '',
      like: '',
      createTime: ''
    })
    return {
      LabelWidth,
      formData
    }
  }
})
</script>

<style scoped></style>
