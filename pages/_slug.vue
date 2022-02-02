<template>
  <component :is="currentPage"></component>
</template>

<script>
import SearchIndex from '~/components/pages/search-index'
import Article from '~/components/pages/article'

export default {
  components: {
    SearchIndex,
    Article,
  },
  computed: {
    isArticlePage() {
      return (
        this.$route.query.page_type && this.$route.query.page_type === 'article'
      )
    },
    currentPage() {
      let currentPage = ''

      if (this.isArticlePage) currentPage = 'Article'
      else currentPage = 'SearchIndex'

      return currentPage
    },
  },
}
</script>
