<template>
  <select
    :id="id"
    class="
      block
      w-full
      h-[2.8125rem]
      leading-[1.875rem]
      py-2
      px-3
      bg-white
      border border-[#353D50]
      rounded-3xl
      focus:outline-none
      mobile:text-base
    "
    :class="classes"
    :value="value"
    @change="(e) => $emit('update:value', e.target.value)"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="bg-white text-black mobile:text-base"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'WSelect',
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
      type: [String, Number, Boolean, Object],
      default: '',
    },
    placeholder: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
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
  mounted() {
    this.attributes.map((value, key) => {
      return this.$refs.select.setAttribute(key, value)
    })
  },
}
</script>
