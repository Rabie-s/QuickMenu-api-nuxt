<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Menu</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details to create a new menu</p>
      </div>
    </div>

    <!-- Form Card -->
    <UCard>
      <UForm :state="form" @submit="handleSubmit" class="space-y-6">
        <!-- Name Field -->
        <UFormField label="Menu Name" name="name" required>
          <UInput
            v-model="form.name"
            placeholder="Enter menu name"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <!-- Cover Image Field -->
        <UFormField label="Cover Image" name="cover_image">
          <div class="space-y-3">
            <UInput
              type="file"
              accept="image/*"
              @change="handleFileChange"
              size="lg"
              class="w-full"
            />
            <p v-if="coverImageName" class="text-sm text-gray-500 dark:text-gray-400">
              Selected: {{ coverImageName }}
            </p>
          </div>
        </UFormField>

        <!-- Is Available Toggle -->
        <UFormField label="Availability" name="is_available">
          <div class="flex items-center gap-3">
            <UToggle v-model="form.is_available" size="md" />
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ form.is_available ? 'Available' : 'Unavailable' }}
            </span>
          </div>
        </UFormField>

        <!-- Image Preview -->
        <div v-if="coverImagePreview" class="space-y-2">
          <p class="text-sm font-medium text-gray-900 dark:text-white">Preview</p>
          <div class="relative w-full max-w-sm">
            <img
              :src="coverImagePreview"
              alt="Cover image preview"
              class="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <UDivider />

        <div class="flex items-center gap-3">
          <UButton type="submit" size="lg" :loading="isSubmitting">
            Create Menu
          </UButton>
          <UButton
            to="/admin/my-menus"
            variant="outline"
            size="lg"
            color="neutral"
          >
            Cancel
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  name: '',
  cover_image: null as File | null,
  is_available: true
})

const coverImagePreview = ref<string | null>(null)
const coverImageName = ref<string>('')
const isSubmitting = ref(false)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    form.cover_image = file
    coverImageName.value = file.name

    const reader = new FileReader()
    reader.onload = (e) => {
      coverImagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('is_available', String(form.is_available))
    if (form.cover_image) {
      formData.append('cover_image', form.cover_image)
    }

    // TODO: Replace with your actual API endpoint
    // await $fetch('/api/menus', {
    //   method: 'POST',
    //   body: formData
    // })

    console.log('Form submitted:', {
      name: form.name,
      is_available: form.is_available,
      cover_image: form.cover_image?.name
    })

    await navigateTo('/admin/my-menus')
  } catch (error) {
    console.error('Error creating menu:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
