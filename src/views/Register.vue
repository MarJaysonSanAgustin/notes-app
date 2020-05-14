<template>
  <div class="registration-page">
    <div class="form">
      <h1>Sign Up</h1>
      <p class="error-msg" v-if="error">{{ error }}</p>
      <form>
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="register()" type="button">Submit</button>
        <p class="message">
          Already registered?
          <router-link to="/">Sign In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          this.error = error.message;
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.registration-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
</style>
