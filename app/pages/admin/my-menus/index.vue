<template>
  <div class="space-y-4">
    <!-- TEST DIV - Full width with red background -->
    <div class="w-full bg-red-500 text-white p-4 text-center">
      TEST DIV - This should be full width
    </div>

    <UCard :ui="{ container: { base: 'w-full' } }">
      <div class="flex items-center gap-4">
        <!-- Image -->
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx2iMfk3hb9vN7shqssP8WEZZRg7v4Yjr3w&s"
          alt="Restaurant"
          class="h-24 w-32 rounded-lg object-cover flex-shrink-0"
        >

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-semibold">Restaurant Name</h2>
          <p class="text-sm text-[var(--ui-text-muted)] truncate">Description goes here...</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 flex-shrink-0">
          <UButton
            icon="i-heroicons-eye"
            color="primary"
            variant="soft"
            size="sm"
          >
            Details
          </UButton>
          <UButton
            icon="i-heroicons-pencil"
            color="neutral"
            variant="soft"
            size="sm"
          >
            Edit
          </UButton>
          <UButton
            icon="i-heroicons-trash"
            color="error"
            variant="soft"
            size="sm"
          >
            Delete
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
</script>