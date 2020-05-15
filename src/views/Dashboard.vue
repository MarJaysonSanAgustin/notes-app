<template>
  <div class="dashboard-page">
    <Navbar />
    <NoteList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import NoteList from "@/components/NoteList.vue";
import Navbar from "@/components/Nav.vue";

export default Vue.extend({
  name: "Dashboard",
  components: {
    NoteList,
    Navbar
  },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.dashboard-page {
  text-align: center;
}
</style>
