<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">My Menus</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your restaurant menus</p>
      </div>
      <UButton to="/admin/my-menus/create" icon="i-lucide-plus">
        Create New Menu
      </UButton>
    </div>


    <div class="grid gap-4">

      <ClientOnly>
        <template v-if="menus && menus.length > 0">
          <AdminMenusMenuCard
            v-for="menu in menus"
            :key="menu.uuid"
            :uuid="menu.uuid"
            :title="menu.name"
            :image="menu.cover_image
              ? `http://localhost:8000/storage/${menu.cover_image}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx2iMfk3hb9vN7shqssP8WEZZRg7v4Yjr3w&s'"
            :isAvailable="menu.is_available"
            @delete="deleteMenu(menu.uuid)"
            @edit="selectedMenu = menu"
          />
        </template>
        <div v-else class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">No menus found. Create your first menu to get started!</p>
        </div>
      </ClientOnly>


    </div>

    <!-- Edit Modal Component -->
    <AdminMenusEditMenuModal
      :menu="selectedMenu"
      @success="handleSuccess"
      @close="selectedMenu = null"
    />


  </div>
</template>

<script lang="ts" setup>
const client = useSanctumClient();

const {
  data:menus,
  status,
  error,
  refresh,
  pending
} = await useAsyncData('menus',
  () => client('/api/v1/user/menu'),
  {
    // Transform the nested data immediately
    transform: (response) => response?.data?.data,

  }
);

// Edit modal
const selectedMenu = ref<any>(null)

function handleSuccess() {
  refresh()
}

async function deleteMenu(menuUUID:string){
   const { error,data,status } = await useSanctumFetch(`/api/v1/user/menu/${menuUUID}`, {
    method: 'DELETE',
  })
  refresh()
}



</script>