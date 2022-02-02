<template>
  <section>
    <BlogCard
      v-if="slice.primary.show_thumbnails"
      class="mb-12"
      :title="slice.primary.title"
      :items="slice.items"
    />
    <MenuCard
      v-else
      class="w-[49%] float-left mobile:float-none mobile:w-full mb-12"
      :title="slice.primary.title"
      :items="slice.items"
    />
  </section>
</template>

<script>
import MenuCard from '~/components/pages/home/menu-card.vue'
import BlogCard from '~/components/pages/home/blog-card.vue'

export default {
  components: { MenuCard, BlogCard },
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
