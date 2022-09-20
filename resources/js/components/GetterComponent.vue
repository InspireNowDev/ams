this component is to submit all getter handled while App.vue is being 
<template></template>

<script>
export default {
  async created() {
    const response = await axios.get("http://localhost:8000/api/profiles");
    this.$store.state.profiles = response.data.profile;

    // const userData = await axios.get("http://localhost:3000/users");
    // this.users = userData.data;
    // this.$store.state.users = userData.data;
  },
};
</script>
