<template>
  <div class="form">
    <div class="heade">
      <slot name="heade" />
    </div>
    <el-form :label-width="LabelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rule="item.rule"
              :style="formItemStyle"
            >
              <!-- 如果是input选择框 -->
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <!-- 如果是select选择器 -->
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="el in item.selectOptions"
                    :key="el.label"
                    :label="el.label"
                    :value="el.value"
                  ></el-option>
                </el-select>
              </template>
              <!-- DatePicker 日期选择器 -->
              <template v-if="item.type === 'DatePicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  v-bind="item.dataPickerOptions"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="foot">
      <slot name="foot" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IFormItem } from '@/base-ui/from'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      requered: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    LabelWidth: {
      type: String,
      defalult: '100px'
    },
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6
      })
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  .el-form-item {
    .el-form-item__label {
      text-align: justify;
      text-align-last: justify;
    }
  }
  .heade {
    text-align: left;
  }
  .foot {
    text-align: right;
    padding: 0 50px 10px 10px;
  }
}
</style>
