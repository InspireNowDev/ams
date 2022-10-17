<template>
  <div
    class="
      flex flex-col
      min-h-full
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8 p-9 bg-white rounded-xl">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
        <h2
          class="
            mt-6
            text-center text-3xl
            font-bold
            tracking-tight
            text-gray-900
          "
        >
          Sign in
        </h2>
      </div>
      <form class="mt-8 space-y-6" v-on:submit.prevent="login()">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-6">
          <FloatingInput  id="emailAdress" label="Email address"  type="email" name="email" placeholder=" "
            @custom-change="handleEmail"
          />
          <FloatingInput
            id="password"
            label="Password"
            type="password"
            name="password"
            placeholder=" "
            @custom-change="handlePassword"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="
                h-4
                w-4
                rounded
                border-gray-300
                text-indigo-600
                focus:ring-indigo-500
              "
              v-model="remember_me"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"
              >Remember me</label
            >
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              flex
              w-full
              justify-center
              rounded-md
              border border-transparent
              bg-indigo-600
              py-2
              px-4
              text-sm
              font-medium
              text-white
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
            "
            :class="!isComplete ? 'disabled' : 'enabled'"
            :disabled="!isComplete"
          >
            <span v-if="this.processing">Processing...</span>
            <span v-else> Sign in</span>
          </button>
        </div>
      </form>
    </div>
    <Toasts />
    <!-- <Toast v-if="this.message" message="wtv however" toast-type="normal" /> example toast -->
    <!-- toasts can be used like a component and passed message and type of toast to be shown -->
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import FloatingInput from "@/components/FloatingInput.vue";
import Toasts from "@/components/ToastComponents/ToastContainer.vue";

export default {
  components: {
    FloatingInput,
    Toasts,
  },
  name: "login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      remember_me: false,
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
          // axios.defaults.headers['Authorization']  ='Bearer ' + response.data.access_token;
          // axios.defaults.headers['Content-Type']='application/json';

          this.$store.commit("login", response.data.user);
          this.$store.commit("token_set", response.data.access_token);
          this.$store.commit("role_set",response.data.role.role_title);
          this.$store.commit("setRemember",this.remember_me);
          // get to local
          localStorage.setItem('accessToken', response.data.access_token);
          //this.$store.commit("loginStop", null);
         
          this.myRouter.push("home");
        })
        .finally(() => {
          this.processing = false;
        });
    },
    handleEmail(s) {
      this.credentials.email = s;
    },
    handlePassword(s) {
      this.credentials.password = s;
    },
  },
  computed: {
    toasts() {
      return this.$store.state.toasts;
    },
    isComplete() {
      return this.credentials.email != "" && this.credentials.password != "";
    },
    remember_user(){
      return this.$store.getters.userRemember;
    }
  },
  created(){
      this.remember_me = this.$store.getters.userRemember;
      //this.credentials.email = this.$store.getters.userEmail;
  }
};
</script>
<style scoped>
.wrongPass {
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  background-color: rgb(254, 75, 44);
  color: white;
}
</style>