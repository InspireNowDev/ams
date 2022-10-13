
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
          <h1>{{ role }} Dashboard </h1>
          
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
          v-if="role === 'super-admin'"
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
            v-for="SuperAdminElement in SuperAdminElements"
            :key="SuperAdminElement"
            :to="SuperAdminElement"
          >
            <span class="ml-2">{{ SuperAdminElement }}</span>
          </router-link>
        </ul>
        <ul
          class="flex flex-col lg:flex-row list-none ml-auto"
          v-else-if="role === 'admin'"
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

      
      
        <button class="m-4" @click="logOut"><span class="">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 483.336 483.336" style="enable-background:new 0 0 483.336 483.336;" xml:space="preserve">
                <g>
                  <g>
                    <path d="M241.668,0C108.198,0,0,108.198,0,241.668c0,133.471,108.198,241.668,241.668,241.668    c133.469,0,241.668-108.197,241.668-241.668C483.336,108.198,375.137,0,241.668,0z M221.677,28.424h39.982v212.355h-39.982V28.424    z M241.668,434.912c-106.556,0-193.245-86.688-193.245-193.244c0-73.207,40.583-139.277,105.911-172.428l18.091,35.655    c-51.824,26.297-84.02,78.706-84.02,136.772c0,84.511,68.751,153.263,153.263,153.263c84.51,0,153.263-68.752,153.263-153.263    c0-58.064-32.192-110.472-84.018-136.77l18.091-35.655c65.324,33.152,105.908,99.219,105.908,172.426    C434.912,348.225,348.225,434.912,241.668,434.912z"/>
                  </g> 
                </g>
        </svg>
        </span></button>
        
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
      SuperAdminElements: [ "Home" , "profile" , "roles", "permissions" , "users" ],
      AdminElements: [ "Home" , "profile" , "roles" , "users"],
      UserElements: [ "Home" , "profile" ],
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
    

      // const config = {
      //     headers: { Authorization:  'Bearer ' + this.$store.getters.logToken }
      // };
      //   console.log( axios.defaults.headers['Authorization'] );
      //   console.log( config.headers.Authorization );

      // set token bearer
      axios.defaults.headers['Authorization']  ='Bearer ' +this.$store.getters.logToken;
      axios.post('/api/logout').then((response) => {
      console.log(response.data);
        })
        .catch((errors) => {
          console.log(errors)
        })
      //this.$store.state.userLoggedIn = false;
      //this.$store.state.userName = "";
      this.$store.commit("logout");
      this.myRouter.push("login");
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