<template>
  <section>
    <BlogCard
      v-if="slice.primary.type === 'article'"
      class="mb-12"
      :title="slice.primary.customTitle"
      :type="slice.primary.type"
      :display-count="3"
    />
    <MenuCard
      v-else
      class="w-[49%] float-left mobile:float-none mobile:w-full mb-12"
      :title="slice.primary.customTitle"
      :type="slice.primary.type"
      :display-count="5"
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
