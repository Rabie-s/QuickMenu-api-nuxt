<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Menu</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details to create a new menu</p>
      </div>
      <UButton
        to="/admin/my-menus"
        color="neutral"
        variant="ghost"
        icon="i-lucide-arrow-left"
      >
        Back
      </UButton>
    </div>

    <!-- Form Card -->
    <UPageCard class="w-full">
      <UForm @submit="onSubmit" class="space-y-5">
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
          <div
            class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors"
            @click="triggerFileInput"
          >
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <!-- Preview -->
            <div v-if="imagePreview" class="relative inline-block">
              <img :src="imagePreview" alt="Preview" class="max-h-48 rounded-lg mx-auto" />
              <button
                type="button"
                @click.stop="removeImage"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </button>
            </div>
            <!-- Upload Prompt -->
            <div v-else class="flex flex-col items-center gap-2">
              <UIcon name="i-lucide-image-plus" class="w-10 h-10 text-gray-400" />
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </UFormField>

        <!-- Is Available Toggle -->
        <UFormField label="Availability">
          <div class="flex items-center gap-3">
            <USwitch v-model="formData.is_available" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Make this menu visible to customers</span>
          </div>
        </UFormField>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <UButton type="submit" size="lg" icon="i-lucide-check">
            Create Menu
          </UButton>
          <UButton to="/admin/my-menus" color="neutral" variant="outline" size="lg">
            Cancel
          </UButton>
        </div>
      </UForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">

const fileInputRef = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isSubmitting = ref(false)

const formData = ref({
  name:'',
  cover_image:null as File | null,
  is_available:true
})

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    alert('File size exceeds 5MB. Please choose a smaller file.')
    target.value = ''
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file.')
    target.value = ''
    return
  }

  formData.value.cover_image = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  formData.value.cover_image = null
  imagePreview.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

async function onSubmit() {
  if (isSubmitting.value) return
  if (!formData.value.name.trim()) {
    alert('Please enter a menu name')
    return
  }

  isSubmitting.value = true

  try {
    // Create FormData for file upload
    const submitData = new FormData()
    submitData.append('name', formData.value.name)
    submitData.append('is_available', formData.value.is_available ? '1' : '0')

    if (formData.value.cover_image) {
      submitData.append('cover_image', formData.value.cover_image)
    }

    const { data, error } = await useSanctumFetch('/api/v1/user/menu', {
      method: 'POST',
      body: submitData,
    })

    if (!error.value) {
      // Navigate to menus list on success
      await navigateTo('/admin/my-menus')
    }
  } catch (err) {
    console.error('Error creating menu:', err)
    alert('Failed to create menu. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

</script>