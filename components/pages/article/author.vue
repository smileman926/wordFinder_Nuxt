<template>
  <div
    v-if="author"
    class="
      flex
      items-start
      gap-6
      relative
      p-5
      bg-white
      border border-[#00000020]
    "
  >
    <prismic-image class="max-w-[150px]" :field="author.image" />
    <div class="flex-grow">
      <h1 class="text-[3rem] leading-none mb-5">About the Author</h1>
      <p class="text-[18px] font-bold mb-4">{{ author.name }}</p>
      <p class="text-[18px]">{{ author.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  props: {
    author: {
      type: Object,
      default: null,
    },
  },
}
</script>
