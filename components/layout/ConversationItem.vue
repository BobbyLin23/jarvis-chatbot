<script setup lang='ts'></script>

<template>
  <div
    class="w-full rounded-lg flex items-center my-2 text-neutral-400
    group cursor-pointer hover:bg-neutral-500 p-2 justify-between"
  >
    <div class="flex items-center gap-x-2">
      <UIcon
        class="group-hover:text-neutral-100"
        name="i-heroicons-chat-bubble-bottom-center-text-20-solid"
      />
      <p class="group-hover:text-neutral-100">
        New Chat
      </p>
    </div>
    <div class="items-center gap-x-2 hidden group-hover:flex">
      <UTooltip text="Pin">
        <PushPinIcon class="hover:text-neutral-100" />
      </UTooltip>
      <UTooltip text="Edit">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-pencil-square" />
      </UTooltip>
      <UTooltip text="Trash">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-trash" />
      </UTooltip>
    </div>
  </div>
</template>
