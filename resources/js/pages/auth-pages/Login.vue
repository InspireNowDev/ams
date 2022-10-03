<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <div v-if="this.message" class="wrongPass">{{ this.message }}</div>
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
            v-model="credentials.email"
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
          <span v-if="processing"> processing</span>
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
</template>
<script>
import { useRouter } from "vue-router";
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      message: "",
      validationErrors: {},
      processing: false,
      myRouter: useRouter(),
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    async login() {
      this.processing = true;
      await axios
        .post("/api/login", this.credentials, {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$store.commit(
            "login",
            response.data.user,
            response.data.access_token
          );
          //this.$store.state.userCredentials = response.data.user;
          //this.$store.state.login_token = response.data.access_token;
          //here roles will be returned from server and assigned to the vuex data store
          this.myRouter.push("welcome");
        })
        .catch((error) => {
          console.log(error);
          this.message = "wrong password or username";
        })
        .finally(() => {
          this.processing = false;
        });
    },
  },
  created() {
    this.userLogindata = this.$store.state.users;
  },
};
</script>
<style scoped>
.wrongPass {
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  background-color: rgb(226, 141, 72);
}
</style>