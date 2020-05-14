<template>
  <div>
    <p>Dashboard</p>
    <button type="button" @click="logout()">Logout</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
});
</script>
