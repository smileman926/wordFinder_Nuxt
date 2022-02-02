<template>
  <div>
    <MenuCard
      class="mb-8"
      title="Word Finder"
      :items="wordfinders"
      :content-relationship="false"
      :display-count="10"
    />
    <MenuCard
      class="mb-8"
      title="Play Games"
      :items="games"
      :content-relationship="false"
    />
    <MenuCard
      class="mb-8"
      title="Dictionaries"
      :items="dictionaries"
      :content-relationship="false"
    />
    <MenuCard
      class="mb-8"
      title="List of Words"
      :items="listOfWords"
      :content-relationship="false"
    />
    <MenuCard
      class="mb-8"
      title="Words by Length"
      :items="wordsByLength"
      :content-relationship="false"
    />
    <BlogCard
      title="Blog"
      :items="articles"
      :content-relationship="false"
      direction="vertical"
    />
  </div>
</template>

<script>
import MenuCard from '~/components/pages/home/menu-card.vue'
import BlogCard from '~/components/pages/home/blog-card.vue'

export default {
  name: 'AdvancedSearchOptions',
  components: { MenuCard, BlogCard },
  data() {
    return {
      articles: [],
      wordfinders: [],
      games: [],
      dictionaries: [],
      listOfWords: [],
      wordsByLength: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      const lists = this.$nuxt.context.payload.lists
      this.articles = lists.articles.results
      this.wordfinders = lists.wordfinders.results
      this.games = lists.games.results
      this.dictionaries = lists.dictionaries.results
      this.listOfWords = lists.listOfWords.results
      this.wordsByLength = lists.wordsByLength.results
    }
  },
  mounted() {
    this.getPrismicByDocType('article', { pageSize: 100 }).then((response) => {
      this.articles = response.results
    })
    this.getPrismicByDocType('search', { pageSize: 100 }).then((response) => {
      this.wordfinders = response.results
    })
    this.getPrismicByDocType('games').then((response) => {
      this.games = response.results
    })
    this.getPrismicByDocType('dictionary').then((response) => {
      this.dictionaries = response.results
    })
    this.getPrismicByDocType('list').then((response) => {
      this.listOfWords = response.results
    })
    this.getPrismicByDocType('words-by-length').then((response) => {
      this.wordsByLength = response.results
    })
  },
}
</script>
