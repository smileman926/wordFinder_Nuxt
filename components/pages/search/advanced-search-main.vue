<template>
  <div class="text-black mt-[1.3rem] p-2">
    <form @submit.prevent="onSubmit">
      <p v-if="listPage" class="text-[14px] text-white pb-2 leading-[21px]">
        Enter up to 15 letters and up to 2 wildcards (? or space).
      </p>
      <h3 class="mobile:text-[17px] leading-[1.5rem] text-white mb-5">
        Enter up to 3 wildcards (<u class="font-bold">?</u> or
        <u class="font-bold">space</u>)
      </h3>
      <div class="relative mx-auto max-w-[620px]">
        <MainSearchInput
          v-model="letters"
          classes="h-[3.75rem] mobile:h-[46px] px-4 py-px leading-[3rem] text-center text-[2rem] mobile:text-xl"
          button-classes="block"
          :is-valid="!showValidationError"
          :button-click="onSubmit"
          :clear-values="CLEAR_SEARCH_DATA"
        />
      </div>
      <div class="max-w-[430px] mx-auto mt-6 mobile:mt-5">
        <div class="bg-white shadow rounded-lg p-6 mobile:p-4">
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

          <WSelect
            v-model="dictionary"
            :options="dictionaryOptions"
            classes="mt-4 rounded-[5px]"
          />

          <w-button
            type="submit"
            classes="mt-4 w-full text-gray-700 text-[18px] leading-[22px] active:relative active:top-1 active:left-1 transition-all duration-300 ease"
          >
            SEARCH
          </w-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import MainSearchInput from '~/components/pages/search/main-search-input.vue'
import WInput from '~/components/shared/w-input.vue'
import WSelect from '~/components/shared/w-select.vue'
import WButton from '~/components/shared/w-button.vue'

import {
  generateSearchPath,
  mapOptionsFields,
  mapSearchFields,
  validate,
} from '~/helpers'
import { DICTIONARY_OPTIONS } from '~/config/constants'

export default {
  name: 'AdvancedSearchMain',
  components: { MainSearchInput, WInput, WSelect, WButton },
  props: {
    listPage: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dictionaryOptions: DICTIONARY_OPTIONS,
  }),
  computed: {
    ...mapGetters('words', ['showValidationError']),
    ...mapState('words', ['searchData', 'searchOptions']),
    ...mapSearchFields(),
    ...mapOptionsFields(['dictionary']),
  },
  methods: {
    ...mapMutations('words', [
      'SET_VALIDATION_ERROR',
      'SET_SEARCH_DATA',
      'SET_SEARCH_OPTIONS',
      'CLEAR_SEARCH_DATA',
    ]),
    onSubmit() {
      if (validate(this.searchData)) {
        localStorage.setItem('dictionary', this.searchOptions.dictionary)
        const path = generateSearchPath(this.searchData)
        this.$router.push({ path })
      } else {
        this.SET_VALIDATION_ERROR(true)
        setTimeout(() => {
          this.SET_VALIDATION_ERROR(false)
        }, 1000)
      }
    },
  },
}
</script>
