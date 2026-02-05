<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-4">
        <UButton
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
          to="/admin/my-menus"
        >
          Back
        </UButton>
        <h1 class="text-2xl font-bold">Create New Menu</h1>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">Fill in the details to create a new menu</p>
    </div>

    <!-- Form -->
    <UCard>
      <UForm :state="form" :loading-auto="false" @submit="handleSubmit" class="space-y-6">
        <!-- Menu Name -->
        <UFormField label="Menu Name" name="name" required>
          <UInput
            v-model="form.name"
            placeholder="e.g., Lunch Menu, Dinner Menu"
            size="lg"
          />
        </UFormField>

        <!-- Cover Image -->
        <UFormField label="Cover Image" name="coverImage" required>
          <div class="space-y-3">
            <!-- Image Preview -->
            <div v-if="form.coverImage" class="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                :src="form.coverImage"
                alt="Cover preview"
                class="w-full h-full object-cover"
              >
              <UButton
                icon="i-lucide-x"
                color="error"
                variant="solid"
                size="sm"
                class="absolute top-2 right-2"
                @click="form.coverImage = ''"
              />
            </div>
            <!-- Empty State -->
            <div v-else class="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <div class="text-center text-gray-500 dark:text-gray-400">
                <UIcon name="i-lucide-image" class="text-4xl mb-2" />
                <p class="text-sm">No image selected</p>
              </div>
            </div>
            <!-- URL Input -->
            <UInput
              v-model="form.coverImage"
              placeholder="Enter image URL"
              size="lg"
            />
          </div>
        </UFormField>

        <!-- Is Available -->
        <UFormField name="isAvailable">
          <UCheckbox v-model="form.isAvailable" size="lg">
            <template #label>
              <span class="text-base">Make this menu available to customers</span>
            </template>
          </UCheckbox>
        </UFormField>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <UButton @click="console.log('nott')" type="submit" size="lg" :loading="loading" class="w-full sm:w-auto">
            Create Menu
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            to="/admin/my-menus"
            class="w-full sm:w-auto"
          >
            Cancel
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  coverImage: '',
  isAvailable: true
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  console.log('Creating menu:', form)
  // TODO: Implement create menu logic
  setTimeout(() => {
    loading.value = false
    // navigateTo('/admin/my-menus')
  }, 1000)
}

useHead({
  title: 'Create New Menu'
})
</script>
