import fs from 'fs'
import path from 'path'
import { getPrismicByDocType } from './helpers/prismic'

const sitemapPath = './sitemaps'
const customSitemapFiles = fs.readdirSync(sitemapPath).filter(function (elm) {
  return elm.match(/.*\.(txt?)/gi)
})

export default {
  ssr: false,

  target: 'static',

  generate: {
    fallback: true,
    routes: async () => {
      const listTypes = await getPrismicByDocType('list')
      const indexedResults = await getPrismicByDocType('indexed-result')

      const lists = {
        articles: await getPrismicByDocType('article', { pageSize: 100 }),
        wordfinders: await getPrismicByDocType('search', { pageSize: 100 }),
        games: await getPrismicByDocType('games'),
        dictionaries: await getPrismicByDocType('dictionary'),
        listOfWords: [...listTypes.results, ...indexedResults.results],
        wordsByLength: await getPrismicByDocType('words-by-length'),
        tools: await getPrismicByDocType('tool'),
      }
      const generateRoutesByType = async (type, opts = {}) => {
        const { prefix, fetchLinks = [] } = opts
        const docs = await getPrismicByDocType(type, { fetchLinks })
        return docs.results.map((doc) => {
          return {
            route: prefix ? `${prefix}/${doc.uid}` : doc.uid,
            payload: {
              main: doc,
              lists,
            },
          }
        })
      }
      const blog = {
        route: '/blog',
        payload: {
          main: lists.articles,
        },
      }

      const popularPages = {
        route: '/popular-pages',
        payload: {
          lists,
        },
      }

      const topSearches = {
        route: '/top-searches',
        payload: {
          lists,
        },
      }

      const tools = {
        route: '/tools',
        payload: {
          main: lists.tools,
        },
      }

      const wordfindersRoutes = await generateRoutesByType('search', {
        fetchLinks: ['article.teaser_image', 'article.meta_title'],
      })
      const dictionariesRoutes = await generateRoutesByType('dictionary')
      const toolsRoutes = await generateRoutesByType('tool', {
        prefix: '/tools/',
      })
      const indexedResultRoutes = await generateRoutesByType('indexed-result')
      const staticRoutes = await generateRoutesByType('static')
      const gamesRoutes = await generateRoutesByType('games')
      const articlesRoutes = await generateRoutesByType('article', {
        fetchLinks: ['author.name', 'author.bio', 'author.image'],
      })
      return [
        '/unscramble/_',
        ...wordfindersRoutes,
        ...dictionariesRoutes,
        ...toolsRoutes,
        ...indexedResultRoutes,
        ...staticRoutes,
        blog,
        popularPages,
        topSearches,
        ...articlesRoutes,
        ...gamesRoutes,
        tools,
      ]
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Word Finder for Scrabble and Words With Friends',
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'text-[#232427]',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/theme',
    { src: '~/plugins/prismicLink', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    [
      '@nuxtjs/eslint-module',
      {
        fix: true,
      },
    ],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/router',
  ],
  routerModule: {
    keepDefaultRouter: true,
    parsePages: true,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/svg
    '@nuxtjs/svg',
    // https://prismic.nuxtjs.org/
    [
      '@nuxtjs/prismic',
      {
        endpoint:
          process.env.WORDTIPS_PRISMIC_URL ||
          'https://wordtips.cdn.prismic.io/api/v2',
      },
    ],
    // https://www.npmjs.com/package/nuxt-sm
    ['nuxt-sm'],
    // https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.WORDFINDER_API_URL || 'https://wordfinderapi.com/api/v2',
  },

  loading: false,
  loadingIndicator: false,

  fetch: {
    client: false,
    server: false,
  },
  router: {
    middleware: ['route'],
  },
  features: {
    store: true,
    layouts: true,
    meta: true,
    middleware: true,
    transitions: true,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: true,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: true,
    componentAliases: false,
    componentClientOnly: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      })
    },
    transpile: ['lodash-es', 'vue-slicezone', 'nuxt-sm'],
    terser: true,
    indicator: false,
    filenames: {
      chunk: () => '[name]_[contenthash].js',
    },
    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
    splitChunks: {
      layouts: false,
      pages: false,
      commons: false,
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        minSize: 50000,
        maxSize: 2500000,
        cacheGroups: {
          default: false,
          vendors: false,
          app: {
            name: undefined,
            test: /.*/,
            chunks: 'all',
            reuseExistingChunk: false,
            enforce: true,
          },
        },
      },
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },

  publicRuntimeConfig: {
    dictionaryAPI: process.env.DICTIONARY_API_URL,
    wordfinderAPI: process.env.WORDFINDER_API_URL,
  },

  prismic: {
    endpoint:
      process.env.WORDTIPS_PRISMIC_URL ||
      'https://wordtips.cdn.prismic.io/api/v2',
    htmlSerializer: '~/prismic/html-serializer.js',
    linkResolver: '~/prismic/link-resolver.js',
    preview: false,
  },

  storybook: {
    stories: ['~/components/slices/**/*.stories.js'],
  },
  ignore: ['**/*.stories.js'],

  // Sitemap configuration
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    hostname: 'http://localhost:3000',
    path: '/sitemap.xml',
    gzip: true,
    sitemaps: [
      {
        path: '/sitemaps/search.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('search', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/article.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('article', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/static.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('static', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/dictionary.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('dictionary', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/tools.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('tools', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/words-by-length.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('words-by-length', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/list.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('list', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/indexed-result.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('indexed-result', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
      {
        path: '/sitemaps/games.xml',
        lastmod: new Date(),
        exclude: ['/**'],
        routes: async () => {
          const docs = await getPrismicByDocType('games', {
            pageSize: 100,
          })
          return docs.results.map((doc) => {
            return `/${doc.uid}`
          })
        },
      },
    ].concat(
      customSitemapFiles.map((file) => {
        const routes = fs
          .readFileSync(`${sitemapPath}/${file}`)
          .toString()
          .split('\n')
          .filter((x) => x)
        return {
          path: `/sitemaps/${path.parse(file).name}.xml`,
          exclude: ['/**'],
          routes,
        }
      })
    ),
  },
}
