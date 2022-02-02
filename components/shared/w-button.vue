<template>
  <button
    class="
      leading-none
      rounded-3xl
      p-[0.625rem]
      bg-[#f7c342]
      outline-none
      focus:outline-none
      shadow-btn
    "
    :class="classes"
    :type="type"
    @click="(e) => $emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'WButton',
  props: {
    id: {
      type: String,
      default: '',
    },
    classes: {
      type: [String, Object],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    attributes: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.attributes.map((value, key) => {
      return this.$refs.button.setAttribute(key, value)
    })
  },
}
</script>
