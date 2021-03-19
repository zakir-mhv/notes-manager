<template>
  <div class="home">
    <div class="row align-items-center h-90">
      <div class="col-md-6">
        <h1 class="display-4 mb-2">Notes Manager</h1>
        <h4 class="mb-5">Log In or Sign Up to write, <br>edit and delete notes.</h4>
        
        <router-link class="nav-item"  to="/login">
          <button type="submit" class="btn btn-success">Log In</button>
        </router-link>
        <span class="mx-3">or</span>
        <router-link class="nav-item"  to="/signup">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </router-link>
      </div>
      <div class="col-md-6">
        <img src="../assets/notes.jpg" class="rounded" width="100%" alt="notes">
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer"

export default {
  name: "Home",
  components: {
    Footer
  }
}
</script>

<style scoped>
  .h-90 {
    height: 90vh;
  }
</style>
