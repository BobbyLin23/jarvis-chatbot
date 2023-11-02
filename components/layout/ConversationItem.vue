<script setup lang='ts'>
import type { Conversation, Database } from '~/types/supabase'

const props = defineProps<{
  item: Conversation
}>()

const emits = defineEmits(['update:delete', 'update:edit', 'update:pinned'])

const supabase = useSupabaseClient<Database>()

const route = useRoute()

const toast = useToast()

const isEditing = ref(false)

const title = ref(props.item.title || '')

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
      emits('update:delete')
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

const handleEdit = async () => {
  if (title.value) {
    const { error } = await supabase.from('conversation')
      .update({ title: title.value }).eq('id', props.item.id)
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
        description: 'Conversation updated',
        color: 'green',
        icon: 'i-heroicons-check-circle'
      })
      isEditing.value = false
      emits('update:edit')
    }
  }
}

watch(() => props.item.title, () => {
  if (props.item.title) {
    title.value = props.item.title
  }
})
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
      <UTooltip
        v-if="!isEditing && item.title?.length! >= 15"
        :text="item.title!"
      >
        <p class="group-hover:text-neutral-100 truncate w-32">
          {{ item.title }}
        </p>
      </UTooltip>
      <p
        v-if="!isEditing && item.title?.length! < 15"
        class="group-hover:text-neutral-100 truncate w-32"
      >
        {{ item.title }}
      </p>
      <UInput
        v-if="isEditing"
        v-model="title"
        class="w-32"
        @keyup.enter="handleEdit"
      />
    </div>
    <div :class="tw('items-center gap-x-2 hidden group-hover:flex', route.params.conversationId === item.id ? 'flex' : 'hidden')">
      <UTooltip text="Pin">
        <PushPinIcon class="hover:text-neutral-100" />
      </UTooltip>
      <UTooltip text="Edit">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-pencil-square" @click="isEditing = !isEditing" />
      </UTooltip>
      <UTooltip text="Trash">
        <UIcon class="hover:text-neutral-100" name="i-heroicons-trash" @click="handleDelete" />
      </UTooltip>
    </div>
  </div>
</template>
