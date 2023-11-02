<script setup lang='ts'>
import type { Conversation } from '~/types/supabase'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const conversationList = ref<Conversation[]>([])

const toast = useToast()

const fetchConversationList = async () => {
  if (!user.value) {
    return
  }
  try {
    const { data, error } = await supabase.from('conversation').select('*').eq('user_id', user.value.id)
    if (error) {
      toast.add({
        title: error.hint,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    }

    if (data) {
      conversationList.value = data
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await fetchConversationList()
  if (conversationList.value.length > 0) {
    navigateTo(conversationList.value[0].id)
  }
})
</script>

<template>
  <div class="h-full grid place-content-center">
    <p class="text-xl font-semibold">
      Click on New Chat to Start!
    </p>
  </div>
</template>
