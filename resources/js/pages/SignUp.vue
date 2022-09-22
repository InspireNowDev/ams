<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
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
            v-model="formData.name"
            required
          />
        </div>
        <div class="password-input mb-6">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >

          <input
            aria-describedby="passwordHelp"
            v-model="formData.password"
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
            placeholder="password 1"
            required
          />
          <span class="text-xs text-red-700" v-if="this.password_message">{{
            this.password_message
          }}</span>
        </div>
        <div class="password-input mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm Password</label
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
            id="password_confirm"
            type="password"
            placeholder="password 2"
            v-model="formData.password_confirm"
            required
          />
          <span
            class="text-xs text-red-700"
            v-if="this.password_confirm_message"
            >{{ this.password_confirm_message }}</span
          >
        </div>

        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
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
            v-model="formData.agree"
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
</template>
<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      formData: {
        name: "",
        password: "",
        password_confirm: "",
        email: "",
        agree: false,
      },
      usersData: [],
      myRouter: useRouter(),
      LVresponse: "",
      emailMessage: "",
      password_message: "",
      password_confirm_message: "",
      processing: false, //processing while waiting for response is here, can be done here whenever user commits an action that requires async methods
    };
  },
  //reactive data
  computed: {
    email() {
      return this.formData.email;
    },
    password() {
      return this.formData.password;
    },
    password_confirm() {
      return this.formData.password_confirm;
    },
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      value = this.email;
      this.emailrefresh(value);
    },
    password(value) {
      // binding this to the data value in the email input
      value = this.password;
      this.pwrefresh(value);
    },
    password_confirm(value) {
      // binding this to the data value in the email input
      value = this.password_confirm;
      this.pwcfmrefresh(value);
    },
  },
  methods: {
    async submitForm() {
      this.processing = true;
      let currentObj = this;
      const postData = {
        name: this.formData.name,
        password: this.formData.password,
        password_confirm: this.formData.password_confirm,
        email: this.formData.email,
      };
      await axios
        .post("/api/register", postData)
        .then((response) => {
          console.log(response.data.status);
          console.log(response.data.message);
          alert("check your email");
          //this.myRouter.push("set-password"); push to profilecreated  page
        })
        // .catch(function (error) {
        //   console.log("Show error notification!");
        //   console.log(error.request);
        // })
        .catch((error) => {
          //this.errors_exist = true;
          if (error.response.status === 422) {
            console.log(error);
            //this.errors = error.response.data.errors || {};
            this.emailMessage = error.response.data.errors.email[0];
            this.password_message = error.response.data.errors.password[0];
            this.password_confirm_message =
              error.response.data.errors.password_confirm[0];
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
    pwrefresh() {
      this.password_message = "";
    },
    pwcfmrefresh() {
      this.password_confirm_message = "";
    },
  },
};
</script>
