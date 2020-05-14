<template>
  <div class="login-page">
    <div class="form">
      <h1>Sign In</h1>
      <p class="error-msg" v-if="error">{{ error }}</p>
      <form class="login-form">
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button type="button" @click="login()">Submit</button>
        <p class="message">
          Not Registered?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </form>
    </div>
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
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
</style>
