import {
  formatDefinitions,
  getDataFromStorage,
  requestParamsSerializer,
  sanitizeSearchData,
  saveDataToStorage,
  validate,
} from '~/helpers'
import { DEFAULT_OPTIONS } from '~/config/constants'

export const state = () => ({
  wordResults: {},
  isLoading: false,
  showValidationError: false,
  showBurgerMenu: false,
  currentWord: '',
  wordDetail: null,
  isWordDetailLoading: false,
  searchData: {},
  searchOptions: { ...DEFAULT_OPTIONS, ...getDataFromStorage() },
})

export const getters = {
  wordPages: (state) => {
    return state.wordResults.word_pages
  },
  noResult: (state) => {
    return !state.wordResults.word_pages
  },
  searchResults: (state) => {
    return state.wordResults.filter_results
  },
  lettersForSearch: (state) => {
    return state.wordResults.request ? state.wordResults.request.letters : ''
  },
  isLoading: (state) => {
    return state.isLoading
  },
  isPlayable: (state) => {
    return state.wordResults.dict_matches
      ? state.wordResults.dict_matches[state.wordResults.request.dictionary]
      : false
  },
  showValidationError: (state) => {
    return state.showValidationError
  },
  showBurgerMenu: (state) => {
    return state.showBurgerMenu
  },
  currentWord: (state) => {
    return state.currentWord
  },
  wordDetail: (state) => {
    return state.wordDetail
  },
  isWordDetailLoading: (state) => {
    return state.isWordDetailLoading
  },
  isWildSearch: (state) => {
    return state.searchData.letters.includes('*')
  },
  letters: (state) => {
    return state.searchData.letters
  },
}

export const mutations = {
  SET_WORD_RESULTS: (state, payload) => {
    state.wordResults = { ...payload }
  },
  SET_LOADING: (state, payload) => {
    state.isLoading = payload
  },
  SET_VALIDATION_ERROR: (state, payload) => {
    state.showValidationError = payload
  },
  SET_BURGER_MENU: (state, payload) => {
    state.showBurgerMenu = payload
  },
  SET_SEARCH_DATA_CHANGED: (state, payload) => {
    state.isSearchDataChanged = payload
  },
  SET_CURRENT_WORD: (state, payload) => {
    state.currentWord = payload
  },
  SET_WORD_DETAIL: (state, payload) => {
    state.wordDetail = payload
  },
  SET_WORD_DETAIL_LOADING: (state, payload) => {
    state.isWordDetailLoading = payload
  },
  SET_SEARCH_DATA: (state, payload) => {
    state.searchData = { ...state.searchData, ...payload }
  },
  SET_SEARCH_OPTIONS: (state, payload) => {
    state.searchOptions = { ...state.searchOptions, ...payload }
    saveDataToStorage(state.searchOptions)
  },
  CLEAR_SEARCH_DATA: (state) => {
    state.searchData = {
      starts_with: '',
      ends_with: '',
      contains: '',
      length: '',
    }
  },
}

export const actions = {
  async getResults(
    { commit, state: { searchData, searchOptions } },
    params = {}
  ) {
    commit('SET_LOADING', true)
    try {
      const res = await this.$axios.get('/search', {
        params: sanitizeSearchData({
          ...searchData,
          ...searchOptions,
          ...params,
        }),
        paramsSerializer: requestParamsSerializer,
      })
      commit('SET_WORD_RESULTS', res.data)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  getOptionsResults({ commit, state: { searchData }, dispatch }) {
    if (validate(searchData)) {
      dispatch('getResults')
    } else {
      commit('SET_VALIDATION_ERROR', true)
      setTimeout(() => {
        commit('SET_VALIDATION_ERROR', false)
      }, 1000)
    }
  },
  getMoreResults({ commit }, { searchData }) {
    return this.$axios.get('/search', {
      params: sanitizeSearchData(searchData),
      paramsSerializer: requestParamsSerializer,
    })
  },
  async getDefinition({ commit }, params) {
    const { word } = params
    const { $axios, $config } = this
    const dictionaryAPI = $axios.create()
    dictionaryAPI.setBaseURL($config.dictionaryAPI)

    commit('SET_WORD_DETAIL_LOADING', true)
    const dictionaryResponse = await this.$axios.get(`/dictionary?word=${word}`)
    const definitionResponse = await dictionaryAPI.get(`/${word}`)

    commit('SET_WORD_DETAIL', {
      dictionary: dictionaryResponse.data,
      words: formatDefinitions(definitionResponse.data),
    })
    commit('SET_WORD_DETAIL_LOADING', false)
  },
  showModal(ctx, name) {
    this._vm.$modal.show(name)
  },
  hideModal(ctx, name) {
    this._vm.$modal.hide(name)
  },
}
