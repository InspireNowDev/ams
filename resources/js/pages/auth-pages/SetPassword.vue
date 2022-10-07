<template>
 <!-- div new  -->
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
        <h2
          class="
            mt-6
            text-center text-3xl
            font-bold
            tracking-tight
            text-gray-900
          "
        >
         Set up your password
        </h2>
      </div>
      <form class="mt-8 space-y-6" v-on:submit.prevent="setPass()">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-6">
          <FloatingInput  id="passInit" label="Enter Password"  type="password" name="password" placeholder=" " @custom-change="handlePW"
          />

          <PassStrength :message="msg.password1" :key="msg.password1" />

          <FloatingInput  id="passwordCFM" label="Re-enter Password" type="password" name="passwordCfm" placeholder=" "  @custom-change="handlePW2"
          />

          <PassStrength :message="msg.password2" :key="msg.password2" />
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
            <span v-else> Confirm</span>
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
import PassStrength from "@/components/PassStrength.vue";
import { useRouter } from "vue-router";
import FloatingInput from "@/components/FloatingInput.vue";
import Toasts from "@/components/ToastContainer.vue";

export default {
  components: {
    PassStrength,
    FloatingInput,
    Toasts
  },
  data() {
    return {
      // userID: 0,
      // userEmail: "",
      // userName: "",
      password: "",
      password_confirm: "",
      passwordMsg: "",
      processing: false,
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
      if (this.password.length <=8  ){
        this.passwordMsg = "passwords length is not long enough";
         console.log("passwords length is not long enough");
      }
      else if (this.password === this.password_confirm  && this.password.length >=8  ) {
  
        this.processing = true;
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
          .catch((error) => console.log(error.response))
          .finally(() => {
              this.processing = false;
            });
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
    handlePW(s) {
      this.password = s;
    },
    handlePW2(s) {
      this.password_confirm = s;
    },
 
  },
   computed:{
     toasts() {
      return this.$store.state.toasts;
    },
     isComplete() {
      return this.password != "" && this.password_confirm != "";
    },
  }
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