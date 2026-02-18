<template>
  <div class="space-y-6">
    <!-- Header -->
    <div v-if="selectedCategory" class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">{{ selectedCategory.name }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage menu items in this category
        </p>
      </div>
      <UButton icon="i-lucide-plus">
        Create New Menu Item
      </UButton>
    </div>

    <!-- Empty state when no category selected -->
    <div v-else class="flex flex-col items-center justify-center py-20">
      <UIcon name="i-heroicons-squares-2x2" class="w-16 h-16 text-gray-400 mb-4" />
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Select a Category
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
        Choose a category from the sidebar to view and manage its menu items
      </p>
    </div>

    <!-- Menu Items Grid -->
    <div v-if="selectedCategory" class="grid gap-4">
      <ClientOnly>
        <template v-if="menuItems && menuItems.length > 0">
          <AdminMenuItemCard
            v-for="item in menuItems"
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
        <div v-else-if="!pendingItems" class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">
            No menu items in this category. Create your first item!
          </p>
        </div>
        <template #fallback>
          <p class="text-center py-12 text-gray-500 dark:text-gray-400">Loading menu items...</p>
        </template>
      </ClientOnly>
    </div>
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
  console.log('Edit item:', item)
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
