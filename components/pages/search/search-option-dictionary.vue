<template>
  <div class="mobile:max-w-[45%]">
    <div
      class="
        mobile:hidden
        bg-white
        border border-[#C4C4C4]
        shadow
        rounded-[0.625rem]
        p-5
        mb-4
        text-[#353D50]
      "
    >
      <div class="relative text-[1.5rem] leading-[1.8125rem] mb-4">
        Dictionary
        <div class="absolute w-[3.25rem] h-px -bottom-1 bg-[#008942]"></div>
      </div>
      <WRadioGroup
        id="dictionary"
        v-model="dictionary"
        :options="sortOptions"
        @change="(value) => dataChanged(value)"
      />
    </div>
    <div
      class="
        hidden
        mobile:block
        relative
        border border-white border-2
        rounded-3xl
        text-white
      "
    >
      <WSelect
        v-model="dictionary"
        :options="sortOptions"
        classes="bg-seagreen-300 mobile:h-7 text-white opacity-0 relative z-10"
        :placeholder="true"
        @update:value="(value) => dataChanged(value)"
      />
      <span
        class="
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          text-base
          uppercase
        "
      >
        {{ dictionary }}
      </span>
      <DownArrowIcon
        class="absolute top-1/2 right-1.5 transform -translate-y-1/2"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import WRadioGroup from '~/components/shared/w-radio-group.vue'
import WSelect from '~/components/shared/w-select.vue'
import DownArrowIcon from '~/assets/icons/down-arrow.svg?inline'

import { DICTIONARY_OPTIONS, SCROLL_TOP_POSITION } from '~/config/constants'
import { mapOptionsFields } from '~/helpers'

export default {
  name: 'SearchOptionDictionary',
  components: { WRadioGroup, WSelect, DownArrowIcon },
  data() {
    return {
      sortOptions: DICTIONARY_OPTIONS,
    }
  },
  computed: {
    ...mapState('words', ['searchOptions']),
    ...mapOptionsFields(['dictionary']),
  },
  methods: {
    ...mapMutations('words', ['SET_WORD_RESULTS', 'SET_SEARCH_OPTIONS']),
    ...mapActions('words', ['getOptionsResults']),
    async dataChanged(value) {
      this.SET_WORD_RESULTS({})
      await this.getOptionsResults()
      window.scrollTo({ top: SCROLL_TOP_POSITION, behavior: 'smooth' })
    },
  },
}
</script>
