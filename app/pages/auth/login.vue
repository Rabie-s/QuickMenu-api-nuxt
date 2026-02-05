<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
  }
]

function onSubmit(payload: any) {
  console.log('Login submitted:', payload.data)
  // TODO: Implement login logic
}
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
