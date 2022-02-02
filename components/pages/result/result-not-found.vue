<template>
  <div
    class="
      bg-white
      border border-[#C4C4C4]
      shadow
      rounded-lg
      p-5
      text-[#232427]
    "
  >
    <div class="flex flex-col items-center text-center">
      <h1 class="text-[2rem] mb-5">No Words Found</h1>
      <h3 class="text-1xl mb-2">Try adjusting your search by...</h3>
      <w-button
        classes="w-[18.75rem] text-[18px] text-gray-700 hover:underline"
        @click="addWildCard"
      >
        Add Wildcard
      </w-button>
      <w-button
        classes="w-[18.75rem] mt-4 text-[18px] text-gray-700 hover:underline"
        @click="removeFilters"
      >
        Remove Filters
      </w-button>
      <w-button
        classes="w-[18.75rem] mt-4 text-[18px] text-gray-700 hover:underline"
        @click="searchAllDictionaries"
      >
        Search All Dictionaries
      </w-button>
      <hr class="my-4 w-full border-[#E5E5E5]" />
      <p class="my-4">
        If you think you found a bug or want to report a missing word, please
        send us your feedback
      </p>
      <w-button
        ref="microfeedback-button"
        classes="w-[18.75rem] text-[18px] text-gray-700 flex justify-center items-center"
      >
        <ChatTextIcon class="mr-[0.7rem]" width="24" height="22" />
        <span class="hover:underline">Feedback</span>
      </w-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'
import microfeedback from 'microfeedback-button'
import WButton from '~/components/shared/w-button.vue'
import ChatTextIcon from '~/assets/icons/chat-text.svg?inline'
import { generateSearchPath } from '~/helpers'

export default {
  name: 'ResultNotFound',
  components: { WButton, ChatTextIcon },
  computed: {
    ...mapGetters('words', ['letters']),
    ...mapState('words', ['searchData']),
  },
  mounted() {
    microfeedback(this.$refs['microfeedback-button'].$el, {
      url: 'https://microfeedback.herokuapp.com/',
      showDialog(btn) {
        return btn.alert({
          title: 'Feedback',
          text: 'Please share your feedback with us.',
          html: `
            <p class="text-[#545454] text-[1.125rem] font-light">
              Please share your feedback with us.
            </p>
            <textarea id="microfeedback-input" class="swal2-textarea" placeholder="Describe your issue or share your ideas"></textarea>
            <input id="microfeedback-email"
              type="email"
              class="w-full
              h-[3.375rem]
              border border-1
              focus:border-[#B4DBED] focus:shadow-modal-input
              rounded
              mt-2.5
              mb-5
              p-4
              focus:outline-none
              text-[1.25rem]" type="text"
              placeholder="email(optional)"
            >
          `,
          focusConfirm: false,
          preConfirm() {
            const input = document.getElementById('microfeedback-input')
            const email = document.getElementById('microfeedback-email')

            return {
              input: input.value,
              email: email.value,
            }
          },
          showCancelButton: true,
          confirmButtonText: 'Send',
        })
      },
      getPayload(btn, { value: { input, email } }) {
        return {
          body: input,
          extra: {
            email,
            url: document.URL,
            host: location.host,
            size: `${screen.width}x${screen.height}`,
            /* dict: getCookie('dictionary'),
            group_by_length: getCookie('group_by_length', true),
            country: getCookie('country'),
            word_sorting: getCookie('word_sorting', 'points'),
            referrer: document.referrer,
            cid: getCookie('_ga'),
            version: window.APP_VERSION,
            variant: localStore.get(VARIANT),
            api_variant: localStore.get(API_VARIANT), */
          },
        }
      },
      onSuccess() {
        // gtag('event', 'feedback', {})
      },
      showSuccessDialog(btn, input) {
        return btn.alert({
          title: 'Thank you',
          html: 'If you prefer the old version, visit <a class="text-[#007bff] hover:text-[#0056b3] hover:underline" href="https://wordfinderx.com">wordfinderx.com</a>.',
          confirmButtonText: 'Ok',
        })
      },
      confirmButtonColor: '#f7c342',
      onFailure(btn) {
        return btn.alert('Oops', 'Error happened!', 'error')
      },
    })
  },
  methods: {
    ...mapMutations('words', ['SET_SEARCH_OPTIONS', 'SET_SEARCH_DATA']),
    ...mapActions('words', ['getResults', 'showModal']),
    showFeedback() {
      this.showModal('feedback')
    },
    addWildCard() {
      this.SET_SEARCH_DATA({ letters: `${this.letters}?` })
      const path = generateSearchPath(this.searchData)
      this.$router.push(path)
    },
    removeFilters() {
      this.SET_SEARCH_DATA({
        starts_with: '',
        ends_with: '',
        contains: '',
        length: '',
      })
      this.search()
    },
    searchAllDictionaries() {
      this.SET_SEARCH_OPTIONS({ dictionary: 'all_en' })
      this.search()
    },
    async search() {
      await this.getResults()
    },
  },
}
</script>
