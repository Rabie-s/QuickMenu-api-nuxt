<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface NavItem {
  label: string
  icon: string
  to?: string
  children?: NavItem[]
}

const navigation = ref<NavItem[]>([
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/admin'
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/admin/users'
  },
  {
    label: 'Products',
    icon: 'i-heroicons-cube',
    to: '/admin/products'
  },
  {
    label: 'Catalog',
    icon: 'i-heroicons-folder',
    children: [
      { label: 'Categories', icon: 'i-heroicons-tag', to: '/admin/catalog/categories' },
      { label: 'Brands', icon: 'i-heroicons-bookmark', to: '/admin/catalog/brands' },
      { label: 'Attributes', icon: 'i-heroicons-list-bullet', to: '/admin/catalog/attributes' }
    ]
  },
  {
    label: 'Orders',
    icon: 'i-heroicons-shopping-cart',
    to: '/admin/orders'
  },
  {
    label: 'Analytics',
    icon: 'i-heroicons-chart-bar',
    children: [
      { label: 'Overview', icon: 'i-heroicons-chart-pie', to: '/admin/analytics/overview' },
      { label: 'Sales', icon: 'i-heroicons-currency-dollar', to: '/admin/analytics/sales' },
      { label: 'Reports', icon: 'i-heroicons-document-text', to: '/admin/analytics/reports' }
    ]
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/admin/settings'
  }
])

const openDropdowns = ref<Set<string>>(new Set())
const isMobileMenuOpen = ref(false)
const isAvatarDropdownOpen = ref(false)

const avatarMenuRef = ref<HTMLElement | null>(null)

function toggleDropdown(label: string) {
  if (openDropdowns.value.has(label)) {
    openDropdowns.value.delete(label)
  } else {
    openDropdowns.value.add(label)
  }
}

function isDropdownOpen(label: string): boolean {
  return openDropdowns.value.has(label)
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function toggleAvatarDropdown() {
  isAvatarDropdownOpen.value = !isAvatarDropdownOpen.value
}

function closeAvatarDropdown() {
  isAvatarDropdownOpen.value = false
}

// Close dropdowns when clicking outside
onClickOutside(avatarMenuRef, closeAvatarDropdown)

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
  closeAvatarDropdown()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Top Header -->
    <header class="fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between h-full px-4 lg:px-6">
        <!-- Left: Menu Toggle + Logo -->
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <UIcon :name="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6" />
          </button>

          <!-- Logo -->
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        </div>

        <!-- Right: Header Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button class="hidden sm:flex p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
          </button>

          <!-- Notifications -->
          <button class="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <UIcon name="i-heroicons-bell" class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- User Avatar Dropdown -->
          <div ref="avatarMenuRef" class="relative">
            <button
              @click="toggleAvatarDropdown"
              class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all"
            >
              A
            </button>

            <!-- Avatar Dropdown Menu -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-2"
            >
              <div
                v-if="isAvatarDropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
              >
                <!-- User Info -->
                <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">admin@example.com</p>
                </div>

                <!-- Menu Items -->
                <div class="py-1">
                  <NuxtLink
                    to="/admin/profile"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    @click="closeAvatarDropdown"
                  >
                    <UIcon name="i-heroicons-user" class="w-4 h-4" />
                    <span>My Profile</span>
                  </NuxtLink>

                  <button
                    class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    @click="closeAvatarDropdown"
                  >
                    <UIcon name="i-heroicons-arrow-left-on-rectangle" class="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        @click="closeMobileMenu"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed top-16 left-0 z-50 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Navigation -->
      <nav class="p-4 h-full overflow-y-auto">
        <ul class="space-y-1">
          <li v-for="item in navigation" :key="item.label">
            <!-- Dropdown Menu -->
            <div v-if="item.children">
              <button
                @click="toggleDropdown(item.label)"
                class="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                :class="{ 'bg-gray-100 dark:bg-gray-800 font-medium': isDropdownOpen(item.label) }"
              >
                <div class="flex items-center gap-3">
                  <UIcon :name="item.icon" class="w-5 h-5" />
                  <span>{{ item.label }}</span>
                </div>
                <UIcon
                  :name="isDropdownOpen(item.label) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                  class="w-4 h-4 transition-transform duration-200"
                />
              </button>

              <!-- Nested Items -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <ul v-if="isDropdownOpen(item.label)" class="mt-1 ml-4 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3">
                  <li v-for="child in item.children" :key="child.to">
                    <NuxtLink
                      :to="child.to"
                      class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      active-class="bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium"
                    >
                      <UIcon :name="child.icon" class="w-4 h-4" />
                      <span>{{ child.label }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </Transition>
            </div>

            <!-- Regular Link -->
            <NuxtLink
              v-else
              :to="item.to"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>
