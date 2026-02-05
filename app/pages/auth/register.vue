<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields: AuthFormField[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone Number',
    placeholder: '+1 234 567 8900',
    required: true
  },
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
    placeholder: 'Create a password',
    required: true
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true
  }
]

function onSubmit(payload: any) {
  console.log('Register submitted:', payload.data)
  // TODO: Implement registration logic
}
</script>

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
