<template>
  <UModal v-model:open="isOpen" title="Edit Menu Item">
    <template #body>
      <UForm :state="form" class="space-y-4" @submit="handleSubmit">
        <UFormField label="Item Name" name="name" required>
          <UInput v-model="form.name" placeholder="Enter item name" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Price" name="price" required>
          <UInput v-model="form.price" type="number" step="0.01" placeholder="0.00" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Description" name="description">
          <UTextarea v-model="form.description" placeholder="Enter item description" class="w-full" :rows="3" />
        </UFormField>

        <UFormField label="Image" name="image">
          <!-- Image Preview -->
          <div v-if="imagePreview" class="mb-3">
            <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
            <UButton color="error" variant="ghost" size="sm" class="mt-2" @click="removeImage">
              Remove Image
            </UButton>
          </div>

          <!-- Upload Option -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UButton icon="i-heroicons-photo" size="sm" variant="soft" @click="selectFile">
                Choose File
              </UButton>
              <span v-if="imageFile" class="text-sm text-gray-500 dark:text-gray-400">
                {{ imageFile.name }}
              </span>
            </div>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />

            <!-- Or URL Option -->
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>or enter URL:</span>
            </div>
            <UInput v-model="form.image" type="url" placeholder="https://example.com/image.jpg" class="w-full" size="sm" />
          </div>
        </UFormField>

        <UFormField label="Availability" name="is_available">
          <UCheckbox v-model="form.is_available" label="Available" />
        </UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton color="neutral" variant="outline" @click="handleCancel(close)">Cancel</UButton>
      <UButton color="primary" :loading="isSubmitting" @click="handleSubmit">Save Changes</UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { formatImageUrl } from '~/utils/image'

// Props
const props = defineProps<{
  open: boolean
  menuUuid: string
  categoryId: string
  item: any
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
  name: '',
  price: '',
  description: '',
  image: '',
  is_available: true
})

const isSubmitting = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

// File handling functions
const selectFile = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
    form.image = '' // Clear URL when file is selected
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Populate form when item or modal opens
watch([() => props.item, () => props.open], ([item]) => {
  if (item && props.open) {
    form.name = item.name || ''
    form.price = item.price ? String(item.price) : ''
    form.description = item.description || ''
    form.image = item.image || ''
    form.is_available = item.is_available !== undefined ? Boolean(item.is_available) : true

    // Set preview if there's an existing image URL (using formatImageUrl)
    if (item.image && !imageFile.value) {
      imagePreview.value = formatImageUrl(item.image)
    }

    // Reset file input
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
    imageFile.value = null
  }
}, { immediate: true })

// Handle cancel
const handleCancel = (close: () => void) => {
  close()
}

// Handle submit
const handleSubmit = async () => {
  if (!form.name.trim()) {
    alert('Please enter an item name')
    return
  }

  if (!form.price) {
    alert('Please enter a price')
    return
  }

  isSubmitting.value = true

  try {
    const itemId = props.item.id

    // Prepare form data
    let body: any = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      is_available: form.is_available
    }

    // If file is selected, use FormData
    if (imageFile.value) {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('price', String(parseFloat(form.price)))
      formData.append('description', form.description || '')
      formData.append('is_available', String(form.is_available))
      formData.append('image', imageFile.value)

      // Only append _method for FormData
      formData.append('_method', 'PUT')

      body = formData
    } else {
      // Use URL if provided or existing
      body.image = form.image
    }

    const { data, error } = await useSanctumFetch(`/api/v1/user/menus/${props.menuUuid}/categories/${props.categoryId}/items/${itemId}`, {
      method: imageFile.value ? 'POST' : 'PUT',
      body: body
    })

    if (error.value) {
      throw error.value
    }

    // Close modal
    isOpen.value = false

    // Emit success event
    emit('success')

    // Refresh menu items list
    await refreshNuxtData(`menu-${props.menuUuid}-category-${props.categoryId}-items`)

    // Reset file state
    imageFile.value = null
    imagePreview.value = null
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  } catch (error) {
    console.error('Failed to update menu item:', error)
    alert('Failed to update menu item')
  } finally {
    isSubmitting.value = false
  }
}
</script>
