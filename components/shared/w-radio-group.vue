<template>
  <fieldset :id="id">
    <legend v-if="label">{{ label }}</legend>
    <div
      v-for="(option, index) in options"
      :key="option.text"
      class="relative mt-2 first:mt-0"
    >
      <input
        :id="id + index"
        :name="id"
        type="radio"
        :value="option.value"
        :checked="option.value === value"
        class="hidden"
        :class="classes"
        :disabled="disabled"
        :required="required"
        @change="updateValue(option.value)"
      />
      <label
        :for="id + index"
        class="pl-[3.125rem] leading-[1.875rem] cursor-pointer"
      >
        <span
          :class="{ '!bg-seagreen-300': option.value === value }"
          class="
            absolute
            left-0
            top-1/2
            transform
            -translate-y-1/2
            w-[1.625rem]
            h-[1.625rem]
            border border-[7px] border-white
            rounded-[50%]
            bg-white
            shadow-radio
            transition-all
            duration-300
          "
        ></span>
        {{ option.text }}
      </label>
      <slot v-if="option.value === value" :name="option.value" />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'WRadioGroup',
  model: {
    event: 'change',
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    options: {
      type: [Array],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: [String, Object],
      default: '',
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('change', value)
    },
  },
}
</script>
