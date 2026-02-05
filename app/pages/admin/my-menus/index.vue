<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">My Menus</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your restaurant menus</p>
      </div>
      <UButton to="/admin/my-menus/create" icon="i-lucide-plus">
        Create New Menu
      </UButton>
    </div>

    <!-- Restaurant Card -->
    <AdminRestaurantCard
      title="Restaurant Name"

      @details="handleDetails"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script lang="ts" setup>
const handleDetails = () => {
  console.log('Details clicked')
}

const handleEdit = () => {
  console.log('Edit clicked')
}

const handleDelete = () => {
  console.log('Delete clicked')
}
</script>