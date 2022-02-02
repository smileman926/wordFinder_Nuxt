<template>
  <page-content :params="params">
    <template #meta>
      <p>Showing <b>Vowel Words</b></p>
    </template>
  </page-content>
</template>

<script>
import PageContent from '~/components/pages/indexed-result'
import { VOWEL_WORDS } from '~/config/constants'

export default {
  components: {
    PageContent,
  },
  data: () => ({
    params: {
      regexp: VOWEL_WORDS,
    },
  }),
}
</script>
