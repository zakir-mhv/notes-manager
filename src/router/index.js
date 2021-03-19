import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app"
import "firebase/auth"

import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Dashboard from '../views/Dashboard'
import Create from '../views/Create'
import Read from '../views/Read'
import Update from '../views/Update'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresGuest: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresGuest: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: { requiresAuth: true }
  },
  {
    path: "/view/:note_id",
    name: "Read",
    component: Read,
    meta: { requiresAuth: true }

  },
  {
    path: "/update/:note_id",
    name: "Update",
    component: Update,
    meta: { requiresAuth: true }
  },
  {
    path: "*",
    redirect: "/"
  }
]

const router = new VueRouter({
  routes
})

// Gloabal Before Guard
// get the route meta requirements and assign them to variables
// if route requiresAuth and user not logged in then redirect to the Log In Page
// else if route requiresGuest and user logged in then redirect to the Dashboard Page -->
// --> (in this case it means not to allow proceed to the Log In or Sign Up Page when user logged in)
// else proceed to desired route

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  let loggedIn = firebase.auth().currentUser
 
  if (requiresAuth && !loggedIn) {
    next("/login")
  } else if (requiresGuest && loggedIn) {
    next("/dashboard")
  } else {
    next()
  }
})

export default router
