// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  colorMode: {
    preference: 'system'
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register']
    }
  },
  components: [
    {
      path: '~/components/layout',
      pathPrefix: false
    },
    '~/components'
  ],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    public: {
      redirectUrl: process.env.NUXT_PUBLIC_REDIRECT_URL
    }
  }
})
