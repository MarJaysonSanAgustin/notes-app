<template>
  <div class="col-5 card text-white bg-secondary mb-3">
    <div class="card-header">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Note Title"
          v-model="title"
        />
      </div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Note Content"
          v-model="content"
        />
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-outline-success" @click="addNote()">
        Save Note
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "NoteForm",
  data() {
    return {
      id: null,
      title: null,
      content: null,
      errors: null
    };
  },
  methods: {
    addNote: function() {
      if (this.title && this.content) {
        db.collection("notes")
          .add({
            title: this.title,
            content: this.content,
            createdOn: new Date(),
            isComplete: false
          })
          .then(response => {
            if (response) {
              this.title = null;
              this.content = null;
              this.errors = null;
            }
          })
          .catch(error => {
            this.errors = error;
          });
      }
    }
  }
};
</script>
