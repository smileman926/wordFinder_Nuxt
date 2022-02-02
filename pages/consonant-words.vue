<template>
  <page-content :params="params">
    <template #meta>
      <p>Showing <b>Consonant Words</b></p>
    </template>
  </page-content>
</template>

<script>
import PageContent from '~/components/pages/indexed-result'
import { CONSONANT_WORDS } from '~/config/constants'

export default {
  components: {
    PageContent,
  },
  data: () => ({
    params: {
      regex: CONSONANT_WORDS,
    },
  }),
}
</script>
