<template>
  <w-container classes="mt-4 mb-12 mobile:px-4">
    <div class="w-2/3 mobile:w-full">
      <h1 class="text-[3rem] leading-[57px]">{{ title }}</h1>
      <p class="text-[18px] my-4">{{ description }}</p>
      <slice-zone
        v-if="slices.length > 0"
        type="play_game_slice"
        :slices="slices"
      />
    </div>
  </w-container>
</template>

<script>
import SliceZone from 'vue-slicezone'
import WContainer from '~/components/shared/w-container.vue'

export default {
  components: {
    WContainer,
    SliceZone,
  },
  props: {
    page: {
      type: Object,
      default: null,
    },
    slices: {
      type: Array,
      default: () => [],
    },
  },
  head() {
    return { title: this.title }
  },
  computed: {
    title() {
      return this.page ? this.page.data.meta_title : ''
    },
    description() {
      return this.page ? this.page.data.meta_description : ''
    },
  },
}
</script>
