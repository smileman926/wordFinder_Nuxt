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
          <AdvancedSearchMain list-page />
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
          <div
            v-if="title"
            class="p-5 border border-[#c4c4c4] rounded-[0.25rem] mb-4"
          >
            <h1 class="text-[3rem] leading-[58px] mb-5">{{ title }}</h1>
            <prismic-rich-text class="text-[18px]" :field="description" />
          </div>
          <div
            v-if="slices.length > 0 && urlList"
            class="p-5 pb-8 border border-[#c4c4c4] rounded-[0.25rem] mb-4"
          >
            <a
              v-for="(text, url) in urlList"
              :key="url"
              :href="url"
              class="block text-[18px] text-[#00a739] hover:underline"
            >
              {{ text }}
            </a>
          </div>
          <slice-zone v-if="slices.length > 0" type="list" :slices="slices" />
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
import SliceZone from 'vue-slicezone'
import WContainer from '~/components/shared/w-container.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import AdvancedSearchMain from '~/components/pages/search/advanced-search-main.vue'
import wordsListPages from '~/config/words_list_pages.json'

export default {
  components: {
    WContainer,
    AdvancedSearchMain,
    RightSideMenu,
    SliceZone,
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
    return {
      title: this.page ? this.page.data.meta_title : '',
    }
  },
  computed: {
    title() {
      return this.page ? this.page.data.meta_title : ''
    },
    description() {
      return this.page ? this.page.data.intro_text : ''
    },
    urlList() {
      return wordsListPages[this.uid].url_list
    },
    uid() {
      return this.$route.path.replace('/', '')
    },
  },
  mounted() {
    this.getPrismicByUID('list', this.uid).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
}
</script>

<style lang="scss" scoped>
::v-deep .clear-left + section > .float-left {
  margin-right: 2%;
}
</style>
