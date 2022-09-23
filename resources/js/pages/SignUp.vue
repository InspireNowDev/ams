<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <div class="successMsg" v-if="this.LVresponse">{{ this.LVresponse }}</div>
      <form
        v-else
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
        <span
          >Already have an account??
          <router-link :to="{ name: 'login' }">Log in</router-link>
        </span>
      </form>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        useragree: false,
      },
      myRouter: useRouter(),

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