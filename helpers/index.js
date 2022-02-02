import flattenDeep from 'lodash-es/flattenDeep'
import dictionaryUrls from '~/config/dictionary_urls.json'
import { CONSONANT_WORDS, VOWEL_WORDS } from '~/config/constants'

export const execTemplate = (template, context) => {
  const caller = (object, property) =>
    property.includes('()')
      ? object[property.replace('()', '')]()
      : object[property] || ''
  return template.replaceAll(/{{(?<foo>[A-z0-9\\. )(]+)}}/g, (match) => {
    return match
      .slice(2, match.length - 2)
      .replaceAll(' ', '')
      .split('.')
      .reduce(caller, context)
  })
}

export const sanitizeSearchData = (data) => {
  const searchData = {}
  for (const key in data) {
    if (data[key] || data[key] === false) {
      let value = data[key]
      if (typeof data[key] === 'string') value = value.toLowerCase()

      searchData[key] = value
    }
  }

  return searchData
}

export const getDataFromURL = (routePath) => {
  const path = routePath

  const searchData = {
    letters: '',
    starts_with: '',
    ends_with: '',
    contains: '',
    length: '',
    regexp: '',
  }
  const splitted = path.split('/unscramble/')

  if (splitted.length >= 2 && splitted[1]) {
    const paramsString = splitted[1]
    const params = paramsString.split('/')

    if (params.length > 0) {
      searchData.letters =
        params[0] === '_' ? '' : params[0].replace(/\*/g, '?')

      for (let i = 1; i < params.length - 1; i += 2) {
        const key = params[i]
          .replace('words-', '')
          .replace('start-with', 'starts_with')
          .replace('end-in', 'ends_with')
          .replace('filter', 'regexp')
        let value = params[i + 1]
        if (key === 'regexp') {
          value = value === 'vowel-words' ? VOWEL_WORDS : CONSONANT_WORDS
        }
        searchData[key] = value
      }
    }
  }

  return searchData
}

export const generateSearchPath = (searchData) => {
  let path = '/unscramble'
  const keys = [
    'letters',
    'starts_with',
    'ends_with',
    'contains',
    'length',
    'regexp',
  ]

  for (let key of keys) {
    let value = searchData[key]

    if (key === 'letters') {
      if (!value) path = `${path}/_`
      else {
        value = value.replace(/\?/g, '*')
        path = `${path}/${value}`
      }
    } else if (value) {
      switch (key) {
        case 'length':
          break
        case 'regexp':
          key = 'filter'
          value = value === VOWEL_WORDS ? 'vowel-words' : 'consonant-words'
          break
        default:
          key = `words-${key
            .replace('starts_with', 'start-with')
            .replace('ends_with', 'end-in')}`
      }
      path = `${path}/${key}/${value}`
    }
  }

  return path
}

export const mapOptionsFields = (fields) => {
  return fields.reduce((acc, key) => {
    acc[key] = {
      get() {
        return this.searchOptions[key]
      },
      set(v) {
        this.SET_SEARCH_OPTIONS({ ...this.searchOptions, [key]: v })
      },
    }
    return acc
  }, {})
}

export const mapSearchFields = () => {
  return ['length', 'letters', 'starts_with', 'ends_with', 'contains'].reduce(
    (acc, key) => {
      acc[key] = {
        get() {
          return this.searchData[key]
        },
        set(v) {
          this.SET_SEARCH_DATA({ ...this.searchData, [key]: v })
        },
      }
      return acc
    },
    {}
  )
}

export const saveDataToStorage = (data) => {
  for (const key in data) {
    if (
      ['word_sorting', 'group_by_length', 'dictionary', 'page_size'].includes(
        key
      )
    ) {
      localStorage.setItem(key, data[key])
    }
  }
}

export const getDataFromStorage = () => {
  const keys = ['word_sorting', 'group_by_length', 'dictionary', 'page_size']
  const data = {}

  keys.forEach((key) => {
    const value = localStorage.getItem(key)
    if (!value) return
    if (value === 'true') data[key] = true
    else if (value === 'false') data[key] = false
    else data[key] = value
  })
  return data
}

export const validate = (searchData) => {
  const keys = [
    'letters',
    'starts_with',
    'ends_with',
    'contains',
    'length',
    'regexp',
  ]

  let flag = false
  for (const key of keys) {
    const value = searchData[key]
    if (value) flag = true
  }

  return flag
}

export const jsonToArray = (jsonData) => {
  const result = []
  for (const key in jsonData) {
    result.push(jsonData[key])
  }

  return result
}

export const isTopURL = (topURLs, path) => {
  return topURLs.find((topURL) => {
    return topURL.includes(path)
  })
}

export const formatDefinitions = (odData) => {
  if (!odData) return {}
  const defs = odData.results.map(({ lexicalEntries }) => {
    return lexicalEntries.map(({ entries, lexicalCategory }) => {
      return (
        entries &&
        entries.map(
          ({ senses }) =>
            senses &&
            senses.map(({ definitions, examples, synonyms }) => ({
              text: definitions?.[0],
              examples: examples && examples.map(({ text }) => text),
              synonyms: synonyms && synonyms.map(({ text }) => text),
              part_of_speech: lexicalCategory.id,
            }))
        )
      )
    })
  })

  return {
    definitions: flattenDeep(defs).filter((x) => x),
  }
}

export const isDictionary = (slug) => {
  return dictionaryUrls.includes(slug)
}

export const getFirstKeyword = (keywords) => {
  return keywords ? keywords.split(', ')[0] : ''
}

export const toPascalCase = (str) => {
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const requestParamsSerializer = (params) => {
  const result = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&')

  return result
}
