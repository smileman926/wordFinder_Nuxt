export default {
  methods: {
    async getPrismicByDocType(type, options = {}) {
      const response = await this.$prismic.api.query(
        [this.$prismic.predicates.at('document.type', type)],
        options
      )

      return response
    },
    async getPrismicByUID(type, uid, options = {}) {
      const response = await this.getPrismicByField(type, 'uid', uid, options)
      return response
    },
    async getPrismicByField(type, fieldName, value, options = {}) {
      const response = await this.$prismic.api.query(
        [
          this.$prismic.predicates.at('document.type', type),
          this.$prismic.predicates.at(`my.${type}.${fieldName}`, value),
        ],
        options
      )

      return response
    },
    formatLinkTitle(link) {
      if (link) {
        const words = link.split('-')
        const capitalizedWords = []
        for (let i = 0; i < words.length; i++) {
          capitalizedWords.push(
            words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1)
          )
        }

        return capitalizedWords.join(' ')
      } else return ''
    },
  },
}
