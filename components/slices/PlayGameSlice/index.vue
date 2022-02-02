<template>
  <section
    class="
      section
      mb-4
      flex flex-row
      mobile:flex-col
      border border-[#C4C4C4]
      rounded
    "
  >
    <prismic-image
      class="w-1/2 mobile:w-3/4 mobile:mx-auto m-5 shadow-image"
      :field="slice.primary.teaserImage"
    />
    <a class="w-1/2 mobile:w-full p-5" :href="slice.primary.link">
      <div class="mb-4">{{ slice.primary.gameName }}</div>
      <div>{{ slice.primary.gameDescription }}</div>
      <div
        class="
          text-base text-[#007bff]
          hover:text-[#0056b3] hover:underline
          my-4
        "
      >
        Play {{ slice.primary.gameName }}
      </div>
    </a>
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
