<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true
  }
]

function onSubmit(payload: any) {
  console.log('Reset password requested:', payload.data)
  // TODO: Implement password reset logic
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
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
