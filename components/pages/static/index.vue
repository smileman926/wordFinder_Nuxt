<template>
  <w-container classes="mt-5 mb-12">
    <h1 class="text-[3rem] leading-[57px]">{{ title }}</h1>
    <slice-zone
      v-if="slices.length > 0"
      class="pt-4"
      type="static"
      :slices="slices"
    />
    <content-placeholders v-else>
      <content-placeholders-text :lines="1" />
      <content-placeholders-img />
      <content-placeholders-img />
      <content-placeholders-img />
    </content-placeholders>
  </w-container>
</template>

<script>
import SliceZone from 'vue-slicezone'
import WContainer from '~/components/shared/w-container.vue'

export default {
  components: { WContainer, SliceZone },
  data() {
    return {
      page: null,
      slices: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    }
  },
  head() {
    return { title: this.page ? this.page.data.meta_title : '' }
  },
  computed: {
    title() {
      return this.page ? this.page.data.meta_title : ''
    },
  },
  mounted() {
    const uid = this.$route.path.replace('/', '')
    this.getPrismicByUID('static', uid).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
}
</script>
