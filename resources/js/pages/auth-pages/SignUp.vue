<!--<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <div class="successMsg" v-if="this.LVresponse">{{ this.LVresponse }}</div>
      <form
        v-on:submit.prevent="submitForm()"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="firstname-input mb-4">
          <label
            for="firstname"
            class="block text-gray-700 text-sm font-bold mb-2"
            >First Name</label
          >
          <input
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
            placeholder="Name"
            v-model="formData.firstname"
            required
          />
        </div>
        <div class="firstname-input mb-4">
          <label
            for="firstname"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Last Name</label
          >
          <input
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
            placeholder="Name"
            v-model="formData.lastname"
            required
          />
        </div>

        <div class="email-input mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            Email</label
          >
          <input
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
            v-model="formData.email"
            required
          />
          <span class="text-xs text-red-700" v-if="this.emailMessage">{{
            this.emailMessage
          }}</span>
        </div>
        <div class="acceptterms-input mb-4">
          <input
            type="checkbox"
            id="checkbox"
            v-model="formData.useragree"
            required
          />
          <label for="checkbox" class="text-gray-700 text-sm font-bold mb-2">
            Accept terms??</label
          >
        </div>
        <div class="flex items-center justify-center">
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
            Sign Up
          </button>
          <span v-if="this.processing"> processing </span>
        </div>
      </form>
      <span
        >Already have an account??
        <router-link :to="{ name: 'login' }">Log in</router-link>
      </span>
    </div>
  </div>
</template>-->
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
          Sign Up
        </h2>
      </div>
      <form class="mt-8 space-y-6" v-on:submit.prevent="submitForm()">
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
          <FloatingInput
            id="firstname"
            label="First name"
            type="text"
            name="firstname"
            placeholder=" "
            @custom-change="handleFN"
          />
          <FloatingInput
            id="lastname"
            label="Last name"
            type="text"
            name="lastname"
            placeholder=" "
            @custom-change="handleLN"
          />
          <FloatingInput
            id="email"
            label="Email address"
            type="email"
            name="email"
            placeholder=" "
            @custom-change="handleEmail"
          />
          <!-- <FloatingInput
            label="Password"
            type="password"
            name="password"
            placeholder=" "
            @custom-change="handlePassword"
          /> -->
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
              v-model="formData.useragree"
              required
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"
              >Agree to terms
            </label>
          </div>

          <div class="text-sm">
            <router-link
              class="font-medium text-indigo-600 hover:text-indigo-500"
              :to="{ name: 'login' }"
              >already have an account?</router-link
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
            <span v-if="this.processing">Processing..</span>
            <span v-else> Sign up </span>
          </button>
        </div>
      </form>
    </div>
    <Toasts />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import FloatingInput from "@/components/FloatingInput.vue";
import Toasts from "@/components/ToastContainer.vue";

export default {
  components: {
    FloatingInput,
    Toasts,
  },
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        useragree: false,
      },
      myRouter: useRouter(),
      buttondisabled: true,
      LVresponse: "",
      emailMessage: "",

      processing: false, //processing while waiting for response is here, can be done here whenever user commits an action that requires async methods
    };
  },
  //reactive data
  computed: {
    email() {
      return this.formData.email;
    },
    isComplete() {
      return (
        this.formData.firstname != "" &&
        this.formData.lastname != "" &&
        this.formData.email != "" &&
        this.formData.useragree != ""
      );
    },
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      value = this.email;
      this.emailrefresh(value);
    },
  },
  methods: {
    async submitForm() {
      this.processing = true;
      let currentObj = this;
      const postData = {
        firstname: this.formData.firstname,
        lastname: this.formData.lastname,
        email: this.formData.email,
        useragree: this.formData.useragree,
      };
      await axios
        .post("/api/register", postData)
        .then((response) => {
          console.log(response.data.status);
          console.log(response.data.message);
          this.LVresponse = "check your email to confirm register";
          //this.myRouter.push("set-password"); push to profilecreated  page
        })
        // .catch(function (error) {
        //   console.log("Show error notification!");
        //   console.log(error.request);
        // })
        .catch((error) => {
          this.errors_exist = true;
          if (error.response.status === 422) {
            console.log(error);
            //this.errors = error.response.data.errors || {};
            this.emailMessage = error.response.data.errors.email[0];
            this.$store.commit("addToast", {
              title: "Hello Vuex!",
              type: "danger",
              message: "email adress already taken",
            });
          } else {
            console.log("error undefined (from FE)");
          }
          //tbc
        })
        .finally(() => {
          this.processing = false;
        });
    },
    redirectToLogin() {
      this.myRouter.push("login");
    },
    // watcher functions
    emailrefresh() {
      this.emailMessage = "";
    },
    handleEmail(s) {
      this.formData.email = s;
    },
    handleFN(s) {
      this.formData.firstname = s;
    },
    handleLN(s) {
      this.formData.lastname = s;
    },
  },
};
</script>
<style scoped>
.successMsg {
  background-color: aqua;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
}
</style>