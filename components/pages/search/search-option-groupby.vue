<template>
  <div class="mobile:max-w-[52%]">
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
      <WCheckbox
        id="group-by-length"
        v-model="group_by_length"
        text="Group by Length"
        @change="(value) => dataChanged(value)"
      />
    </div>
    <div
      class="
        hidden
        mobile:flex
        items-center
        h-8
        px-3
        py-2
        rounded-3xl
        border border-white border-2
        text-white text-base
        whitespace-nowrap
      "
      @click="mobileDataChanged"
    >
      Group by Length &nbsp;
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          v-if="group_by_length"
          fill-rule="evenodd"
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import WCheckbox from '~/components/shared/w-checkbox.vue'

import { SCROLL_TOP_POSITION } from '~/config/constants'
import { mapOptionsFields } from '~/helpers'

export default {
  name: 'SearchOptionGroupBy',
  components: { WCheckbox },
  computed: {
    ...mapState('words', ['searchOptions']),
    ...mapOptionsFields(['group_by_length']),
  },
  methods: {
    ...mapMutations('words', ['SET_WORD_RESULTS', 'SET_SEARCH_OPTIONS']),
    ...mapActions('words', ['getOptionsResults']),
    async dataChanged(value) {
      this.SET_WORD_RESULTS({})
      await this.getOptionsResults()
      window.scrollTo({ top: SCROLL_TOP_POSITION, behavior: 'smooth' })
    },
    mobileDataChanged() {
      this.groupByLength = !this.groupByLength
      this.dataChanged(this.groupByLength)
    },
  },
}
</script>
