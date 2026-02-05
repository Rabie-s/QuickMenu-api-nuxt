<template>
  <div class="space-y-4">
    <AdminMenuItemCard
      name="Burger Classic"
      description="Juicy beef patty with fresh lettuce, tomato, and special sauce"
      :price="12.99"
      :is-available="true"
      @show="handleShow"
      @edit="handleEdit"
      @remove="handleRemove"
    />
    <AdminMenuItemCard
      name="Caesar Salad"
      description="Crispy romaine lettuce with parmesan cheese and croutons"
      :price="8.99"
      :is-available="false"
      @show="handleShow"
      @edit="handleEdit"
      @remove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
const handleShow = () => {
  console.log('Show clicked')
}

const handleEdit = () => {
  console.log('Edit clicked')
}

const handleRemove = () => {
  console.log('Remove clicked')
}
</script>