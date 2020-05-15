import Vue from "vue";
import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

let app: Vue;

const firebaseConfig = {
  apiKey: "AIzaSyBIoTsZg9MjCl0_kJnQoJMJgNalwLp6wHI",
  authDomain: "notes-app-1f1c5.firebaseapp.com",
  databaseURL: "https://notes-app-1f1c5.firebaseio.com",
  projectId: "notes-app-1f1c5",
  storageBucket: "notes-app-1f1c5.appspot.com",
  messagingSenderId: "277864013394",
  appId: "1:277864013394:web:36ee3fd892d40408c0c98b",
  measurementId: "G-C164R3K5PS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  store.commit("updateUser", { user });
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
