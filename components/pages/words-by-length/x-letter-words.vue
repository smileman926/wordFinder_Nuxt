<template>
  <w-container classes="mb-12 mobile:px-0">
    <div class="pt-5 mobile:pt-0">
      <div class="grid grid-cols-6 mobile:grid-cols-12 gap-8 mobile:gap-0">
        <div
          class="
            col-span-4
            tablet:col-span-3
            mobile:col-span-full mobile:order-2
          "
        >
          <div v-if="!(isLoading && prismicLoading)">
            <TextTitle :title="title" :description="description"></TextTitle>
            <ResultCards />
            <slice-zone
              v-if="slices.length > 0"
              class="mx-2 mt-10"
              type="words-by-length"
              :slices="slices"
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
            mobile:col-span-full mobile:order-1 mobile:border-b
            border-white
          "
        >
          <div>
            <AdvancedSearchResult :params="params" />
            <AdvancedSearchOptions class="mobile:hidden" />
          </div>
          <RightSideMenu class="mobile:hidden" />
        </div>
      </div>
      <RightSideMenu class="hidden mobile:block mobile:mx-4 mobile:mt-5" />
    </div>
  </w-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SliceZone from 'vue-slicezone'
import TextTitle from './text-title'
import AdvancedSearchResult from '~/components/pages/search/advanced-search-result.vue'
import AdvancedSearchOptions from '~/components/pages/search/advanced-search-options.vue'
import ResultCards from '~/components/pages/result/result-cards.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import WContainer from '~/components/shared/w-container.vue'
import { execTemplate } from '~/helpers'

export default {
  components: {
    AdvancedSearchResult,
    AdvancedSearchOptions,
    ResultCards,
    RightSideMenu,
    WContainer,
    SliceZone,
    TextTitle,
  },
  data() {
    return {
      prismicLoading: true,
      page: null,
      slices: [],
      params: {
        ...this.$route.params,
        ...this.$route.meta.params,
      },
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    } else {
      this.prismicLoading = true
      this.getPrismicByUID(
        'words-by-length',
        this.$route.fullPath.replace(/\//g, '')
      )
        .then((response) => {
          this.page = response.results[0]
          if (this.page) {
            this.slices = this.page.data.body
          }
        })
        .finally(() => {
          this.prismicLoading = false
        })
    }
  },
  head() {
    const description =
      this.page?.data?.meta_description ||
      execTemplate(
        this.$route.meta?.titles?.meta_description || '',
        this.templateVars
      )
    return {
      title: this.title,
      meta: [{ hid: 'description', name: 'description', content: description }],
    }
  },
  computed: {
    ...mapGetters('words', ['isLoading', 'searchResults']),
    templateVars() {
      return { ...this.params, filter_results: this.searchResults }
    },
    title() {
      return (
        this.page?.data?.meta_title ||
        execTemplate(
          this.$route.meta?.titles?.title_tag || '',
          this.templateVars
        )
      )
    },
    description() {
      return (
        this.page?.data?.intro_text ||
        execTemplate(
          this.$route.meta?.titles?.text_top || '',
          this.templateVars
        )
      )
    },
  },
}
</script>
