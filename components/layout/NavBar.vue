<script setup lang="ts">
const showMobileSidebar = useShowMobileSidebar()
const currentRole = useCurrentRole()
</script>

<template>
  <nav
    class="border-b h-20 flex w-full items-center justify-between
  dark:border-neutral-700 px-6"
  >
    <UButton
      variant="link"
      size="sm"
      square
      color="gray"
      icon="i-heroicons-queue-list"
      class="block sm:hidden"
      @click="showMobileSidebar = true"
    />
    <div class="flex items-center gap-x-4">
      <OpenAIIcon class="w-6 h-6" />
      <p class="text-lg">
        New Chat
      </p>
      <UBadge color="green" variant="soft" size="sm">
        {{ currentRole }}
      </UBadge>
    </div>
  </nav>
</template>
