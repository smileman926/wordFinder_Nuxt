<template>
  <!-- Navigation Section -->
  <div class="bg-seagreen-300 px-4 py-2">
    <w-container classes="mobile:px-0">
      <div class="flex justify-between w-full leading-10 text-white">
        <a class="py-[5px]" href="/">
          <LogoIcon
            class="mobile:hidden h-[1.875rem]"
            @click="hideBurgerMenu"
          />
          <LogoSmallIcon
            class="hidden mobile:block h-[1.875rem]"
            @click="hideBurgerMenu"
          />
        </a>
        <div class="flex justify-between items-center text-[1.3rem] leading-8">
          <a
            class="px-4 cursor-pointer mobile:hidden"
            href="#"
            @click="toggleBurgerMenu"
          >
            Word Lists
          </a>
          <a
            class="px-4 cursor-pointer mobile:hidden"
            href="#"
            @click="toggleBurgerMenu"
          >
            Word Finders
          </a>
          <nuxt-link
            to="/wordtips-app"
            class="
              hidden
              mobile:flex
              justify-between
              items-center
              rounded-3xl
              px-[0.625rem]
              py-1
              border border-white
              text-[1.125rem]
              leading-[23px]
              uppercase
            "
          >
            GET THE APP
            <PhoneIcon class="ml-1" />
          </nuxt-link>
          <MenuIcon
            class="ml-2 cursor-pointer z-[1000]"
            :class="{ hidden: isShowBurgerMenu }"
            @click="toggleBurgerMenu"
          />
          <MenuCloseIcon
            class="ml-2 cursor-pointer z-[1000]"
            :class="{
              hidden: !isShowBurgerMenu,
            }"
            @click="toggleBurgerMenu"
          />
          <transition name="slide-side">
            <div
              v-if="isShowBurgerMenu"
              class="
                fixed
                z-[999]
                top-0
                left-0
                w-[280px]
                mobile:w-screen
                h-screen
                overflow-y-auto
              "
            >
              <div class="bg-seagreen-300 px-[10px] py-[15px]">
                <a href="/">
                  <LogoIcon
                    class="mobile:hidden h-[1.875rem]"
                    @click="hideBurgerMenu"
                  />
                  <LogoSmallIcon
                    class="hidden mobile:block h-[1.875rem]"
                    @click="hideBurgerMenu"
                  />
                </a>
              </div>
              <ul class="m-0 pb-12 list-none bg-white">
                <li v-for="(navItems, index) in navs" :key="index">
                  <div
                    class="
                      px-4
                      py-2
                      text-[17.6px]
                      leading-[26px]
                      bg-seagreen-300
                    "
                  >
                    {{ navItems.title }}
                  </div>
                  <ul class="m-0 p-0 list-none bg-white text-black">
                    <li
                      v-for="(item, itemIndex) in navItems.items"
                      :key="itemIndex"
                    >
                      <a
                        :href="getURL(item)"
                        class="
                          block
                          px-[10px]
                          py-[3px]
                          text-[14px]
                          leading-[21px]
                          border border-gray-300
                          hover:bg-[#f7c342] hover:cursor-pointer
                        "
                      >
                        {{ toPascalCase(getFirstKeyword(item.data.keywords)) }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </w-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import WContainer from '~/components/shared/w-container.vue'
import LogoIcon from '~/assets/logos/wordtips.svg?inline'
import LogoSmallIcon from '~/assets/logos/wordtips_m.svg?inline'
import MenuIcon from '~/assets/icons/grid-3x3-gap-fill-white.svg?inline'
import PhoneIcon from '~/assets/icons/phone-white.svg?inline'
import MenuCloseIcon from '~/assets/icons/x-square.svg?inline'

import { getFirstKeyword, toPascalCase } from '~/helpers'

// Header component for Naviagtion
export default {
  name: 'Header',
  components: {
    WContainer,
    LogoIcon,
    LogoSmallIcon,
    MenuIcon,
    PhoneIcon,
    MenuCloseIcon,
  },
  data() {
    return {
      navs: [],
    }
  },
  fetch() {
    if (this.$nuxt.context.payload) {
      const lists = this.$nuxt.context.payload.lists
      this.navs = [
        {
          title: 'Word Lists',
          items: lists.wordfinders.results,
        },
        {
          title: 'Dictionary',
          items: lists.dictionaries.results,
        },
        {
          title: 'List of Words',
          items: lists.listOfWords.results,
        },
        {
          title: 'Tools',
          items: lists.tools.results,
        },
        {
          title: 'Games',
          items: lists.games.results,
        },
      ]
    }
  },
  computed: {
    ...mapGetters({ isShowBurgerMenu: 'words/showBurgerMenu' }),
  },
  async mounted() {
    const wordfinders = await this.getPrismicByDocType('search', {
      pageSize: 100,
    })
    const dictionaries = await this.getPrismicByDocType('dictionary')
    const lists = await this.getPrismicByDocType('list')
    const indexedResults = await this.getPrismicByDocType('indexed-result')
    const tools = await this.getPrismicByDocType('tool')
    const games = await this.getPrismicByDocType('games')
    this.navs = [
      {
        title: 'Word Lists',
        items: wordfinders.results,
      },
      {
        title: 'Dictionary',
        items: dictionaries.results,
      },
      {
        title: 'List of Words',
        items: [...lists.results, ...indexedResults.results],
      },
      {
        title: 'Tools',
        items: tools.results,
      },
      {
        title: 'Games',
        items: games.results,
      },
    ]
  },
  methods: {
    ...mapMutations({
      setBurgerMenu: 'words/SET_BURGER_MENU',
    }),
    toggleBurgerMenu() {
      this.setBurgerMenu(!this.isShowBurgerMenu)
    },
    hideBurgerMenu() {
      this.setBurgerMenu(false)
    },
    getURL(item) {
      if (item.type === 'tool') {
        return `/tools/${item.uid}`
      } else if (item.type === 'games') {
        return `/games/${item.uid}`
      } else if (item.type === 'indexed-result') {
        if (item.uid === 'words-with-q-without-u')
          return '/words-with/q/without/u'
      } else {
        return `/${item.uid}`
      }
    },
    getFirstKeyword,
    toPascalCase,
  },
}
</script>

<style scoped>
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}
</style>
