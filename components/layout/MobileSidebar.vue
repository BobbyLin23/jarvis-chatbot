<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <USlideover
    :model-value="isOpen"
    side="left"
    :ui="{
      width: ''
    }"
  >
    <UButton
      class="absolute top-4 right-4"
      variant="link"
      icon="i-heroicons-x-mark"
      size="sm"
      color="gray"
      @click="$emit('close')"
    />
    <SideBar />
  </USlideover>
</template>
