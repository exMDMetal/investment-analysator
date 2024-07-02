// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel-edge',
    // storage: {
    //   voe: { driver: 'fs', base: './db' }
    // },
    // devStorage: {
    //   voe: { driver: 'fs', base: './db' }
    // }
  }
})
