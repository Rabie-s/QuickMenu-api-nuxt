<template>
  <div v-if="category" class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">{{ category.name }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ description }}
      </p>
    </div>
    <UButton icon="i-lucide-plus" @click="$emit('create')">
      {{ buttonText }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface Category {
  name: string
}

interface Props {
  category: Category | null
  description?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  description: 'Manage menu items in this category',
  buttonText: 'Create New Menu Item'
})

defineEmits<{
  create: []
}>()
</script>
