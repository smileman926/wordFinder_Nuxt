import Prismic from '@prismicio/client'

const getPrismicByDocType = async function (type, options = {}) {
  const prismicApi = await Prismic.client(process.env.WORDTIPS_PRISMIC_URL)
  const response = await prismicApi.query(
    [Prismic.predicates.at('document.type', type)],
    options
  )

  return response
}

const getPrismicByUID = async function (type, uid, options = {}) {
  const response = await getPrismicByField(type, 'uid', uid, options)
  return response
}

const getPrismicByField = async function (
  type,
  fieldName,
  value,
  options = {}
) {
  const prismicApi = await Prismic.client(process.env.WORDTIPS_PRISMIC_URL)
  const response = await prismicApi.query(
    [
      Prismic.predicates.at('document.type', type),
      Prismic.predicates.at(`my.${type}.${fieldName}`, value),
    ],
    options
  )

  return response
}

const getPrismicDocuments = async function () {
  const prismicApi = await Prismic.client(process.env.WORDTIPS_PRISMIC_URL)
  const response = await prismicApi.query()

  return response
}

export {
  getPrismicByDocType,
  getPrismicByUID,
  getPrismicByField,
  getPrismicDocuments,
}
