<template>
  <header
    :class="[
      'sticky top-0 z-50 py-4',
      `bg-${themeStore.getThemeColor('900')}`,
      `dark:bg-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <div class="container px-4 mx-auto">
      <div class="items-center justify-between hidden sm:flex">
        <div class="flex items-center space-x-8">
          <router-link
            to="/"
            class="text-2xl font-bold text-white transition-transform duration-200 transform hover:scale-105"
          >
            AnimalLens
          </router-link>
          <nav class="flex items-center space-x-6">
            <router-link
              v-for="link in navigationLinks"
              :key="link.path"
              :to="link.path"
              class="font-medium text-gray-300 transition-colors hover:text-white"
              :class="{ 'text-white': route.path === link.path }"
            >
              {{ link.name }}
            </router-link>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="isThemeMenuOpen = !isThemeMenuOpen"
            class="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
          >
            <Icon
              icon="solar:palette-bold"
              class="w-4 h-4"
            />
            <span class="capitalize">{{ themeStore.currentTheme }}</span>
          </button>
          <IconButton
            @click="toggleTheme"
            :icon="isDarkMode ? 'solar:moon-bold' : 'solar:sun-bold'"
            class="px-4 py-2 font-medium text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
          />
        </div>
      </div>
      <div class="flex items-center justify-between sm:hidden">
        <router-link
          to="/"
          class="text-xl font-bold text-white transition-transform duration-200 transform hover:scale-105"
        >
          AnimalLens
        </router-link>
        <button
          @click="toggleMenu"
          class="relative z-50 p-2 text-white rounded-lg"
          aria-label="Toggle menu"
        >
          <div class="relative w-6 h-6">
            <div
              :class="[
                'absolute h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'top-3 rotate-45' : 'top-1',
              ]"
            />
            <div
              :class="[
                'absolute top-3 h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'opacity-0' : 'opacity-100',
              ]"
            />
            <div
              :class="[
                'absolute h-0.5 w-6 transform bg-current transition-all duration-300',
                isMenuOpen ? 'top-3 -rotate-45' : 'top-5',
              ]"
            />
          </div>
        </button>
      </div>
      <div
        v-show="isMenuOpen"
        class="fixed inset-0 z-40 sm:hidden"
      >
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-sm"
          @click="toggleMenu"
        />
        <div
          :class="[
            'fixed inset-y-0 right-0 w-64 transform transition-transform duration-300',
            `bg-${themeStore.getThemeColor('900')}`,
            `dark:bg-${themeStore.getThemeColor('950')}`,
            isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          ]"
        >
          <div class="flex flex-col h-full p-6">
            <nav class="space-y-4">
              <router-link
                v-for="link in navigationLinks"
                :key="link.path"
                :to="link.path"
                class="block font-medium text-gray-300 transition-colors hover:text-white"
                :class="{ 'text-white': route.path === link.path }"
                @click="toggleMenu"
              >
                {{ link.name }}
              </router-link>
            </nav>
            <div class="mt-6 space-y-4">
              <p class="text-lg font-medium text-white">Change Theme</p>
              <button
                @click="isThemeMenuOpen = !isThemeMenuOpen"
                class="flex items-center justify-center w-full px-4 py-2 space-x-2 font-medium text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
              >
                <Icon
                  icon="solar:palette-bold"
                  class="w-4 h-4"
                />
                <span class="capitalize">{{ themeStore.currentTheme }}</span>
              </button>
              <p class="text-lg font-medium text-white">Change Mode</p>
              <IconButton
                @click="toggleTheme"
                :icon="isDarkMode ? 'solar:moon-bold' : 'solar:sun-bold'"
                class="w-full px-4 py-2 font-medium text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isThemeMenuOpen"
        ref="themeMenuRef"
        class="absolute z-50 w-48 bg-white rounded-lg shadow-lg right-4 top-16 dark:bg-gray-800"
      >
        <div class="p-2 space-y-1">
          <button
            v-for="theme in Object.values(themeStore.themes)"
            :key="theme.name"
            @click="handleThemeSelect(theme.name)"
            class="flex items-center w-full px-3 py-2 space-x-2 text-sm font-medium text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
              'bg-gray-100 dark:bg-gray-700': themeStore.currentTheme === theme.name,
            }"
          >
            <div :class="`h-4 w-4 rounded-full ${theme.color}`" />
            <span class="text-gray-900 capitalize dark:text-white">{{ theme.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { initTheme, isDarkMode, toggleTheme } from '@/composables/useToggleTheme';
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  import { onClickOutside } from '@vueuse/core';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const animalsStore = useAnimalsStore();
  const router = useRouter();
  const route = useRoute();
  const themeStore = useThemeStore();
  const searchQuery = ref(route.query.q || '');
  watch(
    () => route.query.q,
    (newQuery) => {
      if (newQuery !== searchQuery.value) {
        searchQuery.value = newQuery || '';
      }
    }
  );
  const handleSearch = async () => {
    if (!searchQuery.value.trim()) return;
    try {
      await animalsStore.searchAnimals(searchQuery.value);
      router.push({
        path: '/search',
        query: { q: searchQuery.value },
      });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  const isThemeMenuOpen = ref(false);
  const themeMenuRef = ref(null);
  const isMenuOpen = ref(false);
  function handleThemeSelect(theme) {
    themeStore.setTheme(theme);
    isThemeMenuOpen.value = false;
    if (isMenuOpen.value) {
      isMenuOpen.value = false;
      document.body.style.overflow = '';
    }
  }
  onClickOutside(themeMenuRef, () => {
    if (isThemeMenuOpen.value) {
      isThemeMenuOpen.value = false;
    }
  });
  onMounted(() => {
    initTheme();
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isThemeMenuOpen.value) {
          isThemeMenuOpen.value = false;
        }
        if (isMenuOpen.value) {
          isMenuOpen.value = false;
          document.body.style.overflow = '';
        }
      }
    });
  });
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Favorites', path: '/animals/favorites' },
  ];
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
  }
  watch(route, () => {
    if (isMenuOpen.value) {
      isMenuOpen.value = false;
      document.body.style.overflow = '';
    }
  });
</script>
