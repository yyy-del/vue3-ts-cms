import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
}

interface IModules {
  login: ILoginState
  system: ISystemState
}
export type IStoreType = IRootState & IModules
