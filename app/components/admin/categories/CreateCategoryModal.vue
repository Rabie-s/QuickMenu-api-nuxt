<template>
  <UModal v-model:open="isOpen" title="Create New Category">
    <template #body>
      <UForm :state="form" class="space-y-4" @submit="handleSubmit">
        <UFormField label="Category Name" name="name" required>
          <UInput v-model="form.name" placeholder="Enter category name" class="w-full" size="lg" />
        </UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton color="neutral" variant="outline" @click="handleCancel(close)">Cancel</UButton>
      <UButton color="primary" :loading="isSubmitting" @click="handleSubmit">Create</UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  open: boolean
  menuUuid: string
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
  name: ''
})

const isSubmitting = ref(false)

// Reset form when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.name = ''
  }
})

// Handle cancel
const handleCancel = (close: () => void) => {
  form.name = ''
  close()
}

// Handle submit
const handleSubmit = async () => {
  if (!form.name.trim()) {
    alert('Please enter a category name')
    return
  }

  isSubmitting.value = true

  try {
    const { data, error } = await useSanctumFetch(`/api/v1/user/menus/${props.menuUuid}/categories`, {
      method: 'POST',
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
      sharedCategories.value = [...sharedCategories.value, data.value]
    }

    // Reset form
    form.name = ''

    // Close modal
    isOpen.value = false

    // Emit success event
    emit('success')

    // Refresh categories list in background
    await refreshNuxtData(`menu-${props.menuUuid}-categories`)
  } catch (error) {
    console.error('Failed to create category:', error)
    alert('Failed to create category')
  } finally {
    isSubmitting.value = false
  }
}
</script>
