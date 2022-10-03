// this page still in the works , might break in  abit

<template>
  <div class="flex justify-center items-center mt-52">
    <!-- <h1>{{ $route.params.id }}</h1>
    <h1>{{ $route.params.token }}</h1> -->
    <div class="w-full max-w-xs">
      <div v-if="this.passwordMsg">{{ this.passwordMsg }}</div>
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        v-on:submit.prevent="setPass()"
      >
        <label class="block text-gray-700 text-md mb-2">
          Enter your password and confirm to set your password</label
        >
        <div class="passwordInit-input mb-4">
          <label
            for="password_confirm"
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
            v-model="password"
            required
          />
          <PassStrength :message="msg.password1" :key="msg.password1" />
          <!-- <span v-if="msg.password1">{{ msg.password1 }}</span> -->
        </div>
        <div class="password_confirm-input mb-6">
          <label
            for="password_confirm"
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
            id="password_confirm"
            v-model="password_confirm"
            type="password"
            placeholder="*******"
            required
          />
          <PassStrength :message="msg.password2" :key="msg.password2" />
          <!-- <span v-if="msg.password2 == 'weak'" class="weak">{{
            msg.password2
          }}</span>
          <span v-else-if="msg.password2 == 'okay'" class="okay">{{
            msg.password2
          }}</span>
          <span v-else class="strong">{{ msg.password2 }}</span> -->
          <!-- //can be in a component -->
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
import PassStrength from "../../components/PassStrength.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    PassStrength,
  },
  data() {
    return {
      // userID: 0,
      // userEmail: "",
      // userName: "",
      password: "",
      password_confirm: "",
      passwordMsg: "",
      msg: [],
      disabled: [true, true],
      myRouter: useRouter(),
    };
  },
  watch: {
    password(value) {
      // binding this to the data value in the email input
      value = this.password;
      this.validatePw(value, "password1");
    },
    password_confirm(value) {
      value = this.password_confirm;
      this.validatePw(value, "password2");
    },
  },
  methods: {
    setPass() {
      const password = {
        password: this.password,
        password_confirm: this.password_confirm,
      };
      //check if the passwords match before encrypting and sending it to the backend
      if (this.password === this.password_confirm) {
        axios
          .post(
            `/api/set-password/${this.$route.params.id}/${this.$route.params.token}`,
            password
          )
          .then((response) => {
            console.log(response.data.message);
            this.passwordMsg = "password set succesfully";
            this.myRouter.push({ name: "login" });
          })
          .catch((error) => console.log(error.response));
      } else {
        this.passwordMsg = "passwords dont match";
        console.log("passwords do not match");
      }
    },
    validatePw(value, val) {
      if (value.length == 0) {
        this.msg[val] = "";
      } else if (value.length < 4) {
        this.msg[val] = "weak";
      } else if (value.length < 6) {
        this.msg[val] = "okay";
      } else if (value.length < 8) {
        this.msg[val] = "strong";
      }
    },
  },
};
</script>
<style scoped>
.weak {
  border-bottom: 3px solid red;
}
.okay {
  border-bottom: 3px solid rgb(255, 140, 0);
}
.strong {
  border-bottom: 3px solid green;
}
</style>