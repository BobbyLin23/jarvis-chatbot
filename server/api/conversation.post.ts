import type { ChatCompletion } from 'openai/resources/chat'
import { serverSupabaseClient } from '#supabase/server'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const user = await supabase.auth.getUser()
    const body = await readBody(event)
    const { messages } = body

    if (!user.data.user) {
      return createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    if (!messages) {
      return createError({ statusCode: 400, statusMessage: 'Bad Request' })
    }

    const response = await $fetch<ChatCompletion>('https://api.openai-sb.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages
      }),
      timeout: 50000
    })

    console.log(response)

    return response.choices[0].message
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
