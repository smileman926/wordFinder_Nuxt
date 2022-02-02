import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'
import VModal from 'vue-js-modal/dist/ssr.nocss'
import mixin from '~/mixins/prismic'

import 'vue-js-modal/dist/styles.css'

Vue.use(VueContentPlaceholders)
Vue.use(VModal)
Vue.mixin(mixin)
