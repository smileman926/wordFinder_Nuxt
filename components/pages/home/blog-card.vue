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
    <div
      class="flex flex-wrap justify-between p-5"
      :class="{ 'flex-col': isVertical }"
    >
      <a
        v-for="(item, index) in displayedItems"
        :key="index"
        class="w-[31%] mobile:w-full inline-block flex flex-col mb-[30px]"
        :class="{ '!w-full !h-auto': isVertical }"
        data-nuxt-link
        :href="contentRelationship ? item.related_link.uid : item.uid"
      >
        <div
          class="
            w-full
            h-[115px]
            mobile:h-[232px]
            mb-[15px]
            rounded-t-[10px]
            overflow-hidden
            object-fit
          "
          :class="{ '!h-auto': isVertical }"
        >
          <prismic-image
            :field="
              contentRelationship
                ? item.related_link.data.teaser_image
                : item.data.teaser_image
            "
          />
        </div>
        <p
          class="text-[18px] text-[#353D50] leading-[22px]"
          :class="{ 'hover:!underline': isVertical }"
        >
          {{
            contentRelationship
              ? item.related_link.data.meta_title
              : item.data.meta_title
          }}
        </p>
      </a>

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

export default {
  name: 'BlogCard',
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
      default: 3,
    },
    direction: {
      type: String,
      default: 'horizontal',
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
    isVertical() {
      return this.direction === 'vertical'
    },
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
  },
}
</script>
