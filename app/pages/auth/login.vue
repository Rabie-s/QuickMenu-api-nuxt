<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

// Store validation errors for each field
const errors = ref<Record<string, string>>({})

// Nuxt Auth Sanctum
const { login, isAuthenticated } = useSanctumAuth()

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    error: errors.value.email || undefined
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    error: errors.value.password || undefined
  }
])

async function onSubmit(payload: any) {
  // Clear previous errors
  errors.value = {}

  try {
    await login({
      email: payload.data.email,
      password: payload.data.password
    } as any)

    // Redirect to dashboard or home page
    await navigateTo('/')
  } catch (error: any) {
    // Handle Laravel validation errors (422)
    if (error.statusCode === 422 && error.data?.errors) {
      const errorMessages = error.data.errors

      // Map Laravel errors to form fields
      for (const [field, messages] of Object.entries(errorMessages)) {
        const message = Array.isArray(messages) ? messages[0] : messages
        errors.value[field] = String(message)
      }
    } else {
      // Handle other errors (invalid credentials, etc.)
      errors.value.email = error.data?.message || 'Invalid credentials'
    }
  }
}

// Redirect if already authenticated
watchEffect(() => {
  if (isAuthenticated.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :fields="fields"
        title="Welcome back!"
        description="Don't have an account?"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <NuxtLink to="/auth/register" class="text-primary font-medium">Sign up</NuxtLink>
        </template>
        <template #password-hint>
          <NuxtLink to="/auth/forgot-password" class="text-primary font-medium" tabindex="-1">Forgot password?</NuxtLink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
