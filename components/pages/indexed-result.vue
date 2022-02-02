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
          <div
            v-if="title"
            class="
              p-5
              border border-[#c4c4c4]
              rounded-[1.25rem]
              mb-4
              mobile:mx-2 mobile:my-4
            "
          >
            <h1 class="text-[3rem] leading-[58px] mb-7">{{ title }}</h1>
            <prismic-rich-text class="mb-7" :field="introText" />
          </div>
          <div
            v-if="showBadge"
            class="
              flex
              justify-between
              items-center
              px-2
              pt-2.5
              pb-2
              border border-[#c4c4c4]
              mobile:border-0
              rounded-[10px]
              mb-4
              mobile:mx-2
              text-[1.5rem]
              leading-6
            "
          >
            <slot name="meta"></slot>
            <span
              class="text-[1.25rem] cursor-pointer"
              @click="showBadge = false"
            >
              <CloseIcon />
            </span>
          </div>
          <ResultCards />
          <slice-zone
            v-if="slices.length > 0"
            class="mobile:px-5 pt-10"
            :class="{
              'p-5 border border-[#00000020]': uid === 'words-with-q-without-u',
            }"
            type="list"
            :slices="slices"
          />
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
            <AdvancedSearchResult :params="searchParams" />
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
import SliceZone from 'vue-slicezone'
import AdvancedSearchResult from '~/components/pages/search/advanced-search-result.vue'
import AdvancedSearchOptions from '~/components/pages/search/advanced-search-options.vue'
import ResultCards from '~/components/pages/result/result-cards.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import WContainer from '~/components/shared/w-container.vue'
import CloseIcon from '~/assets/icons/x-circle.svg?inline'

export default {
  components: {
    AdvancedSearchResult,
    AdvancedSearchOptions,
    ResultCards,
    RightSideMenu,
    WContainer,
    SliceZone,
    CloseIcon,
  },
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      page: null,
      slices: [],
      show: true,
      searchParams: {
        ...this.$route.params,
        ...this.$props.params,
        ...this.$route.meta.params,
      },
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    }
  },
  computed: {
    showBadge: {
      get() {
        return this.show && !!this.$slots.meta
      },
      set(v) {
        this.show = v
      },
    },
    title() {
      return this.page ? this.page.data.meta_title : ''
    },
    description() {
      return this.page ? this.page.data.meta_description : ''
    },
    introText() {
      return this.page ? this.page.data.intro_text : ''
    },
    uid() {
      return this.$route.meta.uid || this.$route.path.replace('/', '')
    },
  },
  mounted() {
    this.getPrismicByUID('indexed-result', this.uid).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
}
</script>
