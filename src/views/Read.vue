<template>
  <div class="read">
    <h1 class="my-5">View Note</h1>
    <div class="card mb-4">
      <h4 class="card-header bg-dark text-white">{{ note.title }}</h4>
      <div class="card-body bg-secondary text-white pre">{{ note.content }}</div>  
    </div>
    <router-link to="/dashboard">
      <button class="btn btn-secondary">Back</button>
    </router-link>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore"

export default {
  name: "Read",
  data() {
    return {
      note: {
        title: "",
        content: ""
      }
    }
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("notes")
      .doc(this.$route.params.note_id)
      .get()
      .then(doc => {
        this.note = doc.data()
      })
      .catch(error => {
        alert(error)
      })
  }
}
</script>

<style scoped>
  .pre {
    white-space: pre-wrap;
  }
</style>