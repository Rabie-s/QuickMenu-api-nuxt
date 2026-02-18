<template>
  <UModal v-model:open="isOpen" title="Edit Menu">
    <template #body>
      <UForm @submit="updateMenu" class="space-y-5">
        <!-- Menu Title -->
        <UFormField label="Menu title" required>
          <UInput
            v-model="formData.name"
            placeholder="Enter menu title"
            size="lg"
            icon="i-lucide-utensils"
            class="w-full"
          />
        </UFormField>

        <!-- Cover Image -->
        <UFormField label="Cover image" description="Recommended: 1200x400px, Max 5MB">
          <!-- Current Image Preview -->
          <div v-if="currentImageURL && !formData.cover_image" class="mb-3">
            <img
              :src="currentImageURL"
              alt="Current cover image"
              class="h-32 w-full object-cover rounded-lg"
            />
            <div class="mt-2">
              <UCheckbox
                v-model="removeImage"
                label="Remove current image"
              />
            </div>
          </div>

          <!-- New Image Input -->
          <div>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
            />
            <p v-if="formData.cover_image" class="text-sm text-gray-500 mt-2">
              New file: {{ formData.cover_image.name }}
            </p>
          </div>
        </UFormField>

        <!-- Is Available Toggle -->
        <UFormField label="Availability">
          <div class="flex items-center gap-3">
            <USwitch v-model="formData.is_available" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Make this menu visible to customers</span>
          </div>
        </UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton color="neutral" variant="outline" @click="close">
        Cancel
      </UButton>
      <UButton type="submit" :loading="isSubmitting" @click="updateMenu">
        Save Changes
      </UButton>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
interface Menu {
  uuid: string
  name: string
  cover_image?: string | null
  is_available: boolean | number
}

const props = defineProps<{
  menu: Menu | null
}>()

const emit = defineEmits<{
  success: []
  close: []
}>()

const isOpen = computed({
  get: () => props.menu !== null,
  set: (value) => {
    if (!value) emit('close')
  }
})

const isSubmitting = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const currentImageURL = ref<string | null>(null)
const removeImage = ref(false)

const formData = ref({
  name: '',
  cover_image: null as File | null,
  is_available: true
})

watch(() => props.menu, (newMenu) => {
  if (newMenu) {
    currentImageURL.value = newMenu.cover_image
      ? `http://localhost:8000/storage/${newMenu.cover_image}`
      : null
    removeImage.value = false
    formData.value = {
      name: newMenu.name,
      cover_image: null,
      is_available: Boolean(newMenu.is_available)
    }
  } else {
    currentImageURL.value = null
    removeImage.value = false
    formData.value = {
      name: '',
      cover_image: null,
      is_available: true
    }
  }
})

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    formData.value.cover_image = file
    removeImage.value = false
  }
}

async function updateMenu() {
  if (!props.menu) return
  if (isSubmitting.value) return
  if (!formData.value.name.trim()) {
    alert('Please enter a menu name')
    return
  }

  isSubmitting.value = true

  try {
    const submitData = new FormData()
    submitData.append('name', formData.value.name)
    submitData.append('is_available', formData.value.is_available ? '1' : '0')

    if (formData.value.cover_image) {
      submitData.append('cover_image', formData.value.cover_image)
    } else if (removeImage.value) {
      submitData.append('cover_image', "")
    }

    const { data, error } = await useSanctumFetch(`/api/v1/user/menu/${props.menu.uuid}`, {
      method: 'POST',
      body: submitData,
      query: { _method: 'PUT' }
    })

    if (!error.value) {
      emit('success')
      emit('close')
    } else {
      alert('Failed to update menu. Please try again.')
    }
  } catch (err) {
    console.error('Error updating menu:', err)
    alert('Failed to update menu. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
