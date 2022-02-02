<template>
  <div
    :id="id"
    class="
      w-full
      bg-white
      border
      mobile:border-0
      border-[#C4C4C4]
      shadow
      rounded-lg
      mobile:rounded-none
    "
    :class="classes"
  >
    <slot name="card-header">Card</slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WCard',
  props: {
    id: {
      type: String,
      default: '',
    },
    classes: {
      type: [String, Object],
      default: '',
    },
  },
}
</script>
