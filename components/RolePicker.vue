<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])

const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
const selected = ref(people[0])
</script>

<template>
  <UModal :model-value="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6
          text-gray-900 dark:text-white"
          >
            Select the role
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>
      <div>
        <USelectMenu
          v-model="selected"
          :options="people"
        />
      </div>
    </UCard>
  </UModal>
</template>
