<template>
  <h1>About View page</h1>
  <p>{{ students }}</p>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: mapState({
    students: (state) => state.students,
  }),
};
</script>

<style>
</style>