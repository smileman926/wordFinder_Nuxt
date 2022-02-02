<template>
  <div>
    <div class="bg-seagreen-300">
      <w-container>
        <div class="pt-[3.275rem] pb-20 mobile:pb-40 text-white text-center">
          <h1
            class="
              text-[3rem]
              mobile:text-[2rem]
              leading-[3.6rem]
              mobile:leading-[2.4rem]
              font-medium
            "
          >
            Word Finder
          </h1>
          <AdvancedSearchMain />
        </div>
      </w-container>
    </div>
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
            v-if="title"
            class="p-5 border border-[#c4c4c4] rounded-[0.25rem] mb-4"
          >
            <h1
              class="
                text-[3rem]
                mobile:text-[1.25rem]
                leading-[58px]
                mobile:leading-[24px]
                mb-5
              "
            >
              {{ title }}
            </h1>
            <p class="text-[18px] leading-[27px]">{{ description }}</p>
          </div>
          <div class="p-5 pb-8 border border-[#c4c4c4] rounded-[0.25rem] mb-4">
            <a
              v-for="(text, url) in urlList"
              :key="url"
              :href="url"
              class="block text-[18px] text-[#00a739] hover:underline"
            >
              {{ text }}
            </a>
          </div>
        </div>
        <div
          class="
            col-span-2
            tablet:col-span-3
            mobile:col-span-full mobile:border-b
            border-white
          "
        >
          <RightSideMenu />
        </div>
      </div>
    </w-container>
  </div>
</template>

<script>
import WContainer from '~/components/shared/w-container.vue'
import RightSideMenu from '~/components/pages/home/right-side-menu.vue'
import AdvancedSearchMain from '~/components/pages/search/advanced-search-main.vue'
import topSearches from '~/config/top-searches.json'

export default {
  components: {
    WContainer,
    AdvancedSearchMain,
    RightSideMenu,
  },
  data() {
    return {
      title: topSearches['top-searches'].meta_title,
      description: topSearches['top-searches'].text,
      urlList: topSearches['top-searches'].url_list,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
