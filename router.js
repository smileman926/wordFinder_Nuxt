import Router from 'vue-router'
import SeoResults from '~/config/indexed_results.yml'

import XLetterWords from '~/components/pages/words-by-length/x-letter-words'
import IndexedPage from '~/components/pages/indexed-result.vue'
export function createRouter(
  ssrContext,
  createDefaultRouter,
  routerOptions,
  config
) {
  const options =
    routerOptions || createDefaultRouter(ssrContext, config).options
  const router = new Router({
    ...options,
    routes: [
      {
        path: '/words-with/q/without/u',
        component: IndexedPage,
        meta: {
          uid: 'words-with-q-without-u',
          params: {
            contains: 'q',
            not_contains: 'u',
          },
        },
      },
      {
        path: '/two-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '2',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/three-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '3',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/four-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '4',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/five-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '5',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/six-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '6',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/seven-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '7',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/eight-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '8',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/nine-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '9',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/ten-letter-words',
        component: XLetterWords,
        meta: {
          params: {
            length: '10',
          },
          options: {
            page_size: 100,
          },
        },
      },
      {
        path: '/:length-letter-words-starting-with-:starts_with',
        component: XLetterWords,
        meta: {
          titles: SeoResults.x_letter_words_starting_with,
        },
      },
      {
        path: '/:length-letter-words-ending-in-:ends_with',
        component: XLetterWords,
        meta: {
          titles: SeoResults.x_letter_words_ending_in,
        },
      },
      {
        path: '/:length-letter-words-with-:contains',
        component: XLetterWords,
        meta: {
          titles: SeoResults.x_letter_words_with,
        },
      },
      {
        path: '/words-with/:contains/without/:not_contains',
        component: XLetterWords,
        meta: {
          titles: SeoResults.with_char_without_char,
        },
      },
      {
        path: '/words-with/:contains_char1/and/:contains_char2/',
        component: XLetterWords,
        meta: {
          titles: SeoResults.with_char1_and_char2,
        },
      },
      {
        path: '/:length-letter-words',
        component: XLetterWords,
        meta: {
          titles: SeoResults.x_letter_words,
        },
      },
      {
        path: '/words-with/:contains',
        component: XLetterWords,
        meta: {
          titles: SeoResults.contains,
        },
      },
      {
        path: '/words-with-two-:must_contain_char1',
        component: XLetterWords,
        meta: (route) => {
          // eslint-disable-next-line camelcase
          const { must_contain_char1 } = route.params
          return {
            params: {
              must_contain_char2: must_contain_char1,
              must_contain_char1,
            },
            titles: SeoResults.with_char_twice,
          }
        },
      },
      {
        path: '/words-with-2-:must_contain_char1',
        component: XLetterWords,
        meta: (route) => {
          // eslint-disable-next-line camelcase
          const { must_contain_char1 } = route.params
          return {
            params: {
              must_contain_char2: must_contain_char1,
              must_contain_char1,
            },
            titles: SeoResults.with_char_twice,
          }
        },
      },
      {
        path: '/words-end-in/:ends_with',
        component: XLetterWords,
        meta: {
          titles: SeoResults.ends_with,
        },
      },
      {
        path: '/words-start-with/:starts_with',
        component: XLetterWords,
        meta: {
          titles: SeoResults.starts_with,
        },
      },
    ].concat(fixRoutes(options.routes)),
  })
  router.beforeEach((to, from, next) => {
    if (typeof to.meta === 'function') {
      const calculatedMeta = to.meta(to)
      Object.keys(calculatedMeta).forEach((key) => {
        to.meta[key] = calculatedMeta.params
      })
    }
    next()
  })
  return router
}

function fixRoutes(defaultRoutes) {
  return defaultRoutes
}
