<script setup lang='ts'>
const value = ref('')
</script>

<template>
  <div class="flex items-center gap-x-2">
    <UInput
      v-model="value"
      class="flex-1"
      placeholder="Please Input ..."
    />
    <UButton label="Generate" />
  </div>
</template>
