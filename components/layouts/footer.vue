<template>
  <div class="bg-seagreen-300 pt-6 text-white text-[0.875rem] leading-[21px]">
    <w-container>
      <div
        class="
          my-4
          text-center
          flex
          items-start
          mobile:items-center mobile:flex-col
        "
      >
        <div class="flex-1 self-stretch flex flex-col items-center my-4">
          <a class="mx-auto mb-4 py-[5px]" href="/">
            <img
              alt="Wordtips"
              src="~/assets/logos/wordtips.svg"
              class="h-[1.875rem]"
            />
          </a>
          <w-button
            ref="microfeedback-button"
            type="submit"
            classes="w-auto h-auto mx-auto px-[22px] py-[4px] text-gray-700 text-[18px] flex justify-between items-center active:relative active:top-1 active:left-1 transition-all duration-300 ease"
          >
            <ChatIcon class="mr-[0.7rem]" />
            <span>Feedback</span>
          </w-button>
        </div>
        <div class="flex-1 self-stretch flex flex-col items-center my-4">
          <h5 class="uppercase text-xs font-bold mb-2 leading-4">RESOURCES</h5>
          <ul class="mb-4 list-none">
            <li><a href="/blog">Articles</a></li>
            <li><a href="/popular-pages">Popular Pages</a></li>
            <li><a href="/top-searches">Top Searches</a></li>
            <li>
              <a href="/external-resources">External Resources</a>
            </li>
            <li><a href="/tools">Tools</a></li>
            <li>
              <a href="/definitions">Definitions</a>
            </li>
          </ul>
        </div>
        <div class="flex-1 self-stretch flex flex-col items-center my-4">
          <h5 class="uppercase text-xs font-bold mb-2 leading-4">ABOUT</h5>
          <ul class="mb-4 list-none">
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div class="flex-1 self-stretch flex flex-col items-center my-4">
          <h5 class="uppercase text-xs font-bold mb-2 leading-4">LINKS</h5>
          <ul class="mb-4 list-none">
            <li><a href="https://anagram-solver.io">Anagram Solver</a></li>
            <li><a href="https://wordfinderx.com">WordFinderX</a></li>
            <li><a href="https://lettersolver.com">Letter Solver</a></li>
            <li>
              <a href="https://games.word.tips/?arkpromo=Site_Footer/"
                >Free Games</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="py-4 text-center">
        © {{ new Date().getFullYear() }} Copyright: word.tips
      </div>
    </w-container>
  </div>
</template>

<script>
import microfeedback from 'microfeedback-button'
import WContainer from '~/components/shared/w-container.vue'
import WButton from '~/components/shared/w-button.vue'
import ChatIcon from '~/assets/icons/chat.svg?inline'

// Footer Component
export default {
  name: 'Footer',
  components: { WContainer, WButton, ChatIcon },
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
}
</script>
