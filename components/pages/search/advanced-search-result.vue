<template>
  <div
    class="
      text-black
      sticky
      z-10
      mobile:static
      top-[10px]
      mb-4
      mobile:mb-0
      bg-white
      mobile:bg-seagreen-300
    "
  >
    <form @submit.prevent="onSubmit">
      <div
        class="
          hidden
          mobile:block
          bg-seagreen-300
          px-4
          py-2
          mobile:pt-3
          z-10
          sticky
          top-0
        "
      >
        <div class="relative">
          <MainSearchInput
            v-model="letters"
            classes="border-0 border-gray-700 h-[46px] text-center"
            button-classes="block"
            :is-valid="!showValidationError"
            :button-click="onSubmit"
            :clear-values="CLEAR_SEARCH_DATA"
            @focus="onFocusMainInput()"
          />
        </div>
      </div>
      <div
        v-show="isFixed"
        class="
          hidden
          mobile:block
          bg-seagreen-300
          px-4
          py-2
          mobile:pt-3
          z-10
          fixed
          top-0
          w-full
          border-b border-white
        "
      >
        <div class="relative">
          <MainSearchInput
            v-model="letters"
            classes="border-0 border-gray-700 h-[46px] text-center"
            button-classes="block"
            :is-valid="!showValidationError"
            :button-click="onSubmit"
            :clear-values="CLEAR_SEARCH_DATA"
            @focus="onFocusMainInput()"
          />
        </div>
      </div>
      <div
        class="
          shadow
          rounded-[0.625rem]
          border
          mobile:border-0
          border-[#C4C4C4]
          p-5
          mobile:px-4 mobile:pt-0 mobile:pb-3
        "
      >
        <div class="mobile:hidden">
          <div class="relative">
            <MainSearchInput
              v-model="letters"
              classes="border border-gray-700"
              button-classes="hidden"
              :is-valid="!showValidationError"
              :button-click="onSubmit"
              :clear-values="CLEAR_SEARCH_DATA"
            />
          </div>
        </div>

        <div class="mt-3 mobile:bg-white mobile:rounded-lg mobile:p-4">
          <div class="grid grid-cols-2 gap-4">
            <w-input
              id="starts_with"
              v-model="starts_with"
              label="Starts"
              placeholder="A"
              type="letter"
            >
              <template #hint>
                Find words that
                <span class="text-[#ffc107] font-bold">start</span> with these
                letters(<span class="text-[#ffc107] font-bold">AB</span>->
                <span class="text-[#ffc107] font-bold">Ab</span>le)
              </template>
            </w-input>
            <w-input
              id="ends_with"
              v-model="ends_with"
              label="Ends"
              placeholder="Z"
              type="letter"
            >
              <template #hint>
                Find words that
                <span class="text-[#ffc107] font-bold">end</span> in these
                letters(<span class="text-[#ffc107] font-bold">AB</span> ->
                C<span class="text-[#ffc107] font-bold">ab</span>)
              </template>
            </w-input>
            <w-input
              id="contains"
              v-model="contains"
              label="Contains"
              placeholder="A_P"
              type="letter"
            >
              <template #hint>
                Words that contain letters in this order(
                <span class="text-[#ffc107] font-bold">AB</span>
                -> C<span class="text-[#ffc107] font-bold">ab</span>le) or in
                certain positions(
                <span class="text-[#ffc107] font-bold">X_S</span>
                ->E<span class="text-[#ffc107] font-bold">x</span>e<span
                  class="text-[#ffc107] font-bold"
                  >s</span
                >)
              </template>
            </w-input>
            <w-input
              id="length"
              v-model="length"
              label="Length"
              placeholder="5"
              type="digit"
            >
              <template #hint>
                Only show words with a specific
                <span class="text-[#ffc107] font-bold">length</span>
              </template>
            </w-input>
          </div>

          <w-button
            type="submit"
            classes="mt-4 w-full h-10 text-gray-700 text-[18px] grid items-center active:relative active:top-1 active:left-1 transition-all duration-300 ease"
          >
            <img
              v-show="isLoading"
              class="justify-self-start"
              src="~/assets/icons/loading.gif"
            />
            <span v-show="!isLoading" class="justify-self-center">
              SEARCH
            </span>
          </w-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import MainSearchInput from '~/components/pages/search/main-search-input.vue'
import WInput from '~/components/shared/w-input.vue'
import WButton from '~/components/shared/w-button.vue'

import { generateSearchPath, validate, mapSearchFields } from '~/helpers'
import { SCROLL_TOP_POSITION } from '~/config/constants'

export default {
  name: 'AdvancedSearchResult',
  components: { MainSearchInput, WInput, WButton },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isFixed: false,
    }
  },
  computed: {
    ...mapGetters('words', [
      'searchResults',
      'lettersForSearch',
      'isLoading',
      'showValidationError',
    ]),
    ...mapState('words', ['searchData']),
    ...mapSearchFields(),
  },
  mounted() {
    this.getResults()
    this.scrollToTop()
  },
  methods: {
    ...mapMutations('words', [
      'SET_WORD_RESULTS',
      'SET_VALIDATION_ERROR',
      'CLEAR_SEARCH_DATA',
      'SET_SEARCH_DATA',
    ]),
    ...mapActions('words', ['getResults']),
    onSubmit() {
      if (validate(this.searchData)) {
        const path = generateSearchPath(this.searchData)

        if (this.$route.path === path) {
          this.getResults()
          this.scrollToTop()
        } else {
          this.$router.push({ path })
        }
      } else {
        this.SET_VALIDATION_ERROR(true)
        setTimeout(() => {
          this.SET_VALIDATION_ERROR(false)
        }, 1000)
      }
    },
    setPositionMainSearchInput() {
      const nowScrollTop = document.documentElement.scrollTop
      if (nowScrollTop >= SCROLL_TOP_POSITION) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },

    onFocusMainInput() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollToTop() {
      if (window.innerWidth < 768) {
        window.scrollTo({ top: SCROLL_TOP_POSITION, behavior: 'smooth' })
      }
    },
  },
}
</script>
