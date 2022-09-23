<template>
  <span v-if="strength == 'weak'" class="weak">{{ "(" + strength + ")" }}</span>
  <span v-else-if="strength == 'okay'" class="okay">{{
    "(" + strength + ")"
  }}</span>
  <span v-else-if="strength == 'strong'" class="strong">{{
    "(" + strength + ")"
  }}</span>
  <span v-else class="none"></span>
</template>
<script>
export default {
  props: ["message"],
  data() {
    return {};
  },
  computed: {
    // computed property that auto-updates when the prop changes
    strength() {
      return this.message;
    },
  },
};
</script>
<style scoped>
.weak {
  border-bottom: 3px solid red;
  width: 40px;
}
.okay {
  border-bottom: 3px solid rgb(255, 140, 0);
  width: 60px;
}
.strong {
  border-bottom: 3px solid green;
  width: 80px;
}
.none {
  display: none;
}
</style>