import Vue from 'vue'
import firebase from "firebase";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Driver from '@/components/Driver'
import Admin from '@/components/Admin'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/signup',
    name:'signup',
    component:Signup,
    meta: {
      guest: true
    }
  },
  {
    path: '/driver',
    name: 'Driver',
    component: Driver,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/login',
    name:'signin',
    component:Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(userAuth => {
    if (!userAuth && to.matched.some(record => record.meta.requiresAuth)) {
      next({
        name: 'signin'
      })
    } else if (userAuth) {
      if (to.matched.some(record => record.meta.guest)) {
        next(from.fullPath)
      } else {
        firebase.firestore().collection("roles").doc(userAuth.uid).get().then(snapShot => {
          if (snapShot.data().isAdmin) {
            next({
              name: 'Admin'
            })
          } else {
            next({
              name: 'Driver'
            })
          }
        })
      }
    } else {
      next()
    }
  })
  next()
})
export default router
