<template>
  <div class="update">
    <h1 class="my-5">Edit Note</h1>
    <form @submit.prevent="updateNote()">
      <input v-model="note.title" type="text" class="form-control" placeholder="Title..." maxlength="300" required>
      <textarea v-model="note.content" class="form-control my-4" rows="3" placeholder="Content..." maxlength="5000" required></textarea>
      <button type="submit" class="btn btn-success">Save</button>
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
  name: "Update",
  data() {
    return {
      note: {
        title: "",
        content: ""
      }
    }
  },
  created() {
    var docRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("notes")
      .doc(this.$route.params.note_id)

    docRef.get()
      .then(doc => {
        if (doc.exists) {
          this.note = doc.data()
        } else {
          alert("\n No such document!")
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    updateNote() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("notes")
        .doc(this.$route.params.note_id)
        .update({
            title: this.note.title,
            content: this.note.content
        })
        .then(() => {
          alert("\n Changes successfully saved!")
          this.$router.push("/dashboard")
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
