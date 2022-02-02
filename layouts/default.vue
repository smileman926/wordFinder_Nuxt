<template>
  <div class="font-lato text-xl flex flex-col min-h-screen">
    <Header />
    <Nuxt class="flex-grow" />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layouts/header.vue'
import Footer from '~/components/layouts/footer.vue'

// Default Layout for the site
export default {
  components: { Header, Footer },
}
</script>
