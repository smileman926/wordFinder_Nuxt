<template>
  <w-container classes="mb-12 mobile:px-0">
    <div class="pt-5 mobile:pt-0">
      <div class="grid grid-cols-6 mobile:grid-cols-12 gap-8 mobile:gap-0">
        <div
          class="
            col-span-4
            tablet:col-span-3
            mobile:col-span-full mobile:order-2
            text-left text-[#232427]
          "
        >
          <content-placeholders v-if="isWordDetailLoading">
            <content-placeholders-text :lines="1" />
            <content-placeholders-img />
            <content-placeholders-img />
            <content-placeholders-img />
          </content-placeholders>
          <div v-else>
            <div class="border border-[#00000020] rounded pt-8 p-5 mb-5">
              <h2 class="text-[3rem] mobile:text-[1.25rem] leading-none mb-1">
                Word Games
              </h2>
              <div class="text-[14px] font-bold leading-[21px] ml-1">
                Scrabble US/Canada (OTCWL)
                <span
                  class="
                    text-[70%] text-white
                    rounded
                    pt-[0.2rem]
                    pb-[0.12rem]
                    px-[0.3rem]
                  "
                  :class="isOTCWL ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
                >
                  {{ isOTCWL ? 'Yes' : 'No' }}
                </span>
              </div>
              <div class="text-[14px] font-bold leading-[21px] ml-1">
                Scrabble UK (SOWPODS)
                <span
                  class="
                    text-[70%] text-white
                    rounded
                    pt-[0.2rem]
                    pb-[0.12rem]
                    px-[0.3rem]
                  "
                  :class="isSOWPODS ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
                >
                  {{ isSOWPODS ? 'Yes' : 'No' }}
                </span>
              </div>
              <div class="text-[14px] font-bold leading-[21px] ml-1">
                Words With Friends
                <span
                  class="
                    text-[70%] text-white
                    rounded
                    pt-[0.2rem]
                    pb-[0.12rem]
                    px-[0.3rem]
                  "
                  :class="isWWF ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
                >
                  {{ isWWF ? 'Yes' : 'No' }}
                </span>
              </div>
            </div>
            <h3 class="text-[1rem] font-bold">
              {{ definitionWord }} Definition
            </h3>
            <div v-if="words">
              <div
                v-for="(definition, index) in words.definitions"
                :key="index"
                class="border border-[#00000020] rounded p-5 mt-4"
              >
                <div class="italic pt-4 text-[18px]">
                  ({{ definition.part_of_speech }})
                </div>
                <div>
                  <div v-if="definition.text">
                    <span
                      class="
                        text-[0.5rem] text-white
                        font-bold
                        capitalize
                        rounded
                        pt-[0.2rem]
                        pb-[0.12rem]
                        px-[0.3rem]
                        bg-[#28a745]
                      "
                    >
                      definitions
                    </span>
                    <p class="mt-4 text-[18px]">
                      {{ definition.text }}
                    </p>
                  </div>
                  <hr class="my-4 w-full border-[#E5E5E5]" />
                  <div v-if="definition.examples">
                    <span
                      class="
                        text-[0.5rem] text-white
                        font-bold
                        capitalize
                        rounded
                        py-1
                        px-[0.4rem]
                        bg-[#007bff]
                      "
                    >
                      examples
                    </span>
                    <p
                      v-for="(example, exampleIndex) in definition.examples"
                      :key="exampleIndex"
                      class="text-[18px] pb-3.5"
                    >
                      {{ example }}
                    </p>
                  </div>
                  <div v-if="definition.synonyms">
                    <span
                      class="
                        text-[0.5rem] text-[#212529]
                        font-bold
                        capitalize
                        rounded
                        pt-[0.2rem]
                        pb-[0.12rem]
                        px-[0.3rem]
                        bg-[#ffc107]
                      "
                    >
                      synonyms
                    </span>
                    <div class="flex flex-wrap gap-2 mt-3">
                      <nuxt-link
                        v-for="(synonym, synonymIndex) in definition.synonyms"
                        :key="synonymIndex"
                        class="text-[14px] leading-none hover:cursor-pointer"
                        :to="`/words-for/${synonym}`"
                      >
                        {{ synonym }}
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <AdvancedSearchResult />
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
import { mapGetters, mapActions } from 'vuex'
import AdvancedSearchResult from '~/components/pages/search/advanced-search-result.vue'
import AdvancedSearchOptions from '~/components/pages/search/advanced-search-options.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import WContainer from '~/components/shared/w-container.vue'

export default {
  components: {
    AdvancedSearchResult,
    AdvancedSearchOptions,
    RightSideMenu,
    WContainer,
  },
  computed: {
    ...mapGetters({
      wordDetail: 'words/wordDetail',
      currentWord: 'words/currentWord',
      isWordDetailLoading: 'words/isWordDetailLoading',
    }),
    isOTCWL() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('otcwl')
    },
    isSOWPODS() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('sowpods')
    },
    isWWF() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('wwf')
    },
    words() {
      if (!this.wordDetail) return []
      return this.wordDetail.words
    },
    definitionWord() {
      const word = this.$route.params.slug
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
  },
  created() {
    const slug = this.$route.params.slug
    this.getDefinition({ word: slug })
  },
  methods: {
    ...mapActions({
      getDefinition: 'words/getDefinition',
    }),
  },
}
</script>
