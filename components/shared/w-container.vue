<template>
  <div
    class="
      container
      mx-auto
      max-w-[71.25rem]
      tablet:max-w-3xl
      mobile:max-w-full
      px-[15px]
    "
    :class="classes"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WContainer',
  props: {
    classes: {
      type: [String, Object],
      default: '',
    },
  },
}
</script>
