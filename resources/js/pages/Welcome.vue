<template>
  <h1>Welcome {{ userLogin }}</h1>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    userLogin() {
      return this.$store.state.userName;
    },
  },
};
</script>