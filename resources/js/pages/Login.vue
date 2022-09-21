<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 p-9 bg-white rounded-xl">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-6">

          <!-- https://mui.com/material-ui/react-text-field/ -->
          <!-- <div class="floating relative">
              <input id="email" type="email" name="email" placeholder=" " autocomplete="email" required="" class="block p-3 w-full text-base appearance-none rounded-md border-transparent focus:outline-none bg-transparent" />
              <label>Email address</label>
              <fieldset>
                  <legend><span>Email address</span></legend>
              </fieldset>
          </div> -->
          <FloatingInput label="Email address" type="email" name="email" placeholder=" " />
          <FloatingInput label="Password" type="password" name="password" placeholder=" " />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<!-- <template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        v-on:submit.prevent="login()"
      >
        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Email</label
          >
          <input
            id="identity"
            class="
              shadow
              appearance-none
              borderrounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="credentials.username"
            required
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >

          <input
            aria-describedby="passwordHelp"
            v-model="credentials.password"
            class="
              shadow
              appearance-none
              borderrounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="*******"
            required
          />

          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="
              bg-blue-600
              hover:bg-black
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="submit"
          >
            Sign In
          </button>
          <router-link
            class="
              inline-block
              align-baseline
              font-bold
              text-sm text-blue-500
              hover:text-blue-800
            "
            href="#"
            :to="{ name: 'forgot-password' }"
          >
            Forgot Password?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template> -->
<script>
import { useRouter } from "vue-router";
import FloatingInput from "../components/FloatingInput.vue";
export default {
  components: {
    FloatingInput,
  },
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      userLogindata: [],
      myRouter: useRouter(),
    };
  },
  methods: {
    login() {
      // temporary javascript checking for login credentials , because thiss happens in the backend usually
      console.log(
        "the login credentials are ",
        this.credentials.username,
        "and password : ",
        this.credentials.password
      );
      
      this.$store.state.userLoggedIn;
      this.$store.state.userName = this.credentials.username;
       this.myRouter.push("welcome");
    },
  },
  created() {
    this.userLogindata = this.$store.state.users;
  },
};
</script>