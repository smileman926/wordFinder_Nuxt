<template>
  <section class="section">
    <div class="text-3xl mb-10">{{ slice.primary.sliceTitle }}</div>
    <div
      v-for="(item, i) in slice.items"
      :key="`slice-item-${i}`"
      class="flex mb-5"
    >
      <div class="w-40 flex-shrink-0">
        <prismic-image :field="item.image" />
      </div>
      <div class="p-5 text-left">
        <prismic-rich-text :field="item.text" />
      </div>
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

<style scoped>
.section {
  position: relative;
  background: #f7f7f7;
  color: #111;
  padding: 4em;
  text-align: center;
}
a {
  color: #111;
}
.title {
  margin-bottom: 2em;
}
</style>
