<script setup lang='ts'>
const toast = useToast()

const prompt = ref('')

const loading = ref(false)

const handleSubmit = () => {
  if (!prompt.value) {
    toast.add({
      title: 'Prompt is required',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}
</script>

<template>
  <div class="flex items-center gap-x-2">
    <UInput
      v-model="prompt"
      class="border-0 outline-none focus-visible:ring-0
      focus-visible:ring-transparent flex-1"
      :disabled="loading"
      placeholder="Please input..."
    />
    <UButton
      type="submit"
      label="Generate"
      :disabled="loading"
      color="gray"
      @click="handleSubmit"
    />
  </div>
</template>
