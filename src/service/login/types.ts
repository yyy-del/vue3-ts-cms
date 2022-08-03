export interface IAccountLogin {
  name: string
  password: string
}

export interface ILoginData {
  id: number
  token: string
  name: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}
