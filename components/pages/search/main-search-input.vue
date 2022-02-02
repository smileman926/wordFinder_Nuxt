<template>
  <div class="block mobile:block">
    <input
      class="
        px-[13px]
        py-[7px]
        rounded-[32px]
        focus:outline-none
        w-full
        uppercase
        placeholder-[#D3D3D3]
      "
      :class="{
        [classes]: true,
        'placeholder-red-600': !isValid,
      }"
      :maxlength="maxLength"
      placeholder="YOUR LETTERS"
      data-lpignore="true"
      :value="value"
      @keyup="(e) => updateValue(e)"
      @keypress="(e) => ignoreNumber(e)"
      @focus="(e) => $emit('focus', e)"
    />
    <button
      class="
        absolute
        w-[60px]
        h-full
        left-0
        top-0
        rounded-l-[32px]
        flex
        items-center
        px-[20px]
        focus:outline-none
      "
      :class="{ 'bg-[#f7c342]': isTyped, [buttonClasses]: true }"
      @click="buttonClick"
    >
      <SearchIcon />
    </button>
    <CloseIcon
      v-if="isTyped"
      class="
        absolute
        right-[10px]
        top-1/2
        w-5
        h-5
        transform
        -translate-y-1/2
        hover:cursor-pointer
      "
      @click="clearValue"
    />
  </div>
</template>

<script>
import SearchIcon from '~/assets/icons/search.svg?inline'
import CloseIcon from '~/assets/icons/x-circle-fill.svg?inline'

export default {
  name: 'MainSearchInput',
  components: { SearchIcon, CloseIcon },
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: String,
      default: '15',
    },
    buttonClasses: {
      type: String,
      default: '',
    },
    buttonClick: {
      type: Function,
      default: () => {},
    },
    clearValues: {
      type: Function,
      default: () => {},
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isTyped: !!this.$props.value,
    }
  },
  watch: {
    value(newValue) {
      this.isTyped = !!newValue
    },
  },
  methods: {
    updateValue(e) {
      let inputString = e.target.value

      inputString = inputString.replace(/\s/g, '?')
      inputString = inputString.replace(/\*/g, '?')
      this.$emit('update:value', inputString)
    },
    clearValue() {
      this.$emit('update:value', '')
      this.$emit('focus')
      this.clearValues()
    },
    ignoreNumber(e) {
      const charCode = e.which ? e.which : e.keyCode
      const questionLength = (e.target.value.match(/\?/g) || []).length
      if (
        questionLength === 3 &&
        (charCode === 32 || charCode === 42 || charCode === 63)
      ) {
        e.preventDefault()
      } else if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        return true
      } else if (charCode === 13) {
        return true
      } else {
        e.preventDefault()
      }
    },
  },
}
</script>
