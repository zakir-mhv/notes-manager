<template>
  <div class="dashboard">
    <div class="d-flex justify-content-between my-5">
      <h1>Dashboard</h1>
      <router-link to="/create">
        <button class="btn btn-primary">Add New Note</button>
      </router-link>
    </div>
    <div class="card mb-4" v-for="note in notes" :key="note.id">
      <h4 class="card-header bg-dark text-white d-flex justify-content-between">
        {{ note.title }}
        <div class="d-flex">
          <router-link :to="{name: 'Read', params: {note_id: note.id}}">
            <span class="material-icons ml-4 text-white">visibility</span>
          </router-link>
          <router-link :to="{name: 'Update', params: {note_id: note.id}}">
            <span class="material-icons ml-4 text-white">edit</span>
          </router-link>
          <router-link to="">
            <span @click="deleteNote(note.id)" class="material-icons ml-4 text-white">delete_forever</span>
          </router-link>
        </div>
      </h4>
      <div class="card-body bg-secondary text-white pre">{{ note.content }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore"

export default {
  name: "Dashboard",
  data() {
    return {
      notes: [],
      unsubscribeListener: ""
    }
  },
  created() {
     var notesRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("notes").orderBy("timestamp", "desc")
      .onSnapshot(snap => {
        this.notes = []
        snap.forEach(doc => {
            let note = doc.data()
            note.id = doc.id
            this.notes.push(note)
        })
      })
    this.unsubscribeListener = notesRef
  },
  destroyed() {
    // detach listener: unsubscribing from database's real time changes
    this.unsubscribeListener()
  },
  methods: {
    deleteNote(id) {
      var confirmValue = confirm("\n Are you sure to delete? \n Click OK to proceed!")
      if (confirmValue == true) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("notes")
          .doc(id)
          .delete()
          .then(() => {})
          .catch((error) => {
            alert(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  .pre {
    white-space: pre-wrap;
  }
</style>