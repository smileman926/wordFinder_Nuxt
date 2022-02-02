<template>
  <w-container classes="mobile:px-0">
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
            v-if="isPlayable"
            class="
              flex
              mobile:justify-center
              items-center
              p-2.5
              border
              mobile:border-0
              border-[#c4c4c4]
              rounded-[10px]
              mb-4
              mobile:mb-0
            "
          >
            <CheckIcon />
            <p class="text-2xl font-bold">
              {{ lettersForSearch }} is playable!
            </p>
          </div>
          <div
            v-if="isFilterPage && show"
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
            <p>
              Showing <b v-if="isConsonantWordsPage">Consonant Words</b>
              <b v-if="isVowelWordsPage">Vowel Words</b>
            </p>
            <span class="text-[1.25rem] cursor-pointer" @click="show = false">
              <CloseIcon />
            </span>
          </div>
          <div v-if="notFound" class="mobile:p-4 mobile:pb-16">
            <ResultNotFound />
          </div>
          <ResultCards v-else />
          <content-placeholders v-if="isLoading">
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
          <AdvancedSearchResult />
          <AdvancedSearchOptions />
        </div>
      </div>
    </div>
  </w-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AdvancedSearchResult from '~/components/pages/search/advanced-search-result.vue'
import AdvancedSearchOptions from '~/components/pages/search/advanced-search-options.vue'
import ResultCards from '~/components/pages/result/result-cards.vue'
import ResultNotFound from '~/components/pages/result/result-not-found.vue'
import WContainer from '~/components/shared/w-container.vue'
import CheckIcon from '~/assets/icons/check.svg?inline'
import CloseIcon from '~/assets/icons/x-circle.svg?inline'

export default {
  components: {
    AdvancedSearchResult,
    AdvancedSearchOptions,
    ResultCards,
    ResultNotFound,
    WContainer,
    CheckIcon,
    CloseIcon,
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {
    ...mapGetters('words', [
      'noResult',
      'isLoading',
      'isPlayable',
      'lettersForSearch',
    ]),
    notFound() {
      return this.noResult && !this.isLoading
    },
    isConsonantWordsPage() {
      return this.$route.path.includes('consonant-words')
    },
    isVowelWordsPage() {
      return this.$route.path.includes('vowel-words')
    },
    isFilterPage() {
      return this.isConsonantWordsPage || this.isVowelWordsPage
    },
  },
}
</script>
