<template>
  <div id="signup-container">
    <h1>signup page</h1>
    <form action="">
      <label>Email :</label>
      <input type="email" required />
    </form>
    <span
      >Already have an account??

      <router-link :to="{ name: 'login' }">Log in</router-link>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "", //i.e email
        password: "",
        agree: "",
      },
    };
  },
  methods: {
    redirectToLogin() {
      this.router.push("login");
    },
  },
};
</script>
