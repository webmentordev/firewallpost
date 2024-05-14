// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', "@nuxt/image", "@nuxtjs/sitemap"],
  runtimeConfig: {
    public: {
      "api": process.env.NUXT_URL
    }
  },
  site: {
    url: `${process.env.NUXT_URL}`,
  },
  image: {
    domains: [ `${process.env.NUXT_LINK}` ]
  },
  app: {
    head: {
      title: "Firewall Post — Linux & Gaming",
      link: [
        {
          rel: "shortcut icon",
          href: "/logo.png"
        }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: "description",
          content: "Firewall posts related to web development, game servers and linux related content"
        }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})