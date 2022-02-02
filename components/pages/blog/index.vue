<template>
  <w-container classes="mobile:px-0">
    <div class="flex flex-wrap tablet:justify-center gap-5 mt-12 mb-14">
      <a
        v-for="(article, index) in articles"
        :key="index"
        class="
          w-[32%]
          mobile:w-[348px]
          h-[333px]
          tablet:w-[49%]
          inline-block
          flex flex-col
          border border-[#00000020]
          rounded-[10px]
        "
        data-nuxt-link
        :href="`${article.uid}?page_type=article`"
      >
        <div
          class="
            w-full
            h-[232px]
            mobile:h-[232px]
            rounded-t-[10px]
            overflow-hidden
            object-fit
          "
        >
          <prismic-image :field="article.data.teaser_image" />
        </div>
        <p class="text-[18px] text-[#353D50] leading-[22px] p-5">
          {{ article.data.meta_title }}
        </p>
      </a>
    </div>
  </w-container>
</template>

<script>
import WContainer from '~/components/shared/w-container.vue'

export default {
  components: { WContainer },
  data() {
    return {
      articles: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.articles = this.$nuxt.context.payload.main.results
    }
  },
  head() {
    return { title: 'WordTips Articles' }
  },
  mounted() {
    this.getPrismicByDocType('article', { pageSize: 100 }).then((response) => {
      this.articles = response.results
    })
  },
}
</script>
