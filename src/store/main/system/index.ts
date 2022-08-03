import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'

import { getSystemRequest } from '@/service/main/system/system'

const systemMdoule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCounter: 0
    }
  },
  mutations: {
    SETUSERLIST(state, paylod) {
      state.userList = paylod
    },
    SETUSERCOUNTER(state, paylod) {
      state.userCounter = paylod
    }
  },
  actions: {
    async getSystemData({ commit }, paylod: any) {
      const result = await getSystemRequest(paylod.url, paylod.queryInfo)
      const { list, totalCount } = result.data
      commit('SETUSERLIST', list)
      commit('SETUSERCOUNTER', totalCount)
    }
  }
}

export default systemMdoule
