<template>
  <div class="p-5 border border-[#c4c4c4] rounded-[10px] mb-4">
    <h1 class="text-[3rem] leading-[58px] mb-4">{{ title }}</h1>
    <p class="text-[18px] leading-[27px] mb-4" v-html="description"></p>
  </div>
</template>

<script>
export default {
  name: 'TextTitle',
  props: {
    title: {},
    description: {},
  },
}
</script>

<style scoped></style>
