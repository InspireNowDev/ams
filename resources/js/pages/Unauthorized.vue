<template>
  <div class="statement">
    Oops it seems you do not have the credentials to enter this page,
  </div>
  <router-link :to="{ name: 'login' }" class="link"
    >Return to safety</router-link
  >
</template>
<style scoped>
.link {
  border-radius: 6px;
  background-color: teal;
  color: white;
  padding: 10px;
}
.statement {
  margin-bottom: 10px;
}
</style>