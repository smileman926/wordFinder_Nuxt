import { mapMutations, mapActions, mapState } from 'vuex'
import { SCROLL_TOP_POSITION, SORT_OPTIONS } from '~/config/constants'
import { mapOptionsFields } from '~/helpers'

export default {
  data() {
    return {
      sortOptions: SORT_OPTIONS,
    }
  },
  computed: {
    selectedText() {
      const selectedOption = this.sortOptions.find((option) => {
        return option.value === this.wordSorting
      })

      return selectedOption ? selectedOption.text : ''
    },
    ...mapState('words', ['searchOptions']),
    ...mapOptionsFields(['word_sorting']),
  },
  methods: {
    ...mapMutations('words', ['SET_SEARCH_OPTIONS', 'SET_WORD_RESULTS']),
    ...mapActions('words', ['getOptionsResults']),
    async dataChanged(value) {
      this.SET_WORD_RESULTS({})
      await this.getOptionsResults()
      window.scrollTo({ top: SCROLL_TOP_POSITION, behavior: 'smooth' })
    },
  },
}
