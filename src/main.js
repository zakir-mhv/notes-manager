import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app"

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB53HDZ0yOpxwxodR3DtCJdWHke-xCxKh8",
  authDomain: "notes-manager-5b00f.firebaseapp.com",
  projectId: "notes-manager-5b00f",
  storageBucket: "notes-manager-5b00f.appspot.com",
  messagingSenderId: "295097228659",
  appId: "1:295097228659:web:8560adf95f94f057653906"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

// Initialize the app only when Firebase Auth object is ready to use,
// and with this when page is refreshed firebase.auth().currentUser will be ready
// to use inside router.beforeEach() in router/index.js file.
let app = ""
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})