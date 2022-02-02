<template>
  <div
    class="
      border border-[#C4C4C4]
      rounded-[1.25rem]
      p-5
      mb-4
      mobile:mx-2 mobile:mt-4
      text-[#232427]
    "
  >
    <div class="text-[1.5rem]">{{ title }}</div>
    <prismic-rich-text
      class="my-8 text-[18px] leading-[1.7rem]"
      :field="description"
    />
  </div>
</template>

<script>
export default {
  name: 'PrismicTitle',
  props: {
    title: {},
    description: {},
  },
  updated() {
    console.log(this.description)
  },
}
</script>

<style scoped></style>
