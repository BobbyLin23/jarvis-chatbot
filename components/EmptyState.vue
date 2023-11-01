<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="h-full p-20 flex flex-col items-center justify-center">
    <div class="relative h-72 w-72">
      <img src="/images/empty.png" alt="empty">
    </div>
    <p class="text-neutral-500 text-sm text-center">
      {{ label }}
    </p>
  </div>
</template>
