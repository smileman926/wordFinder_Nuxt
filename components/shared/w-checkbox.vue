<template>
  <fieldset>
    <div class="relative">
      <input
        :id="id"
        :name="id"
        type="checkbox"
        :checked="value"
        class="hidden"
        :class="classes"
        :disabled="disabled"
        :required="required"
        @click="(e) => updateValue(e)"
      />
      <label :for="id" class="pl-[3.125rem] leading-[1.875rem] cursor-pointer">
        <span
          :class="{ '!bg-seagreen-300': value }"
          class="
            absolute
            left-0
            top-1/2
            transform
            -translate-y-1/2
            w-[1.625rem]
            h-[1.625rem]
            border border-[7px] border-white
            bg-white
            shadow-radio
            transition-all
            duration-300
          "
        ></span>
        {{ text }}
      </label>
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
    text: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
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
    updateValue(e) {
      this.$emit('change', e.target.checked)
    },
  },
}
</script>
