<template>
  <div class="w-full transition-opacity duration-300">
    <div class="mobile:hidden">
      <SearchOptionSort />
      <SearchOptionGroupBy />
      <SearchOptionDictionary />
    </div>
    <div class="hidden mobile:flex justify-between px-4 py-2 bg-seagreen-300">
      <SearchOptionDictionary />
      <SearchOptionGroupBy />
    </div>
  </div>
</template>

<script>
import SearchOptionDictionary from '~/components/pages/search/search-option-dictionary.vue'
import SearchOptionGroupBy from '~/components/pages/search/search-option-groupby.vue'
import SearchOptionSort from '~/components/pages/search/search-option-sort-desktop.vue'

export default {
  name: 'AdvancedSearchOptions',
  components: { SearchOptionDictionary, SearchOptionGroupBy, SearchOptionSort },
  data() {
    return {
      lastScrollTop: 0,
      delta: 5,
      transitionClasses: '',
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.setPositionSearchOptions)
  },
  methods: {
    setPositionSearchOptions() {
      const nowScrollTop = document.documentElement.scrollTop
      if (Math.abs(this.lastScrollTop - nowScrollTop) > this.delta) {
        if (nowScrollTop > this.lastScrollTop) {
          this.transitionClasses = 'mobile:opacity-0'
        } else if (nowScrollTop <= 290) {
          this.transitionClasses = 'mobile:opacity-1'
        } else {
          this.transitionClasses = 'mobile:opacity-1 mobile:fixed top-16'
        }
        this.lastScrollTop = nowScrollTop
      }
    },
  },
}
</script>
