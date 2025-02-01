<template>
  <div
    :class="[
      'min-h-screen transition-all duration-200',
      isDarkMode ? 'dark' : ''
    ]"
  >
    <Default>
      <router-view></router-view>
    </Default>
  </div>
</template>

<script setup>
  import Default from '@/layouts/default.vue';
  import { isDarkMode } from '@/composables/useToggleTheme';
</script>
