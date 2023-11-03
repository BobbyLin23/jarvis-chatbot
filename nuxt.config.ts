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
      baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  }
})
