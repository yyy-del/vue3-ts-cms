// import { Loading } from 'element-plus/es/components/loading/src/service'
import request from '../index'

import { IAccountLogin, IDataType, ILoginData } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/', //用法  ‘/user/+id
  RoleMenu = '/role/' ///role/+roleid/menu
}

export function accountLoginRequest(account: IAccountLogin) {
  return request.post<IDataType<ILoginData>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showloading: false
  })
}

export function getUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showloading: false
  })
}
export function getUserMenusByRoleId(RoleId: number) {
  return request.get<IDataType>({
    url: LoginAPI.RoleMenu + RoleId + '/menu',
    showloading: false
  })
}
