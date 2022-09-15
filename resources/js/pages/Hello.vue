<template>
  <h1 class="text-3xl">Hello World</h1>
  <p>{{ count }}</p>
  <p>{{ this.nonstoreCount }}</p>
  <button @click="addCount()">increase counter of nonstoreCount</button>
</template>

<script>
export default {
  data() {
    return {
      nonstoreCount: 0,
    };
  },
  computed: {
    count() {
      return this.$store.state.count++;
    },
  },
  created() {
    this.nonstoreCount += 1;
  },
  methods: {
    addCount() {
      this.nonstoreCount += 1;
    },
  },
};
</script>

<style>
</style>