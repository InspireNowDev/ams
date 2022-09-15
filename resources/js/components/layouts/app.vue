<template>
  <div>
    <Topbar />
    <div :class="userloggedin ? 'dark-theme' : 'light-theme'" class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Topbar from "../segment/TopBar.vue";
export default {
  components: {
    Topbar,
  },
  data() {
    return {
      userloggedin: true,
    };
  },
};
</script>
<style scoped>
.container {
  width: 1020px;
  margin: 0 auto;
  background-color: grey;
  height: 100vh;
}
.dark-theme {
  background-color: black;
  color: white;
}
.light-theme {
  background-color: white;
  color: black;
}
</style>

