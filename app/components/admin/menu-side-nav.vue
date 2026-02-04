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
        <!-- Restaurant Info Section -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm font-semibold text-[var(--ui-text-highlighted)]">
            <UIcon name="i-heroicons-building-storefront" class="size-4" />
            Restaurant Info
          </div>

          <UForm :state="restaurantForm" class="space-y-3">
            <UFormField label="Restaurant Name" name="name">
              <UInput
                v-model="restaurantForm.name"
                placeholder="Enter restaurant name"
                size="sm"
              />
            </UFormField>

            <UButton
              type="button"
              size="sm"
              color="primary"
              variant="solid"
              block
              @click="saveRestaurantInfo"
            >
              Save Changes
            </UButton>
          </UForm>
        </div>

        <UDivider />

        <!-- Menu Categories Section -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm font-semibold text-[var(--ui-text-highlighted)]">
              <UIcon name="i-heroicons-squares-2x2" class="size-4" />
              Menu Categories
            </div>
            <UButton
              icon="i-heroicons-plus"
              size="xs"
              color="primary"
              variant="soft"
              @click="addCategory"
            />
          </div>

          <div class="space-y-1">
            <UButton
              v-for="category in menuCategories"
              :key="category.id"
              :to="`/admin/menu-creator/category/${category.id}`"
              color="neutral"
              variant="ghost"
              class="w-full justify-start"
              size="sm"
            >
              <template #leading>
                <UIcon :name="category.icon" class="size-4" />
              </template>
              {{ category.name }}
              <template #trailing>
                <span class="text-xs text-[var(--ui-text-muted)]">{{ category.itemCount }}</span>
              </template>
            </UButton>
          </div>
        </div>
      </div>

      <!-- <template #footer>
        <div class="border-t border-[var(--ui-border)] p-4">
          <div class="flex items-center gap-3">
            <UAvatar
              size="md"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[var(--ui-text)] truncate">Admin User</p>
              <p class="text-xs text-[var(--ui-text-muted)] truncate">admin@quickmenu.com</p>
            </div>
          </div>
        </div>
      </template> -->
    </UDashboardSidebar>

    <UDashboardPanel :ui="{ container: 'max-w-full' }">
      <template #header>
        <UDashboardNavbar title="Menu Creator" />
      </template>

      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>
// Restaurant form state
const restaurantForm = reactive({
  name: 'My Restaurant'
})

// Static menu categories for testing
const menuCategories = ref([
  { id: 1, name: 'Appetizers', icon: 'i-heroicons-fire', itemCount: 12 },
  { id: 2, name: 'Main Courses', icon: 'i-heroicons-rectangle-stack', itemCount: 24 },
  { id: 3, name: 'Desserts', icon: 'i-heroicons-cake', itemCount: 8 },
  { id: 4, name: 'Beverages', icon: 'i-heroicons-beaker', itemCount: 15 },
])

// Methods
const goBack = () => {
  navigateTo('/admin')
}

const saveRestaurantInfo = () => {
  console.log('Saving restaurant info:', restaurantForm.name)
}

const addCategory = () => {
  navigateTo('/admin/menu-creator/category/new')
}
</script>