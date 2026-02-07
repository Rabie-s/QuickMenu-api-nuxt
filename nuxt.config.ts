// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-auth-sanctum'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: 'http://localhost:8000/api'
    }
  },

  sanctum: {
    baseUrl: 'http://127.0.0.1:8000',
    endpoints: {
      login: '/api/v1/user/auth/login',
      logout: '/api/v1/user/logout',
      user: '/api/v1/user/auth/me'
    },
    // For CSR (Client-Side Rendering) mode
    origin: 'http://localhost:3000',
    // Use server middleware to proxy requests (bypasses CORS)
    mode: 'cookie',
    // Redirect to login page when not authenticated
    redirect: {
      keepRequestedRoute: true
    }
  }
})
