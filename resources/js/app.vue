<template>
  <div class="app-container relative">
    <Getter />
    <Topbar v-if="!userLoggedIn" />
    <DashBar v-else />
    <!-- //<Toast class="absolute top right-px" /> -->
    <div class="container">
      
      <router-view v-slot="{ Component }">
          <keep-alive>
           
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
      </router-view>
<!-- 
      <router-view /> -->
    </div>
  </div>
</template>
<script>
//import { mapState } from "vuex";
import Getter from "./components/GetterComponent.vue";
import Topbar from "./components/TopbarComponents/TopBar.vue";
import DashBar from "./components/TopbarComponents/DashboardTopbar.vue";
import { mapActions } from 'vuex';
import Toast from "./components/ToastComponents/ToastContainer.vue"

export default {
  components: {
    Getter,
    Topbar,
    DashBar,
    Toast,
  },
  data() {
    return {};
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.userLoggedIn;
    },
  
  },
  created() {
      this.fetchAccessToken();
  },
   methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
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
<style>
.disabled {
  background-color: rgb(197, 197, 197);
  color: white;
}
.disabled:hover {
  background-color: rgb(197, 197, 197);
  color: white;
}
</style>

