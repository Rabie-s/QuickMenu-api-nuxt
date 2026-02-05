<template>
  <UCard class="w-full">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <!-- Image -->
      <img
        :src="image"
        :alt="title"
        class="h-24 w-full sm:w-32 rounded-lg object-cover flex-shrink-0"
      >

      <!-- Content -->
      <div class="flex-1 min-w-0 w-full">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p class="text-sm text-[var(--ui-text-muted)] line-clamp-2">{{ description }}</p>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 flex-shrink-0 w-full sm:w-auto">
        <UButton
          icon="i-heroicons-eye"
          color="primary"
          variant="outline"
          size="sm"
          class="flex-1 sm:flex-none"
          @click="$emit('details')"
        >
          Details
        </UButton>
        <UButton
          icon="i-heroicons-pencil"
          color="neutral"
          variant="outline"
          size="sm"
          class="flex-1 sm:flex-none"
          @click="$emit('edit')"
        >
          Edit
        </UButton>
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="outline"
          size="sm"
          class="flex-1 sm:flex-none"
          @click="$emit('delete')"
        >
          Delete
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface Props {
  image?: string
  title: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx2iMfk3hb9vN7shqssP8WEZZRg7v4Yjr3w&s',
  description: 'Description goes here...'
})

defineEmits<{
  details: []
  edit: []
  delete: []
}>()
</script>
