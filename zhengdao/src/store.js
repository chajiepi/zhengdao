import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getPhone, setPhone, getuserId, setuserId, removeToken } from '@/utils/auth'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//data
    //count: 0
    token: getToken(),
    id: getuserId(),
    name: '',
    phone: getPhone(),
    currentorgid: 'o-1138295821360046080'
  },
  
  mutations: {//methods
    //increment(state) {
      //state.count++;
    //}
    //最多两个参数，参数一是state
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name 
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_CURRENTORGID: (state, currentorgid) => {
      state.currentorgid = currentorgid
    },
  },

  actions: {
    Login({ commit }, pwdLogin) {
      return new Promise((resolve, reject) => {
        axios.post('https://test.api.zhengdaoyixing.com/user/login', pwdLogin).then(res => {
          setuserId(res.data.data.userId)
          setPhone(res.data.data.phone)
          setToken(res.data.data.token)
          commit('SET_ID', res.data.data.userId)
          commit('SET_PHONE', res.data.data.phone)
          commit('SET_TOKEN', res.data.data.token)
          resolve()
        }).catch(err => {
          reject(err.response.data)
        })
      })
    },

    Codelogin({ commit }, codeLogin) {
      return new Promise((resolve, reject) => {
        axios.post('https://test.api.zhengdaoyixing.com/user/login', codeLogin).then(res => {
          setuserId(res.data.data.userId)
          setPhone(res.data.data.phone)
          setToken(res.data.data.token)
          commit('SET_ID', res.data.data.userId)
          commit('SET_PHONE', res.data.data.phone)
          commit('SET_TOKEN', res.data.data.token)
          resolve()
        }).catch(err => {
          reject(err.response.data)
        })
      })
    },

    Logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        removeToken()
        resolve()
      })
      
      // .catch(err => {
      //   console.log(err)
      // })
    }

  },
  getters: {
    
  },
})
