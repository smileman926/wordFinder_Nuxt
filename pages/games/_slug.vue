<template>
  <PageContent :page="page" :slices="slices" />
</template>

<script>
import PageContent from '~/components/pages/games/game.vue'

export default {
  components: {
    PageContent,
  },
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
  mounted() {
    const slug = this.$route.params.slug
    this.getPrismicByUID('games', slug).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
}
</script>
