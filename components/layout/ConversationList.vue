<script setup lang='ts'>
import type { Conversation } from '~/types/supabase'

defineProps<{
  list: Conversation[]
}>()

defineEmits(['update:delete', 'update:edit'])
</script>

<template>
  <ConversationItem
    v-for="i in list"
    :key="i.id"
    :item="i"
    @update:delete="$emit('update:delete')"
    @update:edit="$emit('update:edit')"
  />
</template>
