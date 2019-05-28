import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

store.commit('init')

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login' && !store.getters.inLogged) {
    console.log('change ' + to.fullPath + ' to /login')
    next('/login')
  } else if (to.path.substring(to.path.lastIndexOf('/') + 1) == 'logout') {
    console.log('logout')
    store.commit('afterLogout')
    next('/login')
  // } else if(to.name == 'login'){
  //   if(store.getters.inLogged){
  //     next(from.fullPath)
  //     return
  //   }
  //   console.log('from: ')
  //   console.log(from)
  //   console.log('to: ')
  //   console.log(to)
  //   next()
  }else {
    console.log('keep original path: ' + to.fullPath)
    console.log(to)
    console.log('to.path.substring(to.path.lastIndexOf("/")): ' + to.path.substring(to.path.lastIndexOf('/')))
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
