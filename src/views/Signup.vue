<template>
  <div class="signup">
    <h1 class="text-center my-3 display-4">Sign Up</h1>
    <div class="col-lg-4 offset-lg-4 mt-5 p-5 border border-primary rounded bgWhite">
      <form @submit.prevent="signUp()">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control mb-4" placeholder="Email..." required/>

          <label>Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Password..." required/>
          <small class="form-text text-muted mb-5">Min. 6 characters</small>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary">Sign Up</button>
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
  name: "Signup",
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
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          alert(`Account successfully created for ${userCredential.user.email}`)
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