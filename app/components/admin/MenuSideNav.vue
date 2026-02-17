<template>
  <UDashboardGroup>
    <UDashboardSidebar
      open
      :toggle="{
        color: 'primary',
        variant: 'ghost',
        class: 'rounded-full'
      }"
    >
      <template #header>
        <UButton
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="goBack"
        >
          Go Back
        </UButton>
      </template>

      <div class="space-y-6 p-4">
        <!-- Restaurant Info -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm font-semibold text-[var(--ui-text-highlighted)]">
            <UIcon name="i-heroicons-building-storefront" class="size-4" />
            Restaurant Info
          </div>

          <UForm :state="restaurantForm" class="space-y-3">
            <UFormField label="Restaurant Name" name="name">
              <UInput v-model="restaurantForm.name" placeholder="Enter restaurant name" size="sm" />
            </UFormField>

            <UButton type="button" size="sm" color="primary" variant="solid" block @click="saveRestaurantInfo">
              Save Changes
            </UButton>
          </UForm>
        </div>

        <div class="border-t border-[var(--ui-border)] my-4" />

        <!-- Menu Categories -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm font-semibold text-[var(--ui-text-highlighted)]">
              <UIcon name="i-heroicons-squares-2x2" class="size-4" />
              Menu Categories
            </div>
            <UButton icon="i-heroicons-plus" size="xs" color="primary" variant="soft" @click="openCreateModal" />
          </div>

          <ClientOnly>
            <!-- Categories list with edit/delete actions -->
            <div v-if="displayCategories && displayCategories.length > 0" class="space-y-1">
              <div v-for="category in displayCategories" :key="category.id" class="flex items-center gap-1 group">
                <!-- Category button -->
                <UButton
                  :to="`/admin/my-menus/menus/${currentMenuUuid}/categories/${category.id}`"
                  color="neutral"
                  variant="ghost"
                  class="flex-1 justify-start"
                  size="sm"
                >
                  <template #leading>
                    <UIcon :name="category.icon || 'i-heroicons-squares-2x2'" class="size-4" />
                  </template>
                  {{ category.name }}
                </UButton>

                <!-- Actions container -->
                <div class="flex items-center gap-0.5">
                  <!-- Edit button -->
                  <UButton
                    icon="i-heroicons-pencil"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    @click.stop="openEditModal(category)"
                  />

                  <!-- Delete button -->
                  <UButton
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    size="xs"
                    :loading="deletingCategoryId === category.id"
                    :disabled="deletingCategoryId !== null"
                    @click.stop="deleteCategory(category.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Loading / Empty states -->
            <p v-else-if="displayCategories === null" class="text-xs text-[var(--ui-text-muted)]">Loading categories...</p>
            <p v-else class="text-xs text-[var(--ui-text-muted)]">No categories yet</p>

            <template #fallback>
              <p class="text-xs text-[var(--ui-text-muted)]">Loading categories...</p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </UDashboardSidebar>

    <UDashboardPanel :ui="{ container: 'max-w-full' }">
      <template #header>
        <UDashboardNavbar title="Menu Creator" />
      </template>

      <slot />
    </UDashboardPanel>

    <!-- Create Category Modal -->
    <AdminCategoryCreateCategoryModal
      v-model:open="isCreateModalOpen"
      :menu-uuid="currentMenuUuid"
      @success="handleModalSuccess"
    />

    <!-- Edit Category Modal -->
    <AdminCategoryEditCategoryModal
      v-model:open="isEditModalOpen"
      :menu-uuid="currentMenuUuid"
      :category="editingCategory"
      @success="handleModalSuccess"
    />
  </UDashboardGroup>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// Types
interface Category {
  id: string | number
  name: string
  icon?: string
  itemCount?: number
}

// Props
const props = defineProps<{
  categories?: Category[]
  menuUuid?: string
}>()

// Get shared state from page
const sharedCategories = useState('menuCategories', () => null)
const sharedMenuUuid = useState<string | null>('currentMenuUuid', () => null)

// Categories to display
const displayCategories = computed(() => props.categories || sharedCategories.value)

// Current menu UUID (props > shared state > route)
const route = useRoute()
const currentMenuUuid = computed(() => {
  if (props.menuUuid) return props.menuUuid
  if (sharedMenuUuid.value) return sharedMenuUuid.value
  return route.params.uuid as string
})

// Restaurant form
const restaurantForm = reactive({ name: 'My Restaurant' })

// Loading states
const deletingCategoryId = ref<string | number | null>(null)

// Modal states
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const editingCategory = ref<Category | null>(null)

// Actions
const goBack = () => navigateTo('/admin')

const saveRestaurantInfo = () => {
  // TODO: Implement save logic
}

// Open create modal
const openCreateModal = () => {
  isCreateModalOpen.value = true
}

// Open edit modal
const openEditModal = (category: Category) => {
  editingCategory.value = category
  isEditModalOpen.value = true
}

// Handle modal success (optional callback)
const handleModalSuccess = () => {
  // Modal already handles state updates
  // This is just for any additional actions if needed
}

const deleteCategory = async (categoryId: string | number) => {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete this category?')) return

  deletingCategoryId.value = categoryId

  try {
    // Call delete API
    await useSanctumClient()(`/api/v1/user/menus/${currentMenuUuid.value}/categories/${categoryId}`, {
      method: 'DELETE'
    })

    // Show success message
    alert('Category deleted successfully')

    // Update shared state immediately
    if (sharedCategories.value) {
      sharedCategories.value = sharedCategories.value.filter((c: Category) => c.id !== categoryId)
    }

    // Refresh categories list in background
    await refreshNuxtData(`menu-${currentMenuUuid.value}-categories`)
  } catch (error) {
    console.error('Failed to delete category:', error)
    alert('Failed to delete category')
  } finally {
    deletingCategoryId.value = null
  }
}
</script>
