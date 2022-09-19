<template>
  <div as="nav" class="bg-white-800 nav-bar" :class="screenMode">
    <ul>
      <router-link
        v-for="navElement in navElements"
        :key="navElement"
        :to="navElement"
        active-class="active"
        class="nav-link"
        @click="activeTab = navElement"
        :class="{ active: navElement === activeTab }"
        >{{ navElement }}</router-link
      >
    </ul>
    <label
      for="default-toggle"
      class="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        class="sr-only peer"
        @click="togglemode()"
      />
      <div
        class="
          w-11
          h-6
          bg-gray-200
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
          dark:peer-focus:ring-blue-800
          rounded-full
          peer
          dark:bg-gray-700
          peer-checked:after:translate-x-full peer-checked:after:border-white
          after:content-['']
          after:absolute
          after:top-[2px]
          after:left-[2px]
          after:bg-white
          after:border-gray-300
          after:border
          after:rounded-full
          after:h-5
          after:w-5
          after:transition-all
          dark:border-gray-600
          peer-checked:bg-blue-600
        "
      ></div>
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        screenMode
      }}</span>
    </label>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      navElements: ["dashboard", "about", "login", "sign-up"],
      activeTab: "dashboard",
    };
  },
  methods: {
    togglemode() {
      console.log(this.screenMode);
      if (this.screenMode == "dark-mode") {
        return (this.$store.state.screenMode = "light-mode");
      } else {
        return (this.$store.state.screenMode = "dark-mode");
      }
    },
  },
  computed: mapState({
    screenMode: (state) => state.screenMode,
  }),
};
</script>
<style scoped>
.nav-bar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  height: 44px;
}
.router-link-exact-active {
  background-color: grey;
  color: white;
  border-bottom: 2px solid orange;
}
.nav-link {
  border-radius: 6px 6px 0px 0px;
  padding: 4px;
  margin: 2px 3px;
}
/* defined darkmode here */
.dark-mode {
  background-color: darkgrey;
  color: white;
}
.light-mode {
  background-color: white;
  color: black;
}
</style>