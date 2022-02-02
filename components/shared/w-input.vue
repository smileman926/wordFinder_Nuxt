<template>
  <div class="relative">
    <input
      :id="id"
      ref="input"
      class="
        w-full
        leading-[1.875rem]
        rounded-3xl
        py-[7px]
        pr-[27px]
        pl-[8px]
        focus:outline-none
        border border-gray-700
        uppercase
      "
      :class="{ classes: true, 'border-[#005a9c]': isActive }"
      :placeholder="placeholder"
      :value="value"
      data-lpignore="true"
      @input="(e) => updateValue(e)"
      @keypress="(e) => validateValue(e)"
      @focus="onFocus"
      @focusout="onFocusOut"
    />
    <span
      class="
        absolute
        left-[9px]
        top-1/2
        transform
        -translate-y-1/2
        bg-white
        text-[1.25rem] text-[#232427]
        mobile:text-[1rem]
        leading-[25px]
        transition
        duration-200
      "
      :class="{ '!top-0 left-3 px-[3px] text-[1rem] text-[#005a9c]': isActive }"
      @click="
        () => {
          $refs.input.focus()
        }
      "
    >
      {{ label }}
    </span>
    <span
      v-if="!isTyped"
      v-click-outside="hideHint"
      class="
        absolute
        w-[20px]
        h-[20px]
        right-[5px]
        top-1/2
        transform
        -translate-y-1/2
        text-[#C4C4C4]
        hover:text-black
        transition-all
        duration-300
      "
      @click="showHint"
    >
      <QuestionIcon />
    </span>
    <span
      v-if="isTyped"
      class="
        absolute
        w-5
        mobile:w-4
        h-5
        mobile:h-4
        right-[5px]
        top-1/2
        transform
        -translate-y-1/2
        hover:cursor-pointer
      "
      @click="clearValue"
    >
      <CloseIcon />
    </span>
    <p
      v-if="isShowHint"
      class="
        absolute
        text-xs text-white text-center
        w-[180px]
        mobile:w-[150px]
        right-[1rem]
        mobile:left-auto mobile:right-0
        bottom-[42px]
        transform
        translate-x-1/2
        mobile:translate-x-0
        z-10
        px-1.5
        py-2.5
        bg-black bg-opacity-80
      "
    >
      <slot name="hint"></slot>
      <span
        class="
          border-t-[5px] border-r-[5px] border-b-0 border-l-[5px] border-solid
          absolute
          w-0
          h-0
          left-1/2
          mobile:left-auto mobile:right-2.5
          top-full
          ml-[-5px]
        "
        style="
          border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        "
      ></span>
    </p>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import QuestionIcon from '~/assets/icons/question.svg?inline'
import CloseIcon from '~/assets/icons/x-circle-fill.svg?inline'

export default {
  name: 'WInput',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: { QuestionIcon, CloseIcon },
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    classes: {
      type: [String, Object],
      default: '',
    },
    attributes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isTyped: !!this.$props.value,
      isShowHint: false,
      isActive: !!this.$props.value,
    }
  },
  watch: {
    value(newValue) {
      this.isTyped = this.isActive = !!newValue
    },
  },
  mounted() {
    this.attributes.map((value, key) => {
      return this.$refs.input.setAttribute(key, value)
    })
  },
  methods: {
    updateValue(e) {
      this.$emit('update:value', e.target.value)
    },
    clearValue() {
      this.$emit('update:value', '')
      this.isActive = false
    },
    onFocus() {
      this.isActive = true
    },
    onFocusOut() {
      this.isActive = this.isTyped
    },
    showHint() {
      this.isShowHint = true
    },
    hideHint() {
      this.isShowHint = false
    },
    validateValue(e) {
      const charCode = e.which ? e.which : e.keyCode

      if (this.type === 'letter') {
        if (
          (charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && charCode <= 122) ||
          charCode === 13
        ) {
          return true
        } else {
          e.preventDefault()
        }
      } else if (this.type === 'digit') {
        if ((charCode >= 48 && charCode <= 57) || charCode === 13) {
          return true
        } else {
          e.preventDefault()
        }
      }
    },
  },
}
</script>
