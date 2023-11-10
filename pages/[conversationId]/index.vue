<script setup lang="ts">
import type { ChatCompletionMessage, ChatCompletionRole } from 'openai/resources/chat'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'
import MarkdownIt from 'markdown-it'
import type { Database } from '~/types/supabase'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const dayjs = useDayjs()

const { copy, copied } = useClipboard()

const supabase = useSupabaseClient<Database>()

const route = useRoute()

const schema = z.object({
  prompt: z.string().min(1, 'Must be at least 1 character')
})

type Schema = z.output<typeof schema>

const toast = useToast()

const form = ref({
  prompt: ''
})

const loading = ref(false)

const lastEditTime = ref('')

const messages = ref<ChatCompletionMessage[]>([])

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    loading.value = true
    const userMessage: ChatCompletionMessage[] = [
      {
        role: 'user',
        content: event.data.prompt
      }
    ]
    const newMessage = messages.value.concat(userMessage)
    const { data, error } = await useAsyncData<ChatCompletionMessage>('conversation', () => $fetch('/api/conversation', {
      method: 'POST',
      body: {
        messages: newMessage
      }
    }))
    if (error.value) {
      toast.add({
        icon: 'i-heroicons-exclamation-20-solid',
        title: 'Something went wrong',
        description: (error.value as Error).message
      })
      return
    }
    await supabase.from('content').insert({
      content: event.data.prompt,
      role: 'user',
      conversation_id: route.params.conversationId
    })
    await supabase.from('content').insert({
      content: data.value?.content,
      role: data.value?.role,
      conversation_id: route.params.conversationId
    })
    messages.value = newMessage.concat(data.value!)
    form.value.prompt = ''
  } catch (e) {
    toast.add({
      icon: 'i-heroicons-exclamation-20-solid',
      title: 'Something went wrong',
      description: (e as Error).message
    })
  } finally {
    loading.value = false
  }
}

const handleCopy = async (value: string) => {
  await copy(value)
  if (copied) {
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: 'Copied',
      color: 'green'
    })
  }
}

onMounted(async () => {
  const { data, error } = await supabase.from('content').select('*')
    .eq('conversation_id', route.params.conversationId).order('created_at', { ascending: true })
  if (error) {
    toast.add({
      icon: 'i-heroicons-exclamation-20-solid',
      title: error.message,
      description: error.details
    })
    return
  }
  if (data) {
    messages.value = data.map(item => ({
      content: item.content,
      role: item.role as ChatCompletionRole
    }))
  }
  const { error: conversationError, data: conversationData } = await supabase.from('conversation').select('updated_at').eq('id', route.params.conversationId)
  if (conversationError) {
    toast.add({
      icon: 'i-heroicons-exclamation-20-solid',
      title: conversationError.message,
      description: conversationError.details
    })
    return
  }
  lastEditTime.value = conversationData[0].updated_at
})
</script>

<template>
  <div class="p-6 overflow-y-auto">
    <UForm
      :schema="schema"
      :state="form"
      class="w-full focus-within:shadow-sm grid grid-cols-12 gap-4"
      @submit="handleSubmit"
    >
      <UFormGroup
        name="prompt"
        class="col-span-12 lg:col-span-10"
      >
        <UInput
          v-model="form.prompt"
          class="border-0 outline-none focus-visible:ring-0
          focus-visible:ring-transparent"
          :disabled="loading"
          placeholder="Please input ..."
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="form.prompt"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="form.prompt = ''"
            />
          </template>
        </UInput>
      </UFormGroup>
      <UButton
        type="submit"
        label="Generate"
        :disabled="loading"
        block
        class="col-span-12 lg:col-span-2 h-8"
      />
    </UForm>
    <div class="mt-4 space-y-4 w-full">
      <div
        v-if="loading"
        class="p-8 rounded-lg w-full flex items-center
        justify-center bg-neutral-100 dark:bg-neutral-800"
      >
        <LoadingState />
      </div>
      <div v-if="messages.length === 0 && !loading">
        <EmptyState label="No Conversations" />
      </div>
      <div class="flex flex-col-reverse gap-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="p-8 w-full flex items-start gap-x-8 rounded-lg relative group"
          :class="[message && message.role === 'user' ? 'bg-white border border-black/10 dark:bg-neutral-600' : 'bg-neutral-100 dark:bg-zinc-700']"
        >
          <UserAvatar v-if="message && message.role === 'user'" />
          <BotAvatar v-else />
          <div class="text-sm w-full" v-html="md.render(message?.content!)" />
          <UButton
            icon="i-heroicons-document-duplicate"
            variant="link"
            color="gray"
            class="absolute right-4 top-2 hidden group-hover:block"
            @click="handleCopy(message?.content!)"
          />
        </div>
      </div>
      <div v-if="messages.length" class="my-2 text-center text-xs">
        Last edit at {{ dayjs(lastEditTime).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
  </div>
</template>
