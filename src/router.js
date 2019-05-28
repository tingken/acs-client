import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import AlarmHistory from './views/AlarmHistory.vue'
import AlarmManage from './views/AlarmManage.vue'
import DeviceManage from './views/DeviceManage'
import UserManage from './views/UserManage'
import LoginHistory from './views/LoginHistory'
import Operator from './views/Operator'
import AlarmControl from './views/AlarmControl'
import ChangePassword from './views/ChangePassword'
import AddUser from './views/AddUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.roles && store.state.roles.includes('ROLE_ADMIN')) {
          next('/admin')
        } else if (store.state.roles && store.state.roles.includes('ROLE_USER')) {
          next('/operator')
        } else {
          store.commit('afterLogout')
          next('/login')
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        { path: '', redirect: 'alarmHistory' },
        { path: 'alarmHistory', component: AlarmHistory },
        { path: 'alarmManage', component: AlarmManage },
        { path: 'deviceManage', component: DeviceManage },
        { path: 'userManage', component: UserManage },
        { path: 'loginHistory', component: LoginHistory },
        { path: 'addUser', component: AddUser }
      ],
      beforeEnter: (to, from, next) => {
        if (store.state.roles && !store.state.roles.includes('ROLE_ADMIN')) {
          if (store.state.roles && store.state.roles.includes('ROLE_USER')) {
            next('/operator')
            return
          } else {
            store.commit('afterLogout')
            next('/login')
            return
          }
        }
        next()
      }
    },
    {
      path: '/operator',
      name: 'operator',
      component: Operator,
      children: [
        { path: '', redirect: 'AlarmControl' },
        { path: 'alarmControl', component: AlarmControl },
        { path: 'alarmHistory', component: AlarmHistory },
        { path: 'changePassword', component: ChangePassword }
      ],
      beforeEnter: (to, from, next) => {
        if (!store.state.roles.includes('ROLE_USER')) {
          if (store.state.roles.includes('ROLE_ADMIN')) {
            next('/admin')
          } else {
            store.commit('afterLogout')
            next('/login')
          }
        }
        next()
      }
    }
  ]
})
