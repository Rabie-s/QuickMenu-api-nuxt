// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-auth-sanctum', '@nuxt/hints'],

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
      API_BASE_URL: 'http://localhost:8000/api',
    }
  },

  sanctum: {
    baseUrl: 'http://localhost:8000', // Laravel API URL
    origin: 'http://localhost:3000', // Nuxt app URL
    userStateKey: 'sanctum.user.identity', // Custom state key for user object
    redirectIfAuthenticated: false,
    redirectIfUnauthenticated: false,
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/api/v1/user/auth/login',
      logout: '/api/v1/user/auth/logout',
      user: '/api/v1/user/auth/me',
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },
    client: {
      retry: false,
    },
    redirect: {
      keepRequestedRoute: true,
      onLogin: '/admin',
      onLogout: '/auth/login',
      onAuthOnly: '/login',
      onGuestOnly: '/',
    },
  },
})