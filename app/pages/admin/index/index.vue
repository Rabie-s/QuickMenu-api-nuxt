<template>
  <div class="space-y-6 p-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's an overview of your account.
        </p>
      </div>
      <UButton to="/admin/my-menus" icon="i-lucide-plus">
        Create New Menu
      </UButton>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Menus Card -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-lg">
                <UIcon name="i-lucide-utensils" class="w-5 h-5 text-primary" />
              </div>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Menus</span>
            </div>
          </div>
        </template>

        <div class="space-y-2">
          <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ totalMenus }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Active menus across your account
          </p>
        </div>

        <template #footer>
          <div class="flex items-center gap-2 text-sm">
            <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4 text-green-500" />
            <span class="text-green-500">+{{ menuGrowth }}%</span>
            <span class="text-gray-500 dark:text-gray-400">from last month</span>
          </div>
        </template>
      </UCard>

      <!-- Subscription Type Card -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-500/10 rounded-lg">
                <UIcon name="i-lucide-crown" class="w-5 h-5 text-purple-500" />
              </div>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Subscription</span>
            </div>
            <UBadge color="purple" variant="subtle">{{ subscriptionPlan }}</UBadge>
          </div>
        </template>

        <div class="space-y-2">
          <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ subscriptionPrice }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Billed {{ billingCycle }}
          </p>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Renews on {{ renewalDate }}
            </span>
            <UButton to="/settings/billing" size="xs" variant="ghost" color="neutral">
              Manage
            </UButton>
          </div>
        </template>
      </UCard>

      <!-- Storage Card (Placeholder) -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-500/10 rounded-lg">
                <UIcon name="i-lucide-hard-drive" class="w-5 h-5 text-blue-500" />
              </div>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Storage</span>
            </div>
          </div>
        </template>

        <div class="space-y-3">
          <div class="flex items-baseline gap-2">
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ storageUsed }}</p>
            <span class="text-sm text-gray-500 dark:text-gray-400">of {{ storageTotal }} used</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: storagePercentage + '%' }"
            />
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ storageRemaining }} remaining
          </p>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ imagesCount }} images stored
            </span>
            <UButton size="xs" variant="ghost" color="neutral">
              View Files
            </UButton>
          </div>
        </template>
      </UCard>
    </div>

    <!-- Menus Table -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Your Menus</h2>
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search menus..."
            size="sm"
            class="w-64"
          />
        </div>
      </template>

      <div v-if="isLoading" class="text-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 mx-auto mb-3 animate-spin" />
        <p class="text-gray-500 dark:text-gray-400">Loading menus...</p>
      </div>

      <div v-else-if="filteredMenus.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-document" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p class="text-gray-500 dark:text-gray-400 mb-2">
          {{ searchQuery ? 'No menus match your search' : 'No menus found' }}
        </p>
        <p v-if="!searchQuery" class="text-sm text-gray-400 dark:text-gray-500 mb-4">
          Create your first menu to get started!
        </p>
        <UButton v-if="!searchQuery" to="/admin/my-menus/create" icon="i-lucide-plus">
          Create Your First Menu
        </UButton>
      </div>

      <UTable
        v-else
        :rows="filteredMenus"
        :columns="columns"
        :ui="{
          td: { base: 'whitespace-nowrap' }
        }"
      >
        <!-- Menu Cover Image -->
        <template #cover_image-data="{ row }">
          <img
            :src="row.cover_image
              ? `http://localhost:8000/storage/${row.cover_image}`
              : 'https://via.placeholder.com/64x64?text=No+Image'"
            :alt="row.name"
            class="w-12 h-12 rounded-lg object-cover"
          />
        </template>

        <!-- Menu Name -->
        <template #name-data="{ row }">
          <div class="flex flex-col">
            <span class="font-medium text-gray-900 dark:text-white">{{ row.name }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">UUID: {{ row.uuid }}</span>
          </div>
        </template>

        <!-- Status Badge -->
        <template #is_available-data="{ row }">
          <UBadge
            :color="row.is_available ? 'success' : 'error'"
            variant="subtle"
            size="xs"
          >
            {{ row.is_available ? 'Active' : 'Inactive' }}
          </UBadge>
        </template>

        <!-- Actions -->
        <template #actions-data="{ row }">
          <div class="flex items-center gap-1">
            <UButton
              :to="`/admin/my-menus/menus/${row.uuid}`"
              icon="i-heroicons-eye"
              color="neutral"
              variant="ghost"
              size="xs"
            />
            <UButton
              :to="`/admin/my-menus/menus/${row.uuid}`"
              icon="i-heroicons-pencil"
              color="neutral"
              variant="ghost"
              size="xs"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              size="xs"
              @click="confirmDelete(row)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="isDeleteModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-red-500/10 rounded-lg">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete Menu</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete <span class="font-semibold text-gray-900 dark:text-white">{{ menuToDelete?.name }}</span>?
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This action cannot be undone. All categories and menu items within this menu will be permanently deleted.
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="outline"
              :disabled="isDeleting"
              @click="closeDeleteModal"
            >
              Cancel
            </UButton>
            <UButton color="error" :loading="isDeleting" @click="deleteMenu">
              Delete Menu
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Define types
interface Menu {
  uuid: string
  name: string
  cover_image?: string | null
  is_available: boolean | number
  created_at?: string
}

// Stats data (placeholder values)
const totalMenus = ref(12)
const menuGrowth = ref(25)
const subscriptionPlan = ref('Premium')
const subscriptionPrice = ref('$29.00')
const billingCycle = ref('monthly')
const renewalDate = ref('Mar 18, 2026')

const storageUsed = ref('2.4 GB')
const storageTotal = ref('10 GB')
const storagePercentage = ref(24)
const storageRemaining = ref('7.6 GB')
const imagesCount = ref(156)

// Table state
const searchQuery = ref('')
const isLoading = ref(false)
const menus = ref<Menu[]>([])
const isDeleteModalOpen = ref(false)
const menuToDelete = ref<Menu | null>(null)
const isDeleting = ref(false)

// Table columns
const columns = [
  {
    key: 'cover_image',
    label: '',
    class: 'w-16'
  },
  {
    key: 'name',
    label: 'Menu Name',
    class: 'min-w-[200px]'
  },
  {
    key: 'is_available',
    label: 'Status',
    class: 'w-32'
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-32 text-right'
  }
]

// Fetch menus
const fetchMenus = async () => {
  isLoading.value = true
  try {
    const client = useSanctumClient()
    const response = await client('/api/v1/user/menu') as { data: { data: Menu[] } }

    menus.value = response?.data?.data || []

    // Update total menus count
    totalMenus.value = menus.value.length
  } catch (error) {
    console.error('Failed to fetch menus:', error)
  } finally {
    isLoading.value = false
  }
}

// Filter menus based on search query
const filteredMenus = computed(() => {
  if (!searchQuery.value) return menus.value

  const query = searchQuery.value.toLowerCase()
  return menus.value.filter((menu: Menu) =>
    menu.name.toLowerCase().includes(query)
  )
})

// Confirm delete
const confirmDelete = (menu: Menu) => {
  menuToDelete.value = menu
  isDeleteModalOpen.value = true
}

// Close delete modal
const closeDeleteModal = () => {
  if (!isDeleting.value) {
    isDeleteModalOpen.value = false
    menuToDelete.value = null
  }
}

// Delete menu
const deleteMenu = async () => {
  if (!menuToDelete.value) return

  isDeleting.value = true
  try {
    const { error, data } = await useSanctumFetch(`/api/v1/user/menu/${menuToDelete.value.uuid}`, {
      method: 'DELETE'
    })

    if (error.value) {
      const errorMessage = error.value?.data?.message || error.value?.statusText || 'Failed to delete menu'
      throw new Error(errorMessage)
    }

    // Remove from local state
    menus.value = menus.value.filter(m => m.uuid !== menuToDelete.value!.uuid)
    totalMenus.value = menus.value.length

    // Show success message
    useToast().add({
      title: 'Success',
      description: 'Menu deleted successfully',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    // Close modal
    isDeleteModalOpen.value = false
    menuToDelete.value = null
  } catch (error: any) {
    console.error('Failed to delete menu:', error)
    const message = error?.message || 'Failed to delete menu. Please try again.'

    // Show error toast
    useToast().add({
      title: 'Error',
      description: message,
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  } finally {
    isDeleting.value = false
  }
}

// Fetch menus on mount
onMounted(() => {
  fetchMenus()
})
</script>
