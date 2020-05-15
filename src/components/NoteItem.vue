<template>
  <div>
    <div v-if="!editMode">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <p class="card-text">"{{ content }}"</p>
        <div class="form-check">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              @click="markComplete()"
              v-model="noteComplete"
            />
            Mark as complete
          </label>
        </div>
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="deleteNote()"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="toggleEdit()"
        >
          Edit
        </button>
      </div>
    </div>
    <div v-if="editMode">
      <div class="card-header">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Note Title"
          v-model="note.title"
        />
      </div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Note Content"
          v-model="note.content"
        />
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-outline-success"
          @click="saveEdit()"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="toggleEdit()"
        >
          Cancel Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "NoteItem",
  data() {
    return {
      errors: null,
      editMode: false,
      note: {
        title: this.$props.title,
        content: this.$props.content
      },
      noteComplete: this.$props.isComplete
    };
  },
  props: {
    id: null,
    title: null,
    content: null,
    isComplete: null
  },
  methods: {
    deleteNote: function() {
      if (this.id) {
        db.collection("notes")
          .doc(this.id)
          .delete()
          .then(function() {
            console.log("Note successfully deleted!");
          })
          .catch(function(error) {
            this.errors = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },
    markComplete: function() {
      if (this.id) {
        db.collection("notes")
          .doc(this.id)
          .update({
            isComplete: !this.isComplete
          })
          .catch(function(error) {
            this.errors = error;
          });
      }
    },
    saveEdit: function() {
      if (this.id) {
        db.collection("notes")
          .doc(this.id)
          .update({
            title: this.note.title,
            content: this.note.content
          })
          .catch(function(error) {
            this.errors = error;
          })
          .finally(() => {
            this.toggleEdit();
          });
      }
    },
    toggleEdit() {
      this.editMode = !this.editMode;
    }
  }
};
</script>
