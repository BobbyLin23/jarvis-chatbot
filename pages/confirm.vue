<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
</template>
