<template>
  <w-card classes="mobile:border mobile:rounded-lg">
    <template #card-header>
      <div
        class="
          px-[22px]
          py-[8px]
          bg-seagreen-300
          text-white text-[1.5rem]
          font-bold
          leading-[28px]
          rounded-t-lg
        "
      >
        {{ title }}
      </div>
    </template>
    <div class="px-[22px] pt-[8px] pb-[22px] text-[#353D50]">
      <ul>
        <li
          v-for="(item, index) in displayedItems"
          :key="index"
          class="border-b"
          :class="{ 'last:border-b-0': !showLoadMore }"
        >
          <a
            :href="
              contentRelationship
                ? $prismic.asLink(item.related_link)
                : item.uid
            "
            class="block w-full py-2.5 leading-[21px]"
          >
            {{
              contentRelationship
                ? formatLinkTitle(item.related_link.uid)
                : toPascalCase(getFirstKeyword(item.data.keywords))
            }}
          </a>
        </li>
      </ul>
      <div v-if="showLoadMore" class="text-center">
        <w-button
          classes="
            inline-block
            text-[18px] text-white text-gray-700
            leading-[20px]
            bg-[#E3E3E3]
            uppercase
            mt-[14px]
            px-[22px]
            pt-[9px]
            pb-[4px]
            shadow-secondary-btn
          "
          @click="loadMore"
        >
          More
        </w-button>
      </div>
    </div>
  </w-card>
</template>

<script>
import WCard from '~/components/shared/w-card.vue'
import WButton from '~/components/shared/w-button.vue'

import { getFirstKeyword, toPascalCase } from '~/helpers'

export default {
  name: 'MenuCard',
  components: { WCard, WButton },
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    displayCount: {
      type: Number,
      default: 5,
    },
    contentRelationship: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      displayedItems: [],
    }
  },
  fetch() {
    if (this.displayCount) {
      this.displayedItems = this.items.slice(0, this.displayCount)
    }
  },
  computed: {
    showLoadMore() {
      return (
        this.items.length > this.displayCount &&
        this.displayedItems.length === this.displayCount
      )
    },
  },
  watch: {
    items(values) {
      if (this.displayCount) {
        this.displayedItems = values.slice(0, this.displayCount)
      }
    },
  },
  mounted() {
    if (this.displayCount) {
      this.displayedItems = this.items.slice(0, this.displayCount)
    }
  },
  methods: {
    loadMore() {
      this.displayedItems = this.items
    },
    getFirstKeyword,
    toPascalCase,
  },
}
</script>
