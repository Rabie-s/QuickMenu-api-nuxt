<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold">QuickMenu Dashboard</h1>

        <div class="flex items-center gap-4">
          <!-- User Info -->
          <div v-if="user" class="text-sm">
            <span class="text-gray-600 dark:text-gray-400">Welcome, </span>
            <span class="font-medium">{{ user.name || user.email }}</span>
          </div>

          <!-- Logout Button -->
          <UButton
            size="sm"
            color="neutral"
            variant="outline"
            :loading="pending"
            @click="handleLogout"
          >
            Logout
          </UButton>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="space-y-8">
        <!-- User Info Card -->
        <UCard>
          <template #title>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-user" />
              <span>Profile Information</span>
            </div>
          </template>

          <div v-if="user" class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
              <p class="text-lg">{{ user.full_name || 'Not set' }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
              <p class="text-lg">{{ user.email }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
              <p class="text-lg">{{ user.phone_number || 'Not set' }}</p>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            Loading user information...
          </div>
        </UCard>

        <!-- Quick Actions -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard>
            <div class="flex flex-col items-center text-center p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-layout-template" class="text-2xl text-primary" />
              </div>
              <h3 class="font-semibold">My Menus</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Manage your restaurant menus</p>
              <UButton to="/menus" variant="outline" class="w-full">View Menus</UButton>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-qr-code" class="text-2xl text-primary" />
              </div>
              <h3 class="font-semibold">QR Codes</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Generate QR codes for your menus</p>
              <UButton to="/qr-codes" variant="outline" class="w-full">Generate</UButton>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-settings" class="text-2xl text-primary" />
              </div>
              <h3 class="font-semibold">Settings</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Update your account settings</p>
              <UButton to="/settings" variant="outline" class="w-full">Settings</UButton>
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Add middleware to protect this route
definePageMeta({
  middleware: 'sanctum'
})

// Get auth state from nuxt-auth-sanctum
const { user, logout, isAuthenticated } = useSanctumAuth()

const pending = ref(false)

async function handleLogout() {
  pending.value = true
  try {
    await logout()
    await navigateTo('/auth/login')
  } finally {
    pending.value = false
  }
}

// Redirect if not authenticated
watchEffect(() => {
  if (!isAuthenticated.value) {
    navigateTo('/auth/login')
  }
})

useHead({
  title: 'Dashboard - QuickMenu'
})
</script>
