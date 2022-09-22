<template>
  <div class="app-container">
    <Getter />
    <Topbar v-if="!userLoggedIn" />
    <DashBar v-else />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
//import { mapState } from "vuex";
import Getter from "./components/GetterComponent.vue";
import Topbar from "./components/TopBar.vue";
import DashBar from "./components/DashboardTopbar.vue";

export default {
  components: {
    Getter,
    Topbar,
    DashBar,
  },
  data() {
    return {};
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 10px 20px;
  min-height: calc(100vh - 75px);
  text-align: center;
  width: 100%;
}
</style>

