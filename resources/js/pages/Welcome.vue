<template>
  <UserCard />
</template>
<script>
import UserCard from "../components/userCard.vue";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      showPopup: false,
    };
  },
};
</script>