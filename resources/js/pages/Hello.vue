<template>
  <h1 class="text-3xl">Hello World</h1>
  <p>{{ count }}</p>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count++;
    },
  },
};
</script>

<style>
</style>