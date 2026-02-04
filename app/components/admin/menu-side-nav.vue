<template>
  <UDashboardGroup>
    <UDashboardSidebar open :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }">
      <template #header>
        <Logo class="h-5 w-auto" />
      </template>

      <UForm class="space-y-4">
        <h3>Resturant info</h3>
        <UFormField label="name" name="name">
          <UInput />
        </UFormField>

        <UButton type="submit">
          Change
        </UButton>
      </UForm>

      <hr />

      <div>
        <div class="flex justify-between items-center">
          <h3>Categories</h3>
          <UButton icon="medical-icon:first-aid" size="xs" color="primary" variant="solid" />
        </div>

        <!--categories menu  -->
        <ul class="p-1">
          <li class="text-sm p-1">category 1</li>
          <li class="text-sm  p-1">category 2</li>
        </ul>
      </div>



    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>

</script>

<style></style>