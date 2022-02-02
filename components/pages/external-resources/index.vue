<template>
  <div>
    <div class="bg-seagreen-300">
      <w-container>
        <div class="pt-[3.275rem] pb-20 mobile:pb-40 text-white text-center">
          <h1
            class="
              text-[3rem]
              mobile:text-[2rem]
              leading-[3.6rem]
              mobile:leading-[2.4rem]
              font-medium
            "
          >
            Word Finder
          </h1>
          <AdvancedSearchMain />
        </div>
      </w-container>
    </div>
    <w-container classes="pt-5 pb-12">
      <div
        class="
          grid grid-cols-6
          mobile:grid-cols-12
          gap-4
          text-[18px]
          leading-[27px]
        "
      >
        <div class="col-span-4 tablet:col-span-3 mobile:col-span-full">
          <div v-if="slices.length > 0">
            <div class="border border-[#C4C4C4] rounded-[4px] p-5 mb-5">
              <h1
                class="
                  text-[3rem]
                  mobile:text-[1.25rem]
                  leading-[57px]
                  mobile:leading-[24px]
                  mb-5
                "
              >
                {{ title }}
              </h1>
              <p class="text-[18px] leading-[27px]" v-html="description"></p>
            </div>
            <prismic-rich-text
              v-for="(slice, index) in slices"
              :key="index"
              :field="slice.primary.text"
              class="border border-[#C4C4C4] shadow rounded-[4px] p-5 pb-8 mb-5"
            />
          </div>
          <content-placeholders v-else>
            <content-placeholders-text :lines="1" />
            <content-placeholders-img />
            <content-placeholders-img />
            <content-placeholders-img />
          </content-placeholders>
        </div>
        <div
          class="
            col-span-2
            tablet:col-span-3
            mobile:col-span-full mobile:border-b
            border-white
          "
        >
          <RightSideMenu />
        </div>
      </div>
    </w-container>
  </div>
</template>

<script>
import WContainer from '~/components/shared/w-container.vue'
import AdvancedSearchMain from '~/components/pages/search/advanced-search-main.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'

export default {
  components: {
    WContainer,
    AdvancedSearchMain,
    RightSideMenu,
  },
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
    description() {
      return this.page
        ? `Recommended Resources<br>${this.page.data.meta_description}`
        : ''
    },
  },
  mounted() {
    this.getPrismicByUID('static', 'external-resources', {
      fetchLinks: ['article.teaser_image', 'article.meta_title'],
    }).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
}
</script>

<style lang="scss" scoped>
::v-deep a[data-nuxt-link] {
  color: #00a739;
}
</style>
