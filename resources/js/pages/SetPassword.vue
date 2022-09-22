// this page still in the works , might break in  abit

<template>
  <div class="flex justify-center items-center mt-52">
    <!-- <h1>{{ $route.params.id }}</h1>
    <h1>{{ $route.params.token }}</h1> -->
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        v-on:submit.prevent="setPass()"
      >
        <label class="block text-gray-700 text-md mb-2">
          Enter your password and confirm to set your password</label
        >
        <div class="passwordInit-input mb-4">
          <label
            for="passwordCfm"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Enter Password</label
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
            id="passInit"
            type="password"
            placeholder="*******"
            v-model="passwordInit"
            required
          />
          <span v-if="msg.password1">{{ msg.password1 }}</span>
        </div>
        <div class="passwordCfm-input mb-6">
          <label
            for="passwordCfm"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Re-enter Password</label
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
            id="passwordCfm"
            v-model="passwordCfm"
            type="password"
            placeholder="*******"
            required
          />

          <span v-if="msg.password2">{{ msg.password2 }}</span>
        </div>

        <div class="flex items-center justify-end">
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
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userID: 0,
      // userEmail: "",
      // userName: "",
      passwordInit: "",
      passwordCfm: "",
      password: "",
      msg: [],
      disabled: [true, true],
    };
  },
  watch: {
    passwordInit(value) {
      // binding this to the data value in the email input
      value = this.passwordInit;
      this.validatePw1(value);
    },
    passwordCfm(value) {
      value = this.passwordCfm;
      this.validatePw2(value);
    },
  },
  methods: {
    setPass() {
      const password = {
        headers: {
          Authorization: `Bearer ${this.$route.params.token}`,
        },
        body: {
          password: this.passwordCfm,
        },
      };
      //check if the passwords match before encrypting and sending it to the backend
      if (this.passwordInit === this.passwordCfm) {
        console.log("passwords match");
        axios
          .put(`/api/set-password/${this.$route.params.id}`, password)
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error.response));
      } else {
        console.log("passwords do not match");
      }
    },
    validatePw1(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg["password1"] =
          "Must be 8 characters! " + difference + " characters left";
      } else {
        this.msg["password1"] = "";
      }
    },
    validatePw2(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg["password2"] =
          "Must be 8 characters! " + difference + " characters left";
      } else {
        this.msg["password2"] = "";
      }
    },
  },
};
</script>