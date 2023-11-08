<script setup lang='ts'>
const showMobileSidebar = useShowMobileSidebar()
</script>

<template>
  <div class="h-screen flex">
    <div class="h-full hidden sm:block">
      <SideBar />
    </div>
    <div class="sm:ml-64 sm:w-[calc(100vw-256px)] w-full">
      <NavBar />
      <main class="min-h-[calc(100vh-80px)] dark:bg-neutral-800">
        <slot />
      </main>
    </div>
    <ModalProvider />
    <MobileSidebar :is-open="showMobileSidebar" @close="showMobileSidebar = false" />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
