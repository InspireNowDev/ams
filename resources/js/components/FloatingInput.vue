<template>
    <!-- <label>
      {{ label }}
      <input type="text" :name="name" :value="value" @input="onInput" @change="onChange" />
    </label> -->
  <div class="relative">
    <input :id="id" :type="type" :name="name" :value="modelValue" :placeholder="placeholder" :autocomplete="autocomplete" @input="onInput" @change="onChange" class="block p-3 w-full text-base appearance-none rounded-md border-transparent focus:outline-none bg-transparent"/>
    <label>{{ label }}</label>
    <fieldset>
      <legend>
        <span>{{ label }}</span>
      </legend>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "FloatingInput",
  props: {
    type: { type: String, required: false },
    value: { type: String, required: false },
    name: { type: String, required: true, default: "" },
    label: { type: String, required: true, default: "" },
    placeholder: { type: String, required: false, default: "" },
    id: { type: String, required: false, default: "" },
    autocomplete: { type: String, required: false, default: "" },
    required: { type: String, required: false, default: "" },
    modelValue: String,
  },
  /* Can add validation here
watch: {
    value: {
    handler(newValue, oldValue) {

    },
    },
}, */
computed: {
    /* name() {
    return this.label.toLowerCase();
    }, */
  },
  emits:["update:modelValue"],
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit("update:modelValue", event.target.value);
    },
    onChange(event) { // Supports .lazy
    // Can add validation here
    this.$emit('change', event.target.value);
    },
},
}
</script>

<style scoped>
label {
    @apply absolute top-0 left-0 p-3 text-base text-gray-500 pointer-events-none max-w-full text-ellipsis whitespace-nowrap overflow-hidden ease-out duration-200;
}
input:not(:placeholder-shown) ~  label {
    @apply absolute -top-2 left-2.5 px-3 py-0 text-xs text-gray-500 ease-out duration-200;
}
input:focus-within ~  label {
    @apply absolute -top-2 left-2.5 px-3 py-0 text-xs text-blue-500 ease-out duration-200;
}
fieldset {
    @apply border-2 border-gray-300 rounded-md text-left px-3 absolute w-full pointer-events-none -top-1 bottom-0;
}
input:not(:placeholder-shown) ~ fieldset {
    @apply border-2 border-gray-300 text-left px-3 absolute w-full pointer-events-none -top-1 bottom-0;
}
input:focus-within ~ fieldset {
    @apply border-2 border-blue-500 text-left px-3 absolute w-full pointer-events-none -top-1 bottom-0;
}

fieldset legend {
    @apply float-none w-auto overflow-hidden block p-0 h-2.5 text-xs invisible whitespace-nowrap ease-out duration-75 max-w-0;
}
input:focus-within ~ fieldset legend,
input:not(:placeholder-shown) ~ fieldset legend {
    @apply float-none w-auto overflow-hidden block px-2 py-0 h-2.5 text-xs invisible whitespace-nowrap ease-out duration-100 max-w-full;
}
</style>