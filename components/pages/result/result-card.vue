<template>
  <w-card>
    <template #card-header>
      <div
        class="
          mobile:sticky mobile:top-[66px]
          z-10
          bg-seagreen-300
          text-white
          font-bold
          px-10
          mobile:px-4
          py-2
          rounded-t-lg
          mobile:rounded-none
        "
      >
        <div class="flex justify-between items-center text-2xl mobile:text-xl">
          <span v-if="groupByLength" class="mobile:leading-[25px]">
            {{ lettersLength }} Letter Words
          </span>
          <span v-else class="mobile:leading-[25px]">All Words</span>
          <SearchOptionSort />
        </div>
      </div>
    </template>
    <div class="px-10 py-5 mobile:pt-[23px] mobile:px-[15px]">
      <div class="flex flex-wrap gap-2 mobile:gap-5">
        <ResultWord
          v-for="(word, index) in wordList"
          :key="index"
          :word="word"
        />
      </div>
      <div v-if="hasMoreWords" class="flex justify-center mt-[32px]">
        <w-button
          class="
            text-[18px] text-white text-gray-700
            uppercase
            px-6
            py-3
            w-[120px]
            h-10
            grid
            justify-center
            items-center
            active:relative active:top-1 active:left-1
            transition-all
            duration-300
            ease
          "
          @click="loadMore()"
        >
          <img v-show="isLoading" src="~/assets/icons/loading.gif" />
          <span v-show="!isLoading">More</span>
        </w-button>
      </div>
    </div>
  </w-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ResultWord from '~/components/pages/result/result-word.vue'
import SearchOptionSort from '~/components/pages/search/search-option-sort-mobile.vue'
import WCard from '~/components/shared/w-card.vue'
import WButton from '~/components/shared/w-button.vue'

export default {
  name: 'ResultCard',
  components: { WCard, WButton, ResultWord, SearchOptionSort },
  props: {
    lettersLength: {
      type: Number,
      default: 0,
    },
    words: {
      type: Array,
      default: () => [],
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      wordList: [],
      currentWordPage: 1,
      returnedResults: 0,
      hasMoreWords: true,
      isLoading: false,
    }
  },
  computed: {
    ...mapState('words', ['searchOptions', 'searchData']),
    groupByLength() {
      return this.searchOptions.group_by_length
    },
  },
  mounted() {
    this.wordList = this.words
    this.returnedResults = this.words.length
    this.hasMoreWords = this.hasMore
  },
  methods: {
    ...mapActions({
      getMoreResults: 'words/getMoreResults',
    }),
    loadMore() {
      this.isLoading = true

      this.currentWordPage++
      let { searchData } = this
      searchData = { ...searchData }
      searchData.page_token = this.currentWordPage
      if (this.lettersLength > 0) searchData.length = this.lettersLength

      this.getMoreResults({
        searchData,
      })
        .then(({ data }) => {
          this.isLoading = false

          const wordPage = data.word_pages[0]
          const moreWords = wordPage.word_list
          this.wordList = [...this.wordList, ...moreWords]

          if (wordPage.current_page === wordPage.num_pages) {
            this.hasMoreWords = false
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
