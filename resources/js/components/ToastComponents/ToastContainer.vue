<template>
  <div class="toasts-wrapper" v-if="toasts.length">
    <Toast v-for="(toast, index) of toasts" :key="index" :toast="toast">
    </Toast>
  </div>
</template>

<script>
import Toast from "@/components/ToastComponents/toastMessages.vue";
export default {
  name: "Toasts",
  components: { Toast },
  computed: {
    toasts() {
      return this.$store.state.toasts;
    },
  },
};
</script>