<template>
  <header class="bg-portage-500 py-4 dark:bg-portage-950">
    <div class="container flex items-center justify-between">
      <h1 class="text-2xl font-bold text-portage-100">AnimalLens</h1>
      <div class="flex items-center gap-4">
        <IconButton
          @click="toggleTheme"
          :icon="isDarkMode ? 'solar:moon-bold' : 'solar:sun-bold'"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { initTheme, isDarkMode, toggleTheme } from '@/composables/useToggleTheme';

  initTheme();
</script>
