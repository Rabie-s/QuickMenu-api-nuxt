<template>
  <UModal v-model:open="isOpen" title="Edit Category">
    <template #body>
      <UForm :state="form" class="space-y-4" @submit="handleSubmit">
        <UFormField label="Category Name" name="name" required>
          <UInput v-model="form.name" placeholder="Enter category name" class="w-full" size="lg" />
        </UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton color="neutral" variant="outline" @click="handleCancel(close)">Cancel</UButton>
      <UButton color="primary" :loading="isSubmitting" @click="handleSubmit">Save</UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
// Types
interface Category {
  id: string | number
  name: string
  icon?: string
  itemCount?: number
}

// Props
const props = defineProps<{
  open: boolean
  menuUuid: string
  category?: Category | null
}>()

// Emits
const emit = defineEmits<{
  'update:open': [value: boolean]
  success: []
}>()

// Local state
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const form = reactive({
  id: null as string | number | null,
  name: ''
})

const isSubmitting = ref(false)

// Sync form when category changes
watch(() => props.category, (category) => {
  if (category) {
    form.id = category.id
    form.name = category.name
  }
}, { immediate: true })

// Handle cancel
const handleCancel = (close: () => void) => {
  form.id = null
  form.name = ''
  close()
}

// Handle submit
const handleSubmit = async () => {
  if (!form.name.trim()) {
    alert('Please enter a category name')
    return
  }

  if (!form.id) {
    alert('Invalid category')
    return
  }

  isSubmitting.value = true

  try {
    const { data, error } = await useSanctumFetch(`/api/v1/user/menus/${props.menuUuid}/categories/${form.id}`, {
      method: 'PUT',
      body: {
        name: form.name
      }
    })

    if (error.value) {
      throw error.value
    }

    // Update shared state
    const sharedCategories = useState('menuCategories', () => null)
    if (data.value && sharedCategories.value) {
      const index = sharedCategories.value.findIndex((c: Category) => c.id === form.id)
      if (index !== -1) {
        // Create a new array to trigger reactivity
        sharedCategories.value = [
          ...sharedCategories.value.slice(0, index),
          data.value,
          ...sharedCategories.value.slice(index + 1)
        ]
      }
    }

    // Reset form
    form.id = null
    form.name = ''

    // Close modal
    isOpen.value = false

    // Emit success event
    emit('success')

    // Refresh categories list in background
    await refreshNuxtData(`menu-${props.menuUuid}-categories`)
  } catch (error) {
    console.error('Failed to update category:', error)
    alert('Failed to update category')
  } finally {
    isSubmitting.value = false
  }
}
</script>
