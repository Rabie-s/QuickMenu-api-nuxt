<template>
  <div class="space-y-6">
    <!-- Enhanced Header -->
    <div v-if="selectedCategory" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- Top Row: Title + Create Button -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-primary/10 rounded-lg">
            <UIcon :name="selectedCategory.icon || 'i-heroicons-squares-2x2'" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedCategory.name }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {{ menuItems?.length || 0 }} items in this category
            </p>
          </div>
        </div>
        <UButton icon="i-lucide-plus" size="lg" @click="isCreateModalOpen = true">
          Create New Menu Item
        </UButton>
      </div>

      <!-- Bottom Row: Filter & Sort Options -->
      <div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
        <UButtonGroup size="sm">
          <UButton
            :color="filterAvailability === 'all' ? 'primary' : 'neutral'"
            :variant="filterAvailability === 'all' ? 'solid' : 'ghost'"
            @click="filterAvailability = 'all'"
          >
            All Items
          </UButton>
          <UButton
            :color="filterAvailability === 'available' ? 'primary' : 'neutral'"
            :variant="filterAvailability === 'available' ? 'solid' : 'ghost'"
            @click="filterAvailability = 'available'"
          >
            Available
          </UButton>
          <UButton
            :color="filterAvailability === 'unavailable' ? 'primary' : 'neutral'"
            :variant="filterAvailability === 'unavailable' ? 'solid' : 'ghost'"
            @click="filterAvailability = 'unavailable'"
          >
            Unavailable
          </UButton>
        </UButtonGroup>

        <div class="flex-1" />

        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
        <USelectMenu
          v-model="sortBy"
          :options="sortOptions"
          value-attribute="value"
          option-attribute="label"
          size="sm"
          class="w-40"
        />
      </div>
    </div>

    <!-- Empty state when no category selected -->
    <div v-else class="flex flex-col items-center justify-center py-20">
      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
        <UIcon name="i-heroicons-squares-2x2" class="w-16 h-16 text-gray-400" />
      </div>
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Select a Category
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        Choose a category from the sidebar to view and manage its menu items
      </p>
    </div>

    <!-- Menu Items Grid -->
    <div v-if="selectedCategory" class="grid gap-4">
      <ClientOnly>
        <template v-if="filteredItems && filteredItems.length > 0">
          <AdminMenuItemCard
            v-for="item in filteredItems"
            :key="item.id"
            :name="item.name"
            :description="item.description"
            :price="Number(item.price)"
            :image="item.image"
            :isAvailable="Boolean(item.is_available)"
            @show="showItem(item)"
            @edit="editItem(item)"
            @remove="deleteItem(item.id)"
          />
        </template>
        <div v-else-if="!pendingItems && menuItems && menuItems.length > 0" class="text-center py-12">
          <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p class="text-gray-500 dark:text-gray-400">
            No menu items match your current filter.
          </p>
        </div>
        <div v-else-if="!pendingItems" class="text-center py-12">
          <UIcon name="i-heroicons-plus-circle" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p class="text-gray-500 dark:text-gray-400 mb-2">
            No menu items in this category.
          </p>
          <p class="text-sm text-gray-400 dark:text-gray-500">
            Click "Create New Menu Item" to add your first item!
          </p>
        </div>
        <template #fallback>
          <p class="text-center py-12 text-gray-500 dark:text-gray-400">Loading menu items...</p>
        </template>
      </ClientOnly>
    </div>

    <!-- Create Menu Item Modal -->
    <AdminMenuCreateMenuItemModal
      v-if="categoryId"
      v-model:open="isCreateModalOpen"
      :menu-uuid="uuid"
      :category-id="categoryId"
      @success="refreshItems"
    />

    <!-- Edit Menu Item Modal -->
    <AdminMenuEditMenuItemModal
      v-if="categoryId && editingItem"
      v-model:open="isEditModalOpen"
      :menu-uuid="uuid"
      :category-id="categoryId"
      :item="editingItem"
      @success="refreshItems"
    />
  </div>
</template>

<script setup lang="ts">
// Get menu UUID from route
const route = useRoute()
const uuid = route.params.uuid as string

// Get category ID from route query param
const categoryId = computed(() => route.query.category as string | undefined)

// Fetch categories for this menu
const { data: categories } = await useAsyncData(
  `menu-${uuid}-categories`,
  () => useSanctumClient()(`/api/v1/user/menus/${uuid}/categories`),
  {
    transform: (response) => response?.data?.data
  }
)

// Share categories and UUID across components using useState
const menuCategories = useState('menuCategories', () => null)
const menuUuid = useState('currentMenuUuid', () => uuid)

// Sync categories to state when it changes
watch(categories, (newCategories) => {
  menuCategories.value = newCategories
}, { immediate: true })

// Modal state
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const editingItem = ref<any>(null)

// Filter state
const filterAvailability = ref<'all' | 'available' | 'unavailable'>('all')

// Sort state
const sortBy = ref('name-asc')
const sortOptions = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Price (Low-High)', value: 'price-asc' },
  { label: 'Price (High-Low)', value: 'price-desc' }
]

// Filtered and sorted menu items
const filteredItems = computed(() => {
  if (!menuItems.value) return []

  let items = [...menuItems.value]

  // Apply availability filter
  if (filterAvailability.value === 'available') {
    items = items.filter((item: any) => Boolean(item.is_available))
  } else if (filterAvailability.value === 'unavailable') {
    items = items.filter((item: any) => !Boolean(item.is_available))
  }

  // Apply sorting
  items.sort((a: any, b: any) => {
    switch (sortBy.value) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'price-asc':
        return Number(a.price) - Number(b.price)
      case 'price-desc':
        return Number(b.price) - Number(a.price)
      default:
        return 0
    }
  })

  return items
})

// Get selected category
const selectedCategory = computed(() => {
  if (!categories.value || !categoryId.value) return null
  return categories.value.find((c: any) => c.id == categoryId.value) || null
})

// Fetch menu items for selected category
const { data: menuItems, pending: pendingItems, refresh: refreshItems } = await useAsyncData(
  computed(() => `menu-${uuid}-category-${categoryId.value}-items`),
  () => {
    if (!categoryId.value) return null
    return useSanctumClient()(`/api/v1/user/menus/${uuid}/categories/${categoryId.value}/items`)
  },
  {
    transform: (response) => response?.data?.data ?? [],
    watch: [categoryId]
  }
)

// Actions
const showItem = (item: any) => {
  console.log('Show item:', item)
}

const editItem = (item: any) => {
  editingItem.value = item
  isEditModalOpen.value = true
}

const deleteItem = async (itemId: string | number) => {
  if (!confirm('Are you sure you want to delete this menu item?')) return

  try {
    await useSanctumClient()(`/api/v1/user/menus/${uuid}/categories/${categoryId.value}/items/${itemId}`, {
      method: 'DELETE'
    })
    alert('Menu item deleted successfully')
    refreshItems()
  } catch (error) {
    console.error('Failed to delete menu item:', error)
    alert('Failed to delete menu item')
  }
}
</script>
