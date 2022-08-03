export interface IFormItem {
  field: string
  label: string
  placeholder?: string
  rule?: any[]
  type: string
  selectOptions?: any[]
  selectMultiple?: boolean
  dataPickerOptions?: any
}
