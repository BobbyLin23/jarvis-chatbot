<script setup lang="ts">
import type { ChatCompletionMessage } from 'openai/resources/chat'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'
import type { Database } from '~/types/supabase'

const route = useRoute()

const supabase = useSupabaseClient<Database>()

const schema = z.object({
  prompt: z.string().min(1, 'Must be at least 1 character')
})

type Schema = z.output<typeof schema>

const toast = useToast()

const form = ref({
  prompt: undefined
})

const loading = ref(false)

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
    await supabase.from('content').insert({
      content: event.data.prompt,
      role: 'user',
      conversation_id: route.params.conversationId
    })
    const newMessage = messages.value.concat(userMessage)
    const response = await useFetch<ChatCompletionMessage>('/api/conversation', {
      method: 'POST',
      body: {
        messages: newMessage
      }
    })
    console.log(response)
    messages.value = newMessage.concat(response.data.value!)
    form.value.prompt = undefined
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
</script>

<template>
  <div class="p-6 h-full">
    <UForm
      :schema="schema"
      :state="form"
      class="w-full focus-within:shadow-sm grid grid-cols-12 gap-2"
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
        />
      </UFormGroup>
      <UButton
        type="submit"
        label="Generate"
        :disabled="loading"
        block
        class="col-span-12 lg:col-span-2 h-8"
      />
    </UForm>
    <div class="mt-4 space-y-4">
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
          class="p-8 w-full flex items-start gap-x-8 rounded-lg"
          :class="[message && message.role === 'user' ? 'bg-white border border-black/10 dark:bg-neutral-600' : 'bg-neutral-100 dark:bg-neutral-800']"
        >
          <UserAvatar v-if="message && message.role === 'user'" />
          <BotAvatar v-else />
          <p class="text-sm">
            {{ message?.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
