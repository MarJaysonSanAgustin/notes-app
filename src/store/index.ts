import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";

export interface Note {
  id: string;
  title: string;
  content: string;
  isComplete: boolean;
  createdOn: Date;
  userEmail: string;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    notes: null
  },
  mutations: {
    updateUser(state, { user }) {
      Vue.set(state, "user", user);
    },
    setNotes(state) {
      let notes: Note[] = [];

      db.collection("notes")
        .orderBy("createdOn")
        .onSnapshot(snapshot => {
          notes = [];
          snapshot.forEach(doc => {
            notes.push({
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              isComplete: doc.data().isComplete,
              createdOn: doc.data().createdOn,
              userEmail: doc.data().userEmail
            });
          });
          Vue.set(state, "notes", notes);
        });
    },
    setNotesComplete(state) {
      let notes: Note[] = [];

      db.collection("notes")
        .orderBy("createdOn")
        .where("isComplete", "==", true)
        .onSnapshot(snapshot => {
          notes = [];
          snapshot.forEach(doc => {
            notes.push({
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              isComplete: doc.data().isComplete,
              createdOn: doc.data().createdOn,
              userEmail: doc.data().userEmail
            });
          });
          Vue.set(state, "notes", notes);
        });
    },
    setNotesInComplete(state) {
      let notes: Note[] = [];

      db.collection("notes")
        .orderBy("createdOn")
        .where("isComplete", "==", false)
        .onSnapshot(snapshot => {
          notes = [];
          snapshot.forEach(doc => {
            notes.push({
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              isComplete: doc.data().isComplete,
              createdOn: doc.data().createdOn,
              userEmail: doc.data().userEmail
            });
          });
          Vue.set(state, "notes", notes);
        });
    }
  },
  getters: {
    user: state => state.user,
    notes: state => state.notes
  },
  actions: {
    setNotes: context => {
      context.commit("setNotes");
    },
    setNotesComplete: context => {
      context.commit("setNotesComplete");
    },
    setNotesInComplete: context => {
      context.commit("setNotesInComplete");
    }
  },
  modules: {}
});
