<template>
  <div
    class="
      hidden
      mobile:block
      relative
      border border-white border-2
      rounded-3xl
      text-white text-base
      font-normal
    "
  >
    <WSelect
      v-model="word_sorting"
      :options="sortOptions"
      classes="bg-seagreen-300 w-32 mobile:h-7 text-white opacity-0 relative z-10 mobile:pl-[40%]"
      :placeholder="true"
      @update:value="(value) => dataChanged(value)"
    />
    <SortDownIcon
      class="absolute top-1/2 left-1.5 transform -translate-y-1/2"
    />
    <span
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        whitespace-nowrap
      "
    >
      Sort: {{ selectedText }}
    </span>
    <DownArrowIcon
      class="absolute top-1/2 right-1.5 transform -translate-y-1/2"
    />
  </div>
</template>

<script>
import WSelect from '~/components/shared/w-select.vue'
import SortMixin from '~/components/pages/search/sort-mixin'
import DownArrowIcon from '~/assets/icons/down-arrow.svg?inline'
import SortDownIcon from '~/assets/icons/sort-down-white.svg?inline'

export default {
  name: 'SearchOptionSortMobile',
  components: { WSelect, DownArrowIcon, SortDownIcon },
  mixins: [SortMixin],
}
</script>
