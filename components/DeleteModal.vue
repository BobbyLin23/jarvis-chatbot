<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  conversationId: string
}>()

const emits = defineEmits(['close', 'delete'])

const supabase = useSupabaseClient()

const toast = useToast()

const handleDelete = async () => {
  try {
    const { error } = await supabase.from('conversation').delete().eq('id', props.conversationId)
    if (error) {
      toast.add({
        title: error.hint,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    } else {
      toast.add({
        title: 'Success',
        description: 'Conversation deleted',
        color: 'green',
        icon: 'i-heroicons-check-circle'
      })
      emits('close')
      emits('delete')
    }
  } catch (e) {
    console.log(e)
  }
}
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
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Delete Conversation
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
      <div class="p-4 h-20">
        Are you sure you want to delete this conversation?
      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-x-4">
          <UButton label="Delete" @click="handleDelete" />
          <UButton label="Cancel" variant="ghost" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
