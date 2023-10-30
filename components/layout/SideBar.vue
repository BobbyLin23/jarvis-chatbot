<script setup lang="ts">
</script>

<template>
  <aside class="h-full w-64 hidden sm:flex flex-col fixed bg-zinc-100 dark:bg-zinc-800">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-xl font-bold">
        Jarvis Chat
      </h1>
      <ToggleTheme />
    </div>
    <div class="my-4 flex-1 p-4">
      Conversation List
    </div>
    <div class="my-4 px-2">
      <UButton block label="New Chat" icon="i-heroicons-plus-20-solid" />
    </div>
    <div class="my-4 px-2 flex items-center justify-between">
      <UserButton />
      <UButton color="gray" label="Role" />
    </div>
    <RolePicker />
  </aside>
</template>
