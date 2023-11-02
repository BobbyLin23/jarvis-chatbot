<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <UAvatar
    class="h-8 w-8"
    :src="user?.user_metadata.avatar_url"
    alt="Avatar"
  />
</template>
