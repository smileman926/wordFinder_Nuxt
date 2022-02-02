<template>
  <section class="p-16 mb-4 border border-[#00000020] rounded">
    <prismic-rich-text
      v-if="slice.primary.introText"
      :field="slice.primary.introText"
    />
    <prismic-rich-text
      v-if="slice.primary.outroText"
      :field="slice.primary.outroText"
    />

    <div
      v-for="(item, i) in slice.items"
      :key="`slice-item-${i}`"
      class="py-6 border-b border-[#E5E5E5]"
      :class="{ 'border-none': i == slice.items.length - 1 }"
    >
      <a
        class="text-[21px] hover:text-[#0056b3] font-bold inline-block mb-4"
        :href="item.link"
      >
        {{ item.itemTitle }}
      </a>
      <prismic-rich-text class="text-left" :field="item.listItem" />
      <a
        class="
          text-[18px] text-[#007bff]
          hover:text-[#0056b3]
          inline-block
          mb-4
        "
        :href="item.link"
      >
        {{ item.link }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>
