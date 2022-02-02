<template>
  <w-container classes="mt-4 mb-12 mobile:px-4">
    <div v-if="isPasswordGenerator">
      <div class="border rounded p-5 mb-5">
        <h1 class="text-[3rem] leading-[1.2] mb-2">{{ title }}</h1>
        <label class="inline-block text-[14px] mb-2">Length</label>
        <div class="relative mb-5">
          <input
            id="length"
            v-model="passwordOption.length"
            class="
              w-full
              border
              focus:outline-none
              text-[1rem]
              px-[0.75rem]
              py-[0.375rem]
              leading-[24px]
              mb-4
            "
            type="number"
          />
          <p
            class="
              absolute
              left-0
              bottom-0
              translate-y-full
              text-[12px] text-[#6c757d]
              mt-1
              mb-5
            "
          >
            Select word length to be used.
          </p>
        </div>
        <div class="flex">
          <div class="w-1/2">
            <section class="flex gap-px items-center pl-5 mb-2">
              <label
                for="special_chars"
                class="text-[14px] leading-[21px] font-bold"
              >
                Special chars
              </label>
              <input
                id="special_chars"
                v-model="passwordOption.specialChars"
                type="checkbox"
              />
            </section>
            <section class="flex gap-px items-center pl-5 mb-2">
              <label for="numbers" class="text-[14px] leading-[21px] font-bold">
                Numbers
              </label>
              <input
                id="numbers"
                v-model="passwordOption.numbers"
                type="checkbox"
              />
            </section>
          </div>
          <div class="w-1/2">
            <section class="flex gap-px items-center pl-5 mb-2">
              <label for="uppercase" class="text-[14px] leading-[21px]">
                Uppercase
              </label>
              <input
                id="uppercase"
                v-model="passwordOption.uppercase"
                type="checkbox"
              />
            </section>
            <section class="flex gap-px items-center pl-5 mb-2">
              <label
                for="tricky_chars"
                class="text-[14px] leading-[21px] whitespace-nowrap"
              >
                Exclude tricky chars
              </label>
              <input
                id="tricky_chars"
                v-model="passwordOption.trickyChars"
                type="checkbox"
              />
            </section>
          </div>
        </div>
        <span
          class="
            uppercase
            text-[14px]
            py-px
            hover:text-white hover:bg-[#60d02d] hover:cursor-pointer
          "
          @click="generatePassword"
        >
          Generate Password
        </span>
      </div>
      <div v-if="isGenerated" class="text-[14px] border p-5 mb-5">
        {{ password }}
      </div>
    </div>
    <div v-else-if="isUsernameGenerator">
      <div class="border rounded p-5 mb-5">
        <div class="flex gap-1 justify-between items-center">
          <div class="w-1/3 mobile:w-full whitespace-nowrap">
            <label class="text-[14px]">Length</label>
            <select class="bg-white border p-2 rounded focus:outline-none">
              <option value=""></option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>
          <div class="w-1/3 mobile:w-full">
            <section class="flex gap-px items-center">
              <label for="numbers" class="text-[14px] leading-[21px]">
                Numbers
              </label>
              <input id="numbers" name="numbers" type="checkbox" />
            </section>
          </div>
          <div class="w-1/3 mobile:w-full">
            <span class="uppercase text-[14px] hover:cursor-pointer">
              Submit
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isWordGenerator">
      <div class="border rounded p-5 pb-10 mb-5">
        <h1 class="text-[3rem] leading-[1.2] mb-2">{{ title }}</h1>
        <div class="flex">
          <div class="w-1/2 mobile:w-full pl-52">
            <div class="flex justify-between items-start mb-2">
              <label class="text-[14px] w-1/2">Number of Words:</label>
              <select
                v-model="wordOption.numberOfWords"
                class="
                  w-1/2
                  bg-white
                  border
                  focus:border-[#5cb85c]
                  p-2
                  rounded
                  focus:outline-none
                  text-[1rem]
                "
              >
                <option
                  v-for="(value, index) in Array(50)"
                  :key="index"
                  :value="index + 1"
                >
                  {{ index + 1 }}
                </option>
              </select>
            </div>
            <div class="flex justify-between items-start mb-2">
              <label class="text-[14px] w-1/2">Length:</label>
              <select
                v-model="wordOption.length"
                class="
                  w-1/2
                  bg-white
                  border
                  focus:border-[#5cb85c]
                  p-2
                  rounded
                  focus:outline-none
                  text-[1rem]
                "
              >
                <option value="Any">Any</option>
                <option
                  v-for="(value, index) in Array(29)"
                  :key="index"
                  :value="index + 2"
                >
                  {{ index + 2 }}
                </option>
              </select>
            </div>
            <div class="flex justify-between items-start mb-2">
              <label class="text-[14px] w-1/2">First Letter:</label>
              <input
                v-model="wordOption.firstLetter"
                class="
                  w-1/2
                  border
                  focus:border-[#5cb85c]
                  p-0.5
                  pl-2
                  focus:outline-none
                  text-[1rem]
                "
              />
            </div>
            <div class="flex justify-between items-start">
              <label class="text-[14px] w-1/2">Last Letter:</label>
              <input
                v-model="wordOption.lastLetter"
                class="
                  w-1/2
                  border
                  focus:border-[#5cb85c]
                  p-0.5
                  pl-2
                  focus:outline-none
                  text-[1rem]
                "
              />
            </div>
          </div>
          <div class="w-1/2 mobile:w-full pl-24">
            <label class="block text-[14px] mb-2">Word Type:</label>
            <div class="flex gap-2 items-center">
              <input
                id="any"
                v-model="wordType.any"
                type="checkbox"
                :disabled="!wordTypeChecked"
                @change="wordTypeChanged('any')"
              />
              <label for="any" class="text-[14px] leading-[21px]">Any</label>
            </div>
            <div class="flex gap-2 items-center">
              <input
                id="noun"
                v-model="wordType.noun"
                type="checkbox"
                @change="wordTypeChanged('noun')"
              />
              <label for="noun" class="text-[14px] leading-[21px]">Noun</label>
            </div>
            <div class="flex gap-2 items-center">
              <input
                id="verb"
                v-model="wordType.verb"
                type="checkbox"
                @change="wordTypeChanged('verb')"
              />
              <label for="verb" class="text-[14px] leading-[21px]">Verb</label>
            </div>
            <div class="flex gap-2 items-center">
              <input
                id="adjective"
                v-model="wordType.adjective"
                type="checkbox"
                @change="wordTypeChanged('adjective')"
              />
              <label for="adjective" class="text-[14px] leading-[21px]">
                Adjective
              </label>
            </div>
            <span
              class="
                inline-block
                uppercase
                text-[14px]
                mt-8
                py-px
                hover:cursor-pointer
              "
              @click="generateWords"
            >
              Generate Words
            </span>
          </div>
        </div>
      </div>
      <div v-if="isGenerated" class="border px-5 py-8 mb-5">
        <p class="text-[18px] font-bold">random</p>
      </div>
    </div>
    <slice-zone v-if="slices.length > 0" type="search" :slices="slices" />
  </w-container>
</template>

<script>
import SliceZone from 'vue-slicezone'
import WContainer from '~/components/shared/w-container.vue'

const TRICKY_CHARS = {
  l: ['I'],
  I: ['l'],
}

const passwordGenerators = {
  lowercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  specialChars: () => {
    const symbols = '~!@#$%^&*()_+{}":?><;.,'
    return symbols[Math.floor(Math.random() * symbols.length)]
  },
  uppercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  numbers: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
}

export default {
  components: { WContainer, SliceZone },
  data() {
    return {
      page: null,
      slices: [],
      isGenerated: false,
      password: '',
      passwordOption: {
        length: '',
        specialChars: false,
        numbers: false,
        uppercase: false,
        trickyChars: false,
      },
      wordOption: {
        numberOfWords: '',
        length: '',
        firstLetter: '',
        lastLetter: '',
        wordType: '',
      },
      wordType: {
        any: true,
        noun: false,
        verb: false,
        adjective: false,
      },
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.page = this.$nuxt.context.payload.main.results[0]
      this.slices = this.page.data.body
    }
  },
  head() {
    return { title: this.title }
  },
  computed: {
    title() {
      let title = ''
      if (this.page) {
        title = this.page.data.keywords
          .split(', ')[0]
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
          })
          .join(' ')
      }

      return title
    },
    isPasswordGenerator() {
      return this.$route.params.slug === 'random-password-generator'
    },
    isUsernameGenerator() {
      return this.$route.params.slug === 'random-username-generator'
    },
    isWordGenerator() {
      return this.$route.params.slug === 'random-word-generator'
    },
    wordTypeChecked() {
      return this.wordType.noun || this.wordType.verb || this.wordType.adjective
    },
  },
  mounted() {
    const slug = this.$route.params.slug
    this.getPrismicByUID('tool', slug).then((response) => {
      this.page = response.results[0]
      this.slices = this.page.data.body
    })
  },
  methods: {
    generatePassword() {
      this.password = ''
      const { length, trickyChars, ...rest } = this.passwordOption
      const generatorsToApply = Object.keys(rest).filter(
        (key) => this.passwordOption[key]
      )
      generatorsToApply.push('lowercase')
      const generatorsSize = generatorsToApply.length

      while (this.password.length < parseInt(length)) {
        const symbol =
          passwordGenerators[
            generatorsToApply[Math.floor(Math.random() * generatorsSize)]
          ]()
        if (trickyChars && TRICKY_CHARS[symbol]) {
          if (TRICKY_CHARS[symbol].some((s) => this.password.includes(s))) {
            continue
          }
        }

        this.password += symbol
      }

      this.isGenerated = true
    },
    generateWords() {
      this.isGenerated = true
    },
    wordTypeChanged(type) {
      if (this.wordType[type]) {
        if (type === 'any') {
          this.wordType.noun =
            this.wordType.verb =
            this.wordType.adjective =
              false
        } else {
          this.wordType.any = false
        }
        this.wordOption.wordType = type
      }
      if (!this.wordTypeChecked) {
        this.wordOption.wordType = ''
        this.wordType.any = true
      }
    },
  },
}
</script>
