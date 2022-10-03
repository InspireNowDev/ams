
<template>
  <nav
    class="
      relative
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
      bg-purple-500
      mb-3
    "
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="
          w-full
          relative
          flex
          justify-between
          lg:w-auto
          px-4
          lg:static lg:block lg:justify-start
        "
      >
        <a
          class="
            text-sm
            font-bold
            leading-relaxed
            inline-block
            mr-4
            py-2
            whitespace-nowrap
            uppercase
            text-white
          "
          href="#pablo"
        >
          If youre reading this youre logged in
        </a>
        <button
          class="
            text-white
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <router-link
            class="
              px-3
              py-2
              flex
              items-center
              text-xs
              uppercase
              font-bold
              leading-snug
              text-white
              hover:opacity-75
              nav-item
            "
            v-for="navElement in navElements"
            :key="navElement"
            :to="navElement"
          >
            <span class="ml-2">{{ navElement }}</span>
          </router-link>
        </ul>

        <button @click="logOut">Log out</button>
      </div>
    </div>
  </nav>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      showMenu: false,
      navElements: ["users"],
      activeTab: "welcome",
      myRouter: useRouter(),
    };
  },
  name: "navbar",
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    logOut() {
      this.$store.commit("logout");
      //this.$store.state.userLoggedIn = false;
      //this.$store.state.userName = "";
      this.myRouter.push("login");
    },
  },
};
</script>