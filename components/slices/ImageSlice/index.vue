<template>
  <section>
    <prismic-image :field="slice.primary.image" class="mb-5 mx-auto" />
  </section>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>
