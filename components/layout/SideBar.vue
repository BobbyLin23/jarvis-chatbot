<script setup lang="ts">
import type { Conversation, Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const toast = useToast()

const models = ['gpt-3.5-turbo', 'gpt-4']
const selected = ref(models[0])

const loading = ref(false)

const showRolePicker = useShowRolePicker()

const conversationList = ref<Conversation[]>([])

const refreshConversationList = () => {
  if (conversationList.value.length === 0) {
    navigateTo('/')
  } else {
    navigateTo(conversationList.value[conversationList.value.length - 1].id)
  }
}

const fetchConversationList = async () => {
  try {
    if (!user.value?.id) {
      return
    }

    const { data, error: selectError } = await supabase.from('conversation')
      .select('*').eq('user_id', user.value.id)
    if (selectError) {
      toast.add({
        title: selectError.hint,
        description: selectError.message,
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

const handleCreateConversation = async () => {
  try {
    loading.value = true
    const { error } = await supabase.from('conversation').insert({
      title: 'New Chat',
      user_id: user.value?.id
    })

    if (error) {
      toast.add({
        title: error.hint,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    }
    await fetchConversationList()
    navigateTo(conversationList.value[conversationList.value.length - 1].id)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const handleUpdateDelete = async () => {
  await fetchConversationList()
  refreshConversationList()
}

const handleUpdateEdit = () => {
  fetchConversationList()
}

onMounted(() => {
  fetchConversationList()
})
</script>

<template>
  <aside class="h-full w-64 flex flex-col fixed bg-zinc-100 dark:bg-zinc-700">
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
      <ConversationList
        :list="conversationList"
        @update:delete="handleUpdateDelete"
        @update:edit="handleUpdateEdit"
      />
    </div>
    <div class="my-4 px-2">
      <UButton
        block
        label="New Chat"
        icon="i-heroicons-plus-20-solid"
        :loading="loading"
        @click="handleCreateConversation"
      />
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
