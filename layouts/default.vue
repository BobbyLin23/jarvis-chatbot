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
      <main class="h-[calc(100vh-80px)]">
        <slot />
      </main>
    </div>
    <ModalProvider />
    <MobileSidebar :is-open="showMobileSidebar" @close="showMobileSidebar = false" />
  </div>
</template>
