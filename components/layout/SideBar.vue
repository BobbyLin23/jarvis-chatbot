<script setup lang="ts">
const models = ['gpt-3.5-turbo', 'gpt-4']
const selected = ref(models[0])

const showRolePicker = useShowRolePicker()
</script>

<template>
  <aside class="h-full w-64 flex flex-col fixed bg-zinc-100 dark:bg-zinc-800">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-xl font-bold">
        Jarvis Chat
      </h1>
      <div class="space-x-2">
        <UButton
          icon="i-heroicons-users-20-solid"
          variant="ghost"
          color="gray"
          @click="showRolePicker = true"
        />
        <ToggleTheme />
      </div>
    </div>
    <div class="my-4 flex-1 p-2">
      <ConversationList />
    </div>
    <div class="my-4 px-2">
      <UButton block label="New Chat" icon="i-heroicons-plus-20-solid" />
    </div>
    <div class="my-4 px-2 flex items-center justify-between">
      <UserButton />
      <USelectMenu
        v-model="selected"
        :options="models"
        class="w-36"
      />
    </div>
  </aside>
</template>
