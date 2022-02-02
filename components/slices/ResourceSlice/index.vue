<template>
  <section>
    <prismic-rich-text :field="slice.primary.intro" />
    <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
      <p>{{ item.name }}</p>
      <prismic-link :field="item.link">My Link</prismic-link>
    </div>
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
