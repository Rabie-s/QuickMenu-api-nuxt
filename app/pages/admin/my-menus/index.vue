<template>
  <AdminRestaurantCard
    title="Restaurant Name"
    
    @details="handleDetails"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script lang="ts" setup>
const handleDetails = () => {
  console.log('Details clicked')
}

const handleEdit = () => {
  console.log('Edit clicked')
}

const handleDelete = () => {
  console.log('Delete clicked')
}
</script>