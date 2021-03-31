<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-0">
      
      <router-link class="nav-item" to="/">
        <a class="navbar-brand">
          <img src="../assets/logo.png" height="50" alt="logo">
        </a>
      </router-link>

      <!-- Collapsibe Hamburger Button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav ml-auto">
          <router-link v-if="loggedIn" class="nav-item" to="/dashboard">
            <a class="nav-link text-warning">{{ currentUserEmail }}</a>
          </router-link>
        </ul>

        <ul class="navbar-nav ml-auto">
          <router-link v-if="!loggedIn" class="nav-item" active-class="active" to="/" exact>
            <a class="nav-link">HOME</a>
          </router-link>
          <router-link v-if="!loggedIn" class="nav-item" active-class="active" to="/login">
            <a class="nav-link">LOG IN</a>
          </router-link>
          <router-link v-if="!loggedIn" class="nav-item" active-class="active" to="/signup">
            <a class="nav-link">SIGN UP</a>
          </router-link>
          <router-link v-if="loggedIn" class="nav-item" to="/login">
            <a @click.prevent="logout()" class="nav-link">LOG OUT</a>
          </router-link>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: "Navbar",
  data() {
    return {
      loggedIn: false,
      currentUserEmail: ""
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true
        this.currentUserEmail = user.email
      } else {
        this.loggedIn = false
        this.currentUserEmail = ""
      }
    })
  },
  methods: {
    logout() {
      let confirmValue = confirm("\n Are you sure to log out? \n Click OK to proceed!")
      if (confirmValue == true) {
        firebase.auth().signOut()
        .then(() => {
          this.$router.push("/login")
        })
        .catch(error => {
          alert(error)
        })
      }
    }
  }
}
</script>
