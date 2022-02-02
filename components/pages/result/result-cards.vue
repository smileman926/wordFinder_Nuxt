<template>
  <div>
    <slot name="topText"></slot>
    <ResultCard
      v-for="(wordPage, index) in wordPages"
      :key="`${index}-${Date.now()}`"
      :letters-length="wordPage.length"
      :words="wordPage.word_list"
      :has-more="wordPage.num_pages > 1"
      class="mb-40"
    />
    <modal
      name="word-definition"
      :classes="modalClass"
      :adaptive="true"
      :min-width="310"
      :max-width="768"
      height="auto"
      @opened="disableBodyScroll"
      @closed="enableBodyScroll"
    >
      <div
        class="
          flex
          justify-between
          items-center
          p-[15px]
          bg-seagreen-300
          text-white
        "
      >
        <label class="pt-[6px] text-[28px] font-bold">
          Definitions for
          <span
            class="
              pt-[0.3rem]
              pb-[0.2rem]
              px-1.5
              rounded
              bg-[#f7c342]
              text-[70%] text-[#212529]
              uppercase
            "
          >
            {{ currentWord }}
          </span>
        </label>
        <span
          class="py-[10px] ml-4 hover:cursor-pointer"
          @click="hideWordDefinition"
        >
          <CloseIcon width="20" height="20" />
        </span>
      </div>
      <div class="py-[20px] px-[10px]">
        <div v-if="isWordDetailLoading" class="loading mx-auto">
          <div
            class="
              absolute
              top-0
              left-0
              w-1/2
              h-1/2
              bg-seagreen-300
              rounded-tl-[100%]
            "
          ></div>
          <div
            class="
              absolute
              top-0
              left-0
              bottom-0
              right-0
              m-auto
              w-3/4
              h-3/4
              bg-[#ffc200]
              rounded-[50%]
            "
          ></div>
        </div>

        <div v-else class="text-left text-[#353D50]">
          <h6 class="text-[1.5rem] font-bold">Word Games</h6>
          <div class="text-[1rem]">
            Scrabble US/Canada (OTCWL)
            <span
              class="
                text-[70%] text-white
                rounded
                pt-[0.28rem]
                pb-[0.22rem]
                px-[0.4rem]
              "
              :class="isOTCWL ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
            >
              {{ isOTCWL ? 'Yes' : 'No' }}
            </span>
          </div>
          <div class="text-[1rem]">
            Scrabble UK (SOWPODS)
            <span
              class="
                text-[70%] text-white
                rounded
                pt-[0.28rem]
                pb-[0.22rem]
                px-[0.4rem]
              "
              :class="isSOWPODS ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
            >
              {{ isSOWPODS ? 'Yes' : 'No' }}
            </span>
          </div>
          <div class="text-[1rem]">
            Words With Friends
            <span
              class="
                text-[70%] text-white
                rounded
                pt-[0.28rem]
                pb-[0.22rem]
                px-[0.4rem]
              "
              :class="isWWF ? 'bg-[#28a745]' : 'bg-[#dc3545]'"
            >
              {{ isWWF ? 'Yes' : 'No' }}
            </span>
          </div>
          <div v-if="words">
            <div
              v-for="(definition, index) in words.definitions"
              :key="index"
              class="border border-[#00000020] rounded mt-4"
            >
              <div
                class="
                  bg-[#00000008]
                  border-b border-[#00000020]
                  p-2
                  text-[1.5rem]
                  italic
                "
              >
                {{ definition.part_of_speech }}
              </div>
              <div class="px-2">
                <div v-if="definition.text" class="py-2">
                  <span
                    class="
                      text-[70%] text-white
                      font-bold
                      capitalize
                      rounded
                      pt-[0.28rem]
                      pb-[0.22rem]
                      px-[0.4rem]
                      bg-[#28a745]
                    "
                  >
                    definitions
                  </span>
                  <p class="mt-4 text-[18px] font-bold">
                    {{ definition.text }}
                  </p>
                </div>
                <div v-if="definition.synonyms" class="py-2">
                  <span
                    class="
                      text-[70%] text-[#212529]
                      font-bold
                      capitalize
                      rounded
                      pt-[0.28rem]
                      pb-[0.22rem]
                      px-[0.4rem]
                      bg-[#ffc107]
                    "
                  >
                    synonyms
                  </span>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <nuxt-link
                      v-for="(synonym, synonymIndex) in definition.synonyms"
                      :key="synonymIndex"
                      class="
                        bg-[#E3E3E3]
                        text-[#353D50] text-[1rem]
                        leading-none
                        border border-[#B8B8B8]
                        pt-[5px]
                        pb-[3px]
                        px-1
                        rounded-tr-lg rounded-bl-lg
                        hover:cursor-pointer
                      "
                      :to="`/words-for/${synonym}`"
                    >
                      {{ synonym }}
                    </nuxt-link>
                  </div>
                </div>
                <div v-if="definition.examples" class="py-2">
                  <span
                    class="
                      text-[70%] text-white
                      font-bold
                      capitalize
                      rounded
                      py-1
                      px-[0.4rem]
                      bg-[#17a2b8]
                    "
                  >
                    examples
                  </span>
                  <p
                    v-for="(example, exampleIndex) in definition.examples"
                    :key="exampleIndex"
                    class="italic text-[1rem] pl-2"
                  >
                    - {{ example }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ResultCard from '~/components/pages/result/result-card.vue'
import CloseIcon from '~/assets/icons/x-circle.svg?inline'

import { WORD_COUNT_PER_PAGE } from '~/config/constants'

export default {
  name: 'ResultCards',
  components: { ResultCard, CloseIcon },
  props: {
    title: {
      type: String,
      default: '',
    },
    textTop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      wordCountPerPage: WORD_COUNT_PER_PAGE,
    }
  },
  computed: {
    ...mapGetters({
      wordPages: 'words/wordPages',
      currentWord: 'words/currentWord',
      wordDetail: 'words/wordDetail',
      isWordDetailLoading: 'words/isWordDetailLoading',
    }),
    wordPages() {
      return this.$store.getters['words/wordPages']
    },
    isOTCWL() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('otcwl')
    },
    isSOWPODS() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('sowpods')
    },
    isWWF() {
      if (!this.wordDetail) return false
      return this.wordDetail.dictionary.dictionaries.includes('wwf')
    },
    words() {
      if (!this.wordDetail) return []
      return this.wordDetail.words
    },
    modalClass() {
      const classes = [
        'text-center',
        'text-black',
        '!overflow-y-auto',
        '!top-1/2',
        '!left-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'inline-block',
      ]
      if (this.isWordDetailLoading) classes.push('!w-auto !h-[180px]')
      else classes.push('!w-[768px] mobile:!w-auto')

      return classes
    },
  },
  methods: {
    ...mapActions({
      hideModal: 'words/hideModal',
    }),
    hideWordDefinition() {
      this.hideModal('word-definition')
    },
    disableBodyScroll() {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    },
    enableBodyScroll() {
      document.getElementsByTagName('body')[0].style.overflow = 'unset'
    },
  },
}
</script>

<style lang="scss" scoped>
.loading {
  width: 70px;
  height: 70px;
  background: linear-gradient(
    to right,
    #57bd91 10%,
    rgba(255, 255, 255, 0) 42%
  );
  border-radius: 50%;
  position: relative;
  animation: load 1.4s infinite linear;
  transform: translateZ(0);
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
