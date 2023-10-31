<script setup lang='ts'>
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const supabase = useSupabaseClient()
const toast = useToast()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters'
  })
})

type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined
})

const loading = ref(false)

const signInWithGithub = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/confirm'
      }
    })
    if (error) {
      toast.add({
        title: error.name,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/confirm'
      }
    })
    if (error) {
      toast.add({
        title: error.name,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

async function submit (event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password
    })
    if (error) {
      toast.add({
        title: error.name,
        description: error.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle'
      })
    } else {
      state.value.email = undefined
      state.value.password = undefined
      navigateTo('/confirm')
      toast.add({
        title: 'Success',
        description: 'Login Successfully!',
        color: 'green',
        icon: 'i-heroicons-check-circle'
      })
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 flex flex-col rounded-lg gap-y-4 bg-neutral-100 dark:bg-neutral-800 shadow-sm w-[360px]">
    <div class="flex items-center gap-x-4">
      <div class="px-2 pt-1 bg-sky-500/10 rounded-md">
        <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="text-sky-500" />
      </div>
      <h1 class="text-xl font-bold">
        Jarvis Chat Bot
      </h1>
    </div>
    <p class="text-neutral-500 text-sm">
      Sign in to Jarvis Chat Bot
    </p>
    <div class="flex gap-x-2">
      <UButton
        color="gray"
        square
        variant="solid"
        class="flex-1 flex justify-center"
        :disabled="loading"
        @click="signInWithGoogle"
      >
        <GoogleIcon class="w-4 h-4" />
      </UButton>
      <UButton
        color="gray"
        square
        variant="solid"
        class="flex-1 flex justify-center"
        :disabled="loading"
        @click="signInWithGithub"
      >
        <GithubIcon class="w-6 h-6" />
      </UButton>
    </div>
    <div class="border-b border-neutral-300 dark:border-neutral-700" />
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="submit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" />
      </UFormGroup>
      <UButton type="submit" block :loading="loading">
        Sign In
      </UButton>
    </UForm>
    <div class="underline text-neutral-500 text-center cursor-pointer space-y-2 text-sm">
      <div class="hover:text-neutral-400">
        Forget your password
      </div>
      <NuxtLink class="hover:text-neutral-400 block" to="/register">
        Don&apos;t have an account? Sign up
      </NuxtLink>
    </div>
  </div>
</template>
