export const WORD_COUNT_PER_PAGE = 20

export const SORT_ALPHABET = false
export const GROUP_BY_LENGTH = true
export const DICTIONARY = 'wwf'
export const WORD_SORTING = 'points'

export const MOBILE_SCREEN = 639
export const TABLET_SCREEN = 1023
export const LAPTOP_SCREEN = 1279

export const SCROLL_TOP_POSITION = 275
export const SORT_OPTIONS = [
  {
    value: 'points',
    text: 'Points',
  },
  {
    value: 'az',
    text: 'A - Z',
  },
  {
    value: 'za',
    text: 'Z - A',
  },
]

export const DICTIONARY_OPTIONS = [
  { value: 'wwf', text: 'Words With Friends' },
  { value: 'otcwl', text: 'Scrabble US' },
  { value: 'sowpods', text: 'Scrabble UK' },
  { value: 'all_en', text: 'All Dictionaries' },
]

export const VOWEL_WORDS = '^[aeiouy]+$'
export const CONSONANT_WORDS = '^[^aeyiuo]+$'

export const VARIANT = 'variant'
export const API_VARIANT = 'api_variant'

export const NUMBERS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
}

export const DEFAULT_OPTIONS = {
  word_sorting: WORD_SORTING,
  group_by_length: GROUP_BY_LENGTH,
  dictionary: DICTIONARY,
  page_size: WORD_COUNT_PER_PAGE,
}
