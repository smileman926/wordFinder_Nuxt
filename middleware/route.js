import { getDataFromURL } from '~/helpers'

export default function ({ store, route }) {
  const metaParams = route.meta && route.meta[0]
  let params =
    route.name === 'unscramble-all' ? getDataFromURL(route.path) : route.params
  let options = {}
  if (metaParams) {
    params = { ...params, ...metaParams.params }
    options = metaParams.options
  }
  store.commit('words/SET_SEARCH_DATA', params)
  store.commit('words/SET_SEARCH_OPTIONS', options)
}
