import Vue from 'vue'
import Vuex from 'vuex'
import AcsApi from '@/modules/api'

Vue.use(Vuex)

let api = new AcsApi

const resourceCollectionMap = new Map(
  [['alarmDevices', 'alarm_device'],
  ['alarmNotices', 'alarm_notice'],
  ['userLoginInfo', 'user_login_info'],
  ['alarmPlans', 'alarm_plan'],
  ['users', 'users'],
  ['alarmPlansOfOtherType', 'alarm_plan']]
)

export default new Vuex.Store({
  state: {
    inLogged: false,
    username: '',
    roles: [],
    acsData: new Map(
      [['groups', {}],
      ['alarmDevices', {}],
      ['alarmNotices', {}],
      ['userLoginInfo', {}],
      ['alarmPlans', {}],
      ['users', {}],
      ['alarmPlansOfOtherType', {}]]
    ),
    common: {}
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
    alarmNotices: state => {
      console.log('getter alarmNotices')
      console.log(state.acsData.alarmNotices)
      let alarmNotices = state.acsData.alarmNotices
      if (alarmNotices && alarmNotices._embedded && alarmNotices._embedded.alarm_notice) {
        alarmNotices._embedded.alarm_notice.forEach((element) => {
          element.range = element.deviceNames.join()
        })
      }
      return alarmNotices
    },
    userLoginInfo: state => state.acsData.userLoginInfo,
    alarmPlans: state => state.acsData.alarmPlans,
    users: state => state.acsData.users,
    alarmPlansOfOtherType: state => state.acsData.alarmPlansOfOtherType,
    partOfAcsData: (state) => (resourceName) => {
      console.log('partOfAcsData')
      console.log(resourceName)
      console.log(resourceCollectionMap)
      console.log(resourceCollectionMap.get(resourceName))
      console.log(state.acsData[resourceName]._embedded)
      console.log(state.acsData[resourceName]._embedded[resourceCollectionMap.get(resourceName)])
      return state.acsData[resourceName]._embedded[resourceCollectionMap.get(resourceName)]
    }
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
    updateAlarmNotices(state, alarmNotices) {
      console.log('updateAlarmNotices')
      state.acsData.alarmNotices = alarmNotices
      console.log(state.acsData.alarmNotices)
    },
    updateUserLoginInfo(state, userLoginInfo) {
      state.acsData.userLoginInfo = userLoginInfo
    },
    updateAlarmPlans(state, alarmPlans) {
      state.acsData.alarmPlans = alarmPlans
    },
    updateUsers(state, users) {
      state.acsData.users = users
    },
    updateAlarmPlansOfOtherType(state, alarmPlansOfOtherType) {
      state.acsData.alarmPlansOfOtherType = alarmPlansOfOtherType
    },
    updateAcsData(state, { resourceName, data }) {
      console.log(resourceName)
      console.log(data)
      state.acsData[resourceName] = data
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
        api.getAlarmNotices(null, null, 'noticeTime,desc').then((res) => {
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
    },
    updateAlarmPlans({ commit }) {
      return new Promise((resolve, reject) => {
        api.getAlarmPlans().then((res) => {
          commit('updateAlarmPlans', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUsers({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUsers().then((res) => {
          commit('updateUsers', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateAlarmPlansOfOtherType({ commit }) {
      return new Promise((resolve, reject) => {
        api.getAlarmPlansOfOtherType().then((res) => {
          commit('updateAlarmPlansOfOtherType', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    nextPage({ commit, state }, resourceName) {
      return new Promise((resolve, reject) => {
        console.log('resourceName: ' + resourceName)
        console.log(state.acsData)
        console.log(state.acsData[resourceName])
        console.log(state.acsData[resourceName]._links)
        console.log(state.acsData[resourceName]._links.next)
        if (state.acsData[resourceName]._links && state.acsData[resourceName]._links.next) {
          api.get(state.acsData[resourceName]._links.next.href).then((res) => {
            commit('updateAcsData', { 'resourceName': resourceName, 'data': res.data })
            resolve()
            return
          }).catch(error => {
            reject(error)
            return
          })
        } else {
          reject(new Error('no next page'))
        }
      })
    },
    prevPage({ commit, state }, resourceName) {
      return new Promise((resolve, reject) => {
        if (state.acsData[resourceName]._links && state.acsData[resourceName]._links.prev) {
          api.get(state.acsData[resourceName]._links.prev.href).then((res) => {
            commit('updateAcsData', { 'resourceName': resourceName, 'data': res.data })
            resolve()
            return
          }).catch(error => {
            reject(error)
          })
        } else {
          reject(new Error('no prev page'))
        }
      })
    }
  }
})
