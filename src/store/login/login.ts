import { Module } from 'vuex'

import { IRootState } from '../types'
import { ILoginState } from './types'

import localCache from '@/utils/cache'

import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { IAccountLogin } from '@/service/login/types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    //1.设置token
    changeToken(state, token: string) {
      state.token = token
    },
    // 设置用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 设置用户菜单
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      //获取用户菜单映射的route组件
      const routes = mapMenusToRoutes(userMenus)
      //将获取到的routes动态注册
      routes.forEach((el) => {
        router.addRoute('main', el)
      })
    }
  },
  actions: {
    async accountLogin({ commit }, paylod: IAccountLogin) {
      //1.登录请求
      const loginResult = await accountLoginRequest(paylod)
      if (loginResult.code === 0) {
        const { id, token } = loginResult.data
        commit('changeToken', token)
        localCache.setCache('token', token)
        //2.请求用户信息
        const userInfoResult = await getUserInfoById(id)
        const userInfo = userInfoResult.data
        commit('changeUserInfo', userInfo)
        localCache.setCache('userInfo', userInfo)

        // 3.请求用户菜单

        const userMenuResult = await getUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenuResult.data
        // 处理icon  适配element ui plus
        const newUserMenus = JSON.parse(JSON.stringify(userMenus))

        const handleIcon = newUserMenus.map((item: any) => {
          function dealIcon(icon: string) {
            const iconArray = icon.split('-').slice(2)
            let iconResult = ''
            iconArray.forEach((item: string) => {
              iconResult += item[0].toUpperCase() + item.substring(1)
            })
            item.icon = iconResult
            return item
          }
          dealIcon(item.icon)
          return item
        })

        commit('changeUserMenus', handleIcon)
        localCache.setCache('userMenus', handleIcon)
        //4. 登录成功，跳转到main主页
        router.push('/main')
      }
    },
    //当页面刷新了之后重新设置vue的值
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userInfo) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
