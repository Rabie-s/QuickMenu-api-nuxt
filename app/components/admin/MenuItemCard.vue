<template>
  <UCard class="w-full">
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Image -->
      <img
        :src="image"
        :alt="name"
        class="w-full h-40 sm:h-24 sm:w-24 rounded-lg object-cover flex-shrink-0"
      >

      <!-- Content -->
      <div class="flex-1 min-w-0 w-full">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <h3 class="text-lg font-semibold truncate">{{ name }}</h3>
          <UBadge
            :color="isAvailable ? 'success' : 'error'"
            variant="subtle"
            class="w-fit"
          >
            {{ isAvailable ? 'Available' : 'Unavailable' }}
          </UBadge>
        </div>
        <p class="text-sm text-[var(--ui-text-muted)] line-clamp-2 mt-1">{{ description }}</p>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
          <p class="text-lg font-bold">${{ price.toFixed(2) }}</p>
          <div class="flex gap-2">
            <UButton
              icon="i-heroicons-eye"
              color="primary"
              variant="outline"
              size="xs"
              @click="$emit('show')"
            />
            <UButton
              icon="i-heroicons-pencil"
              color="neutral"
              variant="outline"
              size="xs"
              @click="$emit('edit')"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="outline"
              size="xs"
              @click="$emit('remove')"
            />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface Props {
  image?: string
  name: string
  description?: string
  price: number
  isAvailable?: boolean
}

withDefaults(defineProps<Props>(), {
  image: 'https://placehold.co/400x400/png',
  description: 'No description available',
  isAvailable: true
})
</script>
