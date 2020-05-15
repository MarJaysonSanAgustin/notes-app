<template>
  <div class="container">
    <div class="row">
      <NoteForm />
    </div>
    <div class="row">
      <div class="form-group">
        <label for="exampleSelect1">Filter</label>
        <select class="form-control" id="filter" @change="onChange($event)">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div
        v-for="item in this.$store.getters.notes"
        :key="item.id"
        class="col-3 card border-primary mb-3"
      >
        <NoteItem
          :id="item.id"
          :title="item.title"
          :content="item.content"
          :isComplete="item.isComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import NoteItem from "@/components/NoteItem.vue";
import NoteForm from "@/components/NoteForm.vue";

export default Vue.extend({
  name: "NoteList",
  components: {
    NoteItem,
    NoteForm
  },
  beforeCreate: function() {
    this.$store.dispatch("setNotes");
  },
  props: {},
  methods: {
    onChange(event) {
      const val = event.target.value;
      if (val === "all") {
        this.$store.dispatch("setNotes");
      } else if (val === "completed") {
        this.$store.dispatch("setNotesComplete");
      } else if (val === "pending") {
        this.$store.dispatch("setNotesInComplete");
      }
    }
  }
});
</script>
