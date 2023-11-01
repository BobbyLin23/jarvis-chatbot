<script setup lang='ts'>
import type { Conversation, Database } from '~/types/supabase'

const props = defineProps<{
  item: Conversation
}>()

const emits = defineEmits(['update'])

const supabase = useSupabaseClient<Database>()

const route = useRoute()

const toast = useToast()

const handleDelete = async () => {
  try {
    const { error } = await supabase.from('conversation').delete().eq('id', props.item.id)
    if (error) {
      toast.add({
        title: error.hint,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    } else {
      emits('update')
      toast.add({
        title: 'Success',
        description: 'Conversation deleted',
        color: 'green',
        icon: 'i-heroicons-check-circle'
      })
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div
    :class="tw(route.path === '/' + item.id ? 'bg-neutral-500' : '',
               `w-full rounded-lg flex items-center my-2 text-neutral-800 dark:text-neutral-400
              group cursor-pointer hover:bg-neutral-500 p-2 justify-between`)"
    @click="$router.push(`/${item.id}`)"
  >
    <div :class="tw(route.path === '/' + item.id ? 'text-neutral-100' : '', 'flex items-center gap-x-2')">
      <UIcon
        class="group-hover:text-neutral-100"
        name="i-heroicons-chat-bubble-bottom-center-text-20-solid"
      />
      <p class="group-hover:text-neutral-100">
        {{ item.title }}
      </p>
    </div>
    <div :class="tw('items-center gap-x-2 hidden group-hover:flex', route.params.conversationId === item.id ? 'flex' : 'hidden')">
      <UTooltip text="Pin">
        <PushPinIcon class="hover:text-neutral-100" />
      </UTooltip>
      <UTooltip text="Edit">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-pencil-square" />
      </UTooltip>
      <UTooltip text="Trash">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-trash" @click="handleDelete" />
      </UTooltip>
    </div>
  </div>
</template>
