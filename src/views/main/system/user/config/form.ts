import { IFormItem } from '@/base-ui/from'

export const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    field: 'passward',
    type: 'input',
    label: '密码',
    placeholder: '请输入用户名'
  },
  {
    field: 'like',
    type: 'select',
    label: '爱好',
    placeholder: '请输入用户名',
    selectOptions: [
      { label: '水果', value: 'fruit' },
      { label: '篮球', value: 'basketball' }
    ]
  },
  {
    field: 'createTime',
    type: 'DatePicker',
    label: '注册时间',
    dataPickerOptions: {
      type: 'week',
      format: '[Week] ww',
      placeholder: 'Pick a week'
    }
  }
]
