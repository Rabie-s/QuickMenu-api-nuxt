<template>
  test
</template>

<script setup lang="ts">
// Get menu UUID from route
const route = useRoute()
const uuid = route.params.uuid as string

// Fetch categories for this menu
const { data: categories } = await useAsyncData(
  `menu-${uuid}-categories`,
  () => useSanctumClient()(`/api/v1/user/menus/${uuid}/categories`),
  {
    transform: (response) => response?.data?.data
  }
)

// Share categories and UUID across components using useState
const menuCategories = useState('menuCategories', () => null)
const menuUuid = useState('currentMenuUuid', () => uuid)

// Sync categories to state when it changes
watch(categories, (newCategories) => {
  menuCategories.value = newCategories
}, { immediate: true })
</script>
