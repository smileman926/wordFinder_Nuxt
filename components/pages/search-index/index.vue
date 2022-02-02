<template>
  <div>
    <!-- Advanced Search -->
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
            {{ title }}
          </h1>
          <div
            v-if="isDictionary"
            class="text-black mt-[1.3rem] mb-[8.5rem] p-2"
          >
            <h3 class="mobile:text-[17px] leading-[1.5rem] text-white mb-5">
              Enter up to 3 wildcards (<u class="font-bold">?</u> or
              <u class="font-bold">space</u>)
            </h3>
            <div class="relative mx-auto max-w-[620px]">
              <form @submit.prevent="onDictionarySubmit">
                <MainSearchInput
                  v-model="dictionaryLetters"
                  classes="h-[3.75rem] mobile:h-[46px] px-4 py-px leading-[3rem] text-center text-[2rem] mobile:text-xl"
                  button-classes="block"
                  :is-valid="!showValidationError"
                  :button-click="onDictionarySubmit"
                  :clear-values="CLEAR_SEARCH_DATA"
                />
              </form>
            </div>
          </div>
          <AdvancedSearchMain v-else />
        </div>
      </w-container>
    </div>
    <!-- Blog Section -->
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
        <div
          class="
            col-span-4
            tablet:col-span-3
            mobile:col-span-full
            border border-[#C4C4C4]
            shadow
            rounded-lg
            px-[22px]
            py-[8px]
          "
        >
          <template v-if="page && page.data.show_index">
            <ul class="pl-10 mt-4 mb-10 list-disc">
              <label class="block -ml-10 mb-6 text-[1rem] font-bold">
                Table of Contents:
              </label>
              <li v-for="(indexTitle, index) in indexTitles" :key="index">
                <a
                  class="
                    block
                    text-[#007bff]
                    hover:text-[#0056b3] hover:underline hover:cursor-pointer
                  "
                  :href="`#${indexTitle.href}`"
                >
                  {{ indexTitle.label }}
                </a>
              </li>
            </ul>
          </template>
          <slice-zone v-if="slices.length > 0" type="search" :slices="slices" />
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
import { mapGetters, mapMutations } from 'vuex'
import WContainer from '~/components/shared/w-container.vue'
import AdvancedSearchMain from '~/components/pages/search/advanced-search-main.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import MainSearchInput from '~/components/pages/search/main-search-input.vue'
import { isDictionary } from '~/helpers'

export default {
  components: {
    WContainer,
    AdvancedSearchMain,
    RightSideMenu,
    MainSearchInput,
    SliceZone,
  },
  data() {
    return {
      page: null,
      slices: [],
      dictionaryLetters: '',
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    }
  },
  computed: {
    ...mapGetters({
      showValidationError: 'words/showValidationError',
    }),
    title() {
      return this.page ? this.page.data.title_for_search : ''
    },
    isDictionary() {
      return isDictionary(this.$route.params.slug)
    },
    indexTitles() {
      let indexes = []
      this.slices
        .filter((slice) => {
          return slice.slice_type === 'text_slice'
        })
        .forEach((slice) => {
          const headingText = slice.primary.text
            .filter((text) => {
              return text.type === 'heading1'
            })
            .map((text) => {
              return {
                href: text.text,
                label: text.text,
              }
            })
          if (headingText.length > 0) {
            indexes = [...indexes, ...headingText]
          }
        })

      return indexes
    },
  },
  mounted() {
    const slug = this.$route.params.slug
    const options = {
      fetchLinks: ['article.teaser_image', 'article.meta_title'],
    }
    let documentType = 'search'
    if (isDictionary(slug)) {
      documentType = 'dictionary'
    }
    this.getPrismicByUID(documentType, slug, options).then((response) => {
      this.page = response.results[0]
      if (!this.page) {
        return
      }
      this.slices = this.page.data.body
    })
  },
  methods: {
    ...mapMutations({
      setValidationError: 'words/SET_VALIDATION_ERROR',
    }),
    onDictionarySubmit() {
      if (this.dictionaryLetters) {
        this.$router.push(`/dictionary/${this.dictionaryLetters}`)
      } else {
        this.setValidationError(true)
        setTimeout(() => {
          this.setValidationError(false)
        }, 1000)
      }
    },
    clearValues() {
      this.letters = ''
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .clear-left + section > .float-left {
  margin-right: 2%;
}
</style>
