<script setup lang="ts">
const showRolePicker = useShowRolePicker()
</script>

<template>
  <div>
    <RolePicker
      :is-open="showRolePicker"
      @close="showRolePicker = false"
    />
  </div>
</template>
