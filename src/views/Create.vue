<template>
  <div class="create">
    <h1 class="my-5">New Note</h1>
    <form @submit.prevent="addNote()">
      <input v-model="note.title" type="text" class="form-control" placeholder="Title..." maxlength="300" required>
      <textarea v-model="note.content" class="form-control my-4" rows="3" placeholder="Content..." maxlength="5000" required></textarea>
      <button type="submit" class="btn btn-primary">Add</button>
      <router-link to="/dashboard">
        <button class="btn btn-secondary ml-4">Back</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore"

export default {
  name: "Create",
  data() {
    return {
      note: {
        title: "",
        content: ""
      }
    }
  },
  methods: {
    addNote() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("notes")
        .add({
          title: this.note.title,
          content: this.note.content,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          alert("\n Note successfully created!")
          this.$router.push("/dashboard")
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
