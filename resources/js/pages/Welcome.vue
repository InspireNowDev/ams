<template>
  <h1>Welcome user {{ userName }}</h1>
  <h2>email : {{ userEmail }}</h2>
  <h2>Role : {{ userRole }}</h2>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userRole() {
      return this.$store.getters.userRole;
    },
  },
};
</script>