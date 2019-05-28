import Vue from 'vue'
import Vuex from 'vuex'
import AcsApi from '@/modules/api'

Vue.use(Vuex)

let api = new AcsApi

export default new Vuex.Store({
  state: {
    inLogged: false,
    username: '',
    roles: [],
    acsData: {
      groups: {},
      alarmDevices: {},
      alarmNotices: {},
      userLoginInfo: {}
    }
  },
  getters: {
    inLogged: state => {
      if (!state.inLogged) {
      }
      console.log('state.inLogged:' + state.inLogged)
      return state.inLogged
    },
    username: state => state.username,
    roles: state => state.roles,
    alarmDevices: state => state.acsData.alarmDevices,
    alarmNotices: state => state.acsData.alarmNotices,
    userLoginInfo: state => state.acsData.userLoginInfo
  },
  mutations: {
    updateInLogged(state, inLogged) {
      state.inLogged = inLogged;
    },
    updateUsername(state, username) {
      state.username = username;
    },
    updateRoles(state, roles) {
      state.roles = roles;
    },
    afterLogin(state, { username, roles }) {
      state.inLogged = true
      state.username = username
      state.roles = roles
      console.log('roles in afterLogin: ' + roles)
      sessionStorage.setItem('inLogged', true)
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('roles', roles)
      // sessionStorage.setItem("store", JSON.stringify(state));
    },
    afterLogout(state) {
      state.inLogged = false
      state.username = ''
      state.roles = []
      sessionStorage.removeItem('inLogged')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('roles')
      // sessionStorage.removeItem('store')
    },
    init(state) {
      console.log('try to get data from sessionStorage')
      state.inLogged = sessionStorage.getItem('inLogged')
      state.username = sessionStorage.getItem('username')
      state.roles = sessionStorage.getItem('roles')
      // if (sessionStorage.getItem("store")) {
      // state = Object.assign({}, state, JSON.parse(sessionStorage.getItem("store")))
      // }
      console.log('inLogged in init: ' + state.inLogged)
    },
    updateAlarmDevices(state, alarmDevices) {
      state.acsData.alarmDevices = alarmDevices
    },
    updateAlarmNotices(state, alarmNotices){
      state.acsData.alarmNotices = alarmNotices
    },
    updateUserLoginInfo(state, userLoginInfo){
      state.acsData.userLoginInfo = userLoginInfo
    }
  },
  actions: {
    updateAlarmDevices({ commit }) {
      return new Promise((resolve, reject) => {
        api.getAlarmDevices().then((res) => {
          commit('updateAlarmDevices', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateAlarmNotices({ commit }) {
      return new Promise((resolve, reject) => {
        api.getAlarmNotices().then((res) => {
          commit('updateAlarmNotices', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUserLoginInfo({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUserLoginInfo().then((res) => {
          commit('updateUserLoginInfo', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
