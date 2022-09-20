<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        v-on:submit.prevent="postEmail()"
      >
        <div class="emailAddress-input mb-4">
          <label for="emailAddress" class="block text-gray-700 text-md mb-2">
            Enter your email address so we can send your reset password
            link</label
          >
          <input
            id="emailAddress"
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
            v-model="emailAddress"
            required
          />
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
            Sign In
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
      emailAddress: "",
    };
  },
  method: {
    postEmail() {
      //post email address to backend
    },
  },
};
</script>