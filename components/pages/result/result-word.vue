<template>
  <span
    class="
      bg-[#E3E3E3]
      text-[#353D50] text-2xl
      border border-[#B8B8B8]
      p-1
      mobile:px-3
      rounded-tr-lg rounded-bl-lg
      hover:cursor-pointer
    "
    :class="classes"
    @click="showWordDefinition"
  >
    <span v-html="wordString"></span
    ><sub v-if="word.points" class="text-xs">{{ word.points }}</sub>
  </span>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ResultWord',
  props: {
    word: {
      type: Object,
      default: () => {},
    },
    classes: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      wildSearch: false,
    }
  },
  computed: {
    ...mapGetters({
      currentWord: 'words/currentWord',
      isWildSearch: 'words/isWildSearch',
      letters: 'words/letters',
    }),
    wordString() {
      return this.styleWord()
    },
  },
  methods: {
    ...mapMutations({
      setCurrentWord: 'words/SET_CURRENT_WORD',
    }),
    ...mapActions({
      showModal: 'words/showModal',
      getDefinition: 'words/getDefinition',
    }),
    showWordDefinition() {
      if (this.currentWord !== this.word.word) {
        this.setCurrentWord(this.word.word)
        this.getDefinition({ word: this.word.word })
      }
      this.showModal('word-definition')
    },
    styleWord() {
      if (this.word.wildcards.length > 0) {
        let start = 0
        let result = ''
        this.word.wildcards.forEach((wildcard) => {
          result += this.word.word.slice(start, wildcard)
          result += `<span style="color: #ce0000;">${this.word.word.slice(
            wildcard,
            wildcard + 1
          )}</span>`
          start = wildcard + 1
        })
        result += this.word.word.slice(start, this.word.word.length)
        return result
      } else {
        return this.word.word
      }
    },
  },
}
</script>
