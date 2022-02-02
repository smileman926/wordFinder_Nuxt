<template>
  <w-container classes="mobile:px-0">
    <div
      class="
        flex flex-wrap
        tablet:justify-center
        gap-5
        mt-12
        mb-14
        w-2/3
        mobile:w-full
      "
    >
      <a
        v-for="(game, index) in games"
        :key="index"
        class="
          w-[48%]
          tablet:w-[540px]
          mobile:w-full
          inline-block
          flex flex-col
          border border-[#00000020]
          rounded
        "
        data-nuxt-link
        :href="`/games/${game.uid}`"
      >
        <div class="p-5">
          <p class="text-[1.25rem] text-[#353D50] leading-[22px]">
            {{ game.data.meta_title }}
          </p>
          <p class="text-[18px] italic my-5">
            {{ game.data.meta_description }}
          </p>
          <span
            class="text-[14px] text-[#007bff] bg-transparent hover:underline"
          >
            Play Game
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
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
