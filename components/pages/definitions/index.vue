<template>
  <w-container classes="pt-5 pb-12 mobile:px-0 mobile:pt-0">
    <div
      class="
        grid grid-cols-6
        mobile:grid-cols-12
        gap-4
        text-[18px]
        leading-[27px]
      "
    >
      <div class="col-span-4 tablet:col-span-3 mobile:col-span-full">
        <div
          class="
            p-5
            mobile:px-5 mobile:py-0
            border border-[#c4c4c4]
            rounded-[0.25rem]
            mb-4
          "
        >
          <h1 class="text-[3rem] mobile:text-[1.25rem] leading-[58px] mb-4">
            {{ title }}
          </h1>
        </div>
        <div
          class="
            p-5
            mobile:p-3
            pb-8
            border border-[#c4c4c4]
            rounded-[0.25rem]
            mb-4
          "
        >
          <div class="flex flex-wrap">
            <a
              v-for="(url, index) in urlList"
              :key="index"
              :href="url"
              class="block w-1/2 text-[18px] text-[#00a739] hover:underline"
            >
              {{ url }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </w-container>
</template>

<script>
import WContainer from '~/components/shared/w-container.vue'
import definitions from '~/config/definitions.json'

export default {
  components: {
    WContainer,
  },
  data() {
    return {
      urlList: definitions.definitions,
      title: 'Definitions',
    }
  },
  head() {
    return {
      title: 'Definitions',
    }
  },
}
</script>
