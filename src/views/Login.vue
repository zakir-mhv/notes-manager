<template>
  <div class="login">
    <h1 class="text-center my-3 display-4">Login</h1>
    <div class="col-lg-4 offset-lg-4 mt-5 p-5 border border-success rounded bgWhite">
      <form @submit.prevent="login()">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control mb-4" placeholder="Email..." required/>

          <label>Password</label>
          <input v-model="password" type="password" class="form-control mb-5" placeholder="Password..." required/>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-success">Log In</button>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import Footer from "../components/Footer"

export default {
  name: "Login",
  components: {
    Footer
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/dashboard")
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>

<style scoped>
  .bgWhite {
    background-color: white
  }
</style>