<template>
  <div
    class="
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
      Sort Results
      <div class="absolute w-[3.25rem] h-px -bottom-1 bg-[#008942]"></div>
    </div>
    <WRadioGroup
      id="sort"
      v-model="word_sorting"
      :options="sortOptions"
      @change="(value) => dataChanged(value)"
    />
  </div>
</template>

<script>
import WRadioGroup from '~/components/shared/w-radio-group.vue'
import SortMixin from '~/components/pages/search/sort-mixin'

export default {
  name: 'SearchOptionSort',
  components: { WRadioGroup },
  mixins: [SortMixin],
}
</script>
