<template>
  <w-container classes="mobile:px-0">
    <div class="flex flex-wrap tablet:justify-center gap-5 mt-12 mb-14">
      <a
        v-for="(tool, index) in tools"
        :key="index"
        class="
          w-[49%]
          tablet:w-[540px]
          mobile:w-full
          h-[570px]
          inline-block
          flex flex-col
          border border-[#00000020]
          rounded
        "
        data-nuxt-link
        :href="`/tools/${tool.uid}`"
      >
        <div class="w-full h-[336px] rounded-t overflow-hidden object-fit">
          <prismic-image :field="tool.data.teaser_image" />
        </div>
        <div class="p-5">
          <p class="text-[1.25rem] text-[#353D50] leading-[22px]">
            {{ tool.data.meta_title }}
          </p>
          <p class="text-[18px] italic my-5">
            {{ tool.data.meta_description }}
          </p>
          <span
            class="text-[14px] text-[#007bff] bg-transparent hover:underline"
          >
            Use Tool
          </span>
        </div>
      </a>
    </div>
  </w-container>
</template>

<script>
import WContainer from '~/components/shared/w-container.vue'

export default {
  components: { WContainer },
  data() {
    return {
      tools: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      this.tools = this.$nuxt.context.payload.main.results
    }
  },
  head() {
    return { title: 'Tools for Words' }
  },
  mounted() {
    this.getPrismicByDocType('tool').then((response) => {
      this.tools = response.results
    })
  },
}
</script>
