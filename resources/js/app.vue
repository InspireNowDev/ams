<template>
  <div>
    <Topbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Topbar from "./components/TopBar.vue";
export default {
  components: {
    Topbar,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.container {
  width: 1280px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: rgb(236, 236, 236);
  min-height: calc(100vh - 44px);
  text-align: center;
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

