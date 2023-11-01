<script setup lang='ts'>
import type { Conversation } from '~/types/supabase'

defineProps<{
  list: Conversation[]
}>()

defineEmits(['update'])
</script>

<template>
  <ConversationItem v-for="i in list" :key="i.id" :item="i" @update="$emit('update')" />
</template>
