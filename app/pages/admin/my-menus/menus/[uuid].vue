<template>
  <AdminMenuSideNav :categories="categories">
    <!-- Main content - will be populated when selecting a category -->
  </AdminMenuSideNav>
</template>

<script setup lang="ts">
const route = useRoute()
const uuid = route.params.uuid as string

const {
  data: categories
} = await useAsyncData(`menu-${uuid}-categories`,
  () => useSanctumClient()(`/api/v1/user/menus/${uuid}/categories`),
  {
    transform: (response) => response?.data?.data
  }
)
</script>