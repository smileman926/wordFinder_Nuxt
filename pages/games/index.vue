<template>
  <PageContent :games="games" />
</template>

<script>
import PageContent from '~/components/pages/games'

export default {
  components: {
    PageContent,
  },
  data() {
    return {
      games: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.games = this.$nuxt.context.payload.main.results
    }
  },
  head() {
    return { title: 'Free word games' }
  },
  mounted() {
    this.getPrismicByDocType('games').then((response) => {
      this.games = response.results
    })
  },
}
</script>
