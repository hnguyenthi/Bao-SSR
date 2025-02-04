import type { NuxtPage } from 'nuxt/schema';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: 'http://localhost/'
    },
  },
  compatibilityDate: '2025-01-29',
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (page.path !== '/user/login' && page.path !== '/admin/login') {
            page.meta ||= {}
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: ['~/assets/scss/tailwind.scss', { injectPosition: "first" }],
    config: [
      'tailwind.config.ts',
    ]
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  plugins: [
    '~/plugins/global',
  ]
})