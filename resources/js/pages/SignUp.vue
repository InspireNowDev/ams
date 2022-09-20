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
            placeholder="Firstname"
            v-model="formData.firstname"
            required
          />
        </div>
        <div class="lastname-input mb-4">
          <label
            for="lastname"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Last name</label
          >
          <input
            id="lastname"
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
            placeholder="Last name"
            v-model="formData.lastname"
            required
          />
        </div>

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
            v-model="formData.EmailAddress"
            required
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
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
        firstname: "",
        lastname: "",
        EmailAddress: "",
        password: "",
        agree: false,
      },
      usersData: [],
      myRouter: useRouter(),
      LVresponse: "",
    };
  },
  methods: {
    async submitForm() {
      console.log(this.firstname);
      let currentObj = this;
      await axios
        .post("/api/profiles", {
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          // EmailAddress: this.formData.EmailAddress,
          // password: this.formData.password,
        })
        .then(
          (response) => {
            console.log("success");
          },
          (error) => {
            console.log("error");
          }
        );

      this.myRouter.push("set-password");
    },
    redirectToLogin() {
      this.myRouter.push("login");
    },
  },
};
</script>
