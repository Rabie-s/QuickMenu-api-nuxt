<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary/10 to-primary/5 py-24 sm:py-32 px-4">
      <div class="max-w-5xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <UIcon name="i-lucide-sparkles" />
          <span>Restaurant Menu Made Simple</span>
        </div>

        <div class="space-y-4">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Manage Your Restaurant<br class="hidden sm:block" />
            <span class="text-primary">Menu Digitally</span>
          </h1>

          <p class="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create, customize, and manage your restaurant menus with ease.
            Generate beautiful QR codes for your customers to scan and order.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <UButton size="lg" to="/auth/register" class="justify-center">
            Get Started Free
          </UButton>
          <UButton size="lg" color="neutral" variant="outline" to="/auth/login" class="justify-center">
            Sign In
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 sm:py-32 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl sm:text-4xl font-bold">Everything You Need</h2>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features to help you manage your restaurant menu efficiently
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-layout-template" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">Customizable Menus</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Create beautiful menus that match your restaurant's brand identity
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-qr-code" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">QR Code Menus</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Generate QR codes for customers to scan and view your menu instantly
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-refresh-cw" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">Real-time Updates</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Update prices, items, and availability instantly across all platforms
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-folder-open" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">Menu Categories</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Organize items into categories for easy navigation and browsing
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-image" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">Food Photos</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Add appetizing images to make your dishes stand out and attract customers
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex flex-col items-center text-center p-8 space-y-4">
              <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-smartphone" class="text-3xl text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-semibold">Mobile Friendly</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Your menu looks great on any device, anywhere, anytime
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-24 sm:py-32 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2 class="text-3xl sm:text-4xl font-bold">How It Works</h2>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Get started in three simple steps
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-8 sm:gap-12">
          <div class="text-center space-y-4">
            <div class="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto flex-shrink-0">
              1
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Create Account</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Sign up and set up your restaurant profile in minutes
              </p>
            </div>
          </div>

          <div class="text-center space-y-4">
            <div class="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto flex-shrink-0">
              2
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Build Your Menu</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Add categories, items, prices, and beautiful photos
              </p>
            </div>
          </div>

          <div class="text-center space-y-4">
            <div class="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto flex-shrink-0">
              3
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-semibold">Share QR Code</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Print and display your QR code for customers to scan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 sm:py-32 px-4">
      <div class="max-w-4xl mx-auto">
        <UCard class="text-center p-8 sm:p-16 space-y-6">
          <h2 class="text-3xl sm:text-4xl font-bold">Ready to Get Started?</h2>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Join thousands of restaurants already using QuickMenu to digitize their menus
          </p>
          <div class="pt-4">
            <UButton size="lg" to="/auth/register">
              Create Your Free Account
            </UButton>
          </div>
        </UCard>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} QuickMenu. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'QuickMenu - Restaurant Menu Management'
})
</script>
