<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :fields="fields"
        title="Create Account"
        description="Already have an account?"
        icon="i-lucide-user"
        :submit="{ label: 'Sign Up' }"
        @submit="onSubmit"
      >
        <template #description>
          Already have an account? <NuxtLink to="/auth/login" class="text-primary font-medium">Sign in</NuxtLink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

// Store validation errors for each field
const errors = ref<Record<string, string>>({})

// Nuxt Auth Sanctum
const { login } = useSanctumAuth()

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'full_name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
    error: errors.value.full_name || undefined
  },
  {
    name: 'phone_number',
    type: 'text',
    label: 'Phone Number',
    placeholder: '+1 234 567 8900',
    required: true,
    error: errors.value.phone_number || undefined
  },
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
    placeholder: 'Create a password',
    required: true,
    error: errors.value.password || undefined
  }
])

async function onSubmit(payload: any) {
  // Clear previous errors
  errors.value = {}

  const { data, error } = await useSanctumFetch('/api/v1/user/auth/register', {
    method: 'POST',
    body: payload.data,
  })

  // Check for errors
  if (error.value) {
    const err = error.value

    // Handle Laravel validation errors (422)
    if (err.statusCode === 422 && err.data?.errors) {
      const errorMessages = err.data.errors

      // Map Laravel errors to form fields
      for (const [field, messages] of Object.entries(errorMessages)) {
        const message = Array.isArray(messages) ? messages[0] : messages
        errors.value[field] = String(message)
      }
    } else if (err.data?.message) {
      // Handle other errors with message from new API format
      errors.value.email = err.data.message
    } else {
      // Handle unknown errors
      errors.value.email = 'Registration failed. Please try again.'
    }
    return
  }

  // Check if registration was successful
  if (data.value?.success) {
    // Auto-login after successful registration
    await login({
      email: payload.data.email,
      password: payload.data.password
    } as any)

    // Redirect to dashboard or home page
    await navigateTo('/')
  }
}
</script>