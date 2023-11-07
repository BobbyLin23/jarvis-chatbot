<script setup lang="ts">
const showMobileSidebar = useShowMobileSidebar()
const currentRole = useCurrentRole()

const supabase = useSupabaseClient()

const route = useRoute()

const title = ref('')

watch(() => route.params.conversationId, async () => {
  if (route.params.conversationId) {
    const { data } = await supabase.from('conversation').select('title').eq('id', route.params.conversationId).single()
    if (data) {
      title.value = data.title
    }
  }
})

onMounted(async () => {
  if (route.params.conversationId) {
    const { data } = await supabase.from('conversation').select('title').eq('id', route.params.conversationId).single()
    if (data) {
      title.value = data.title
    }
  }
})
</script>

<template>
  <nav
    class="border-b h-20 flex w-full items-center justify-between
    dark:border-neutral-700 px-6 dark:bg-neutral-800"
  >
    <UButton
      variant="link"
      size="sm"
      square
      color="gray"
      icon="i-heroicons-queue-list"
      class="block sm:hidden"
      @click="showMobileSidebar = true"
    />
    <div class="flex items-center gap-x-4">
      <OpenAIIcon class="w-6 h-6" />
      <p class="text-lg">
        {{ title }}
      </p>
      <UBadge color="green" variant="soft" size="sm">
        {{ currentRole }}
      </UBadge>
    </div>
  </nav>
</template>
