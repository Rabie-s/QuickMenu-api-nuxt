<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

// Store validation errors for each field
const errors = ref<Record<string, string>>({})

// Store success state
const isSubmitted = ref(false)

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    error: errors.value.email || undefined
  }
])

async function onSubmit(payload: any) {
  const config = useRuntimeConfig()

  // Clear previous errors
  errors.value = {}
  isSubmitted.value = false

  try {
    // Send password reset link
    const response = await $fetch(`${config.public.API_BASE_URL}/v1/user/auth/forgot-password`, {
      method: 'POST',
      body: payload.data,
    }) as { success: boolean; message: string }

    // Check if request was successful
    if (response?.success) {
      isSubmitted.value = true
    }
  } catch (error: any) {
    // Handle Laravel validation errors (422)
    if (error.statusCode === 422 && error.data?.errors) {
      const errorMessages = error.data.errors

      // Map Laravel errors to form fields
      for (const [field, messages] of Object.entries(errorMessages)) {
        const message = Array.isArray(messages) ? messages[0] : messages
        errors.value[field] = String(message)
      }
    } else if (error.data?.message) {
      // Handle other errors with message from new API format
      errors.value.email = error.data.message
    } else {
      // Handle unknown errors
      errors.value.email = 'Failed to send reset link. Please try again.'
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <UPageCard class="w-full max-w-md">
      <!-- Success State -->
      <div v-if="isSubmitted" class="text-center space-y-4">
        <div class="flex justify-center">
          <UIcon name="i-lucide-mail-check" class="text-6xl text-green-500" />
        </div>
        <h2 class="text-2xl font-bold">Check Your Email</h2>
        <p class="text-gray-500 dark:text-gray-400">
          We've sent a password reset link to your email address.
        </p>
        <UButton to="/auth/login" variant="outline" block>
          Back to Login
        </UButton>
      </div>

      <!-- Form State -->
      <UAuthForm
        v-else
        :fields="fields"
        title="Forgot Password?"
        description="Enter your email to receive a reset link"
        icon="i-lucide-key"
        :submit="{ label: 'Send Reset Link' }"
        @submit="onSubmit"
      >
        <template #description>
          Enter your email to receive a reset link. <NuxtLink to="/auth/login" class="text-primary font-medium">Back to login</NuxtLink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
