
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
    v-bind:class="role"
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
          "
          href="/welcome"
        >
          <!-- admin or user messsage -->
          <h1>{{ role }}</h1>
        </a>
        <button
          class="
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
        <ul
          class="flex flex-col lg:flex-row list-none ml-auto"
          v-if="role === 'admin'"
        >
          <router-link
            class="
              px-3
              py-2
              flex
              items-center
              text-xs
              uppercase
              font-bold
              text-white
              leading-snug
              hover:opacity-75
              nav-item
            "
            v-for="AdminElement in AdminElements"
            :key="AdminElement"
            :to="AdminElement"
          >
            <span class="ml-2">{{ AdminElement }}</span>
          </router-link>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none ml-auto" v-else>
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
              hover:opacity-75
              nav-item
            "
            v-for="UserElement in UserElements"
            :key="UserElement"
            :to="UserElement"
          >
            <span class="ml-2">{{ UserElement }}</span>
          </router-link>
        </ul>
        <button @click="profileShown = !profileShown">Profile</button>
        <div v-show="profileShown" class="card-holder">
          <UserCard />
        </div>
        <button @click="logOut">LOG OUT</button>
      </div>
    </div>
  </nav>
</template>
<script>
import { useRouter } from "vue-router";
import UserCard from "../components/userCard.vue";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      showMenu: false,
      AdminElements: ["my-users", "profile", "users", "set-roles"],
      UserElements: ["my-profile", "data"],
      activeTab: "welcome",
      profileShown: false,

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
    openProfile() {
      this.profileShown = true;
    },
    hideProfile() {
      this.profileShown = false;
      console.log("clicked off");
    },
  },
  computed: {
    role() {
      return this.$store.getters.userRole;
    },
  },
};
</script>
<style scoped>
.admin {
  background-color: #20354b;
  color: white;
}
.user {
  background-color: yellow;
  color: #20354b;
}
.card-holder {
  position: absolute;
  right: 137px;
  top: 62px;
}
</style>