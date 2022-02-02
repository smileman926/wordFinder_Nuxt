<template>
  <w-container classes="mt-5 mb-16">
    <h1 class="text-[3rem] leading-[57px] px-5 mb-1">{{ title }}</h1>
    <h2 class="text-[1.5rem] text-[#6c757d] italic pl-5">{{ subTitle }}</h2>
    <div v-if="slices.length > 0">
      <div class="content bg-white rounded-[30px] mb-6">
        <prismic-image
          v-if="page"
          :field="page.data.main_image"
          class="w-full rounded-t-[30px]"
        />
        <slice-zone class="px-6 pt-12 pb-8" type="article" :slices="slices" />
      </div>
      <Author :author="page.data.author.data" />
    </div>
    <content-placeholders v-else>
      <content-placeholders-text :lines="1" />
      <content-placeholders-img />
      <content-placeholders-img />
      <content-placeholders-img />
    </content-placeholders>
  </w-container>
</template>

<script>
import SliceZone from 'vue-slicezone'
import WContainer from '~/components/shared/w-container.vue'
import Author from '~/components/pages/article/author.vue'

export default {
  components: { WContainer, Author, SliceZone },
  data() {
    return {
      page: null,
      slices: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    }
  },
  head() {
    return { title: this.page ? this.page.data.meta_title : '' }
  },
  computed: {
    title() {
      return this.page ? this.page.data.meta_title : ''
    },
    subTitle() {
      return this.page ? this.page.data.sub_title : ''
    },
  },
  mounted() {
    if (this.$route.query.page_type) {
      this.getPrismicByUID('article', this.$route.params.slug, {
        fetchLinks: ['author.name', 'author.bio', 'author.image'],
      }).then((response) => {
        this.page = response.results[0]
        this.slices = this.page.data.body
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  filter: drop-shadow(15px 15px 45px rgba(0, 0, 0, 0.1));
}
</style>
