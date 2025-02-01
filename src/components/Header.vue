<template>
  <header
    :class="[
      'motion-preset-slide-down sticky top-0 z-50 border-b py-4 backdrop-blur-sm',
      `border-${themeStore.getThemeColor('400')}/20`,
      `bg-${themeStore.getThemeColor('500')}/95`,
      `dark:border-${themeStore.getThemeColor('800')}/30`,
      `dark:bg-${themeStore.getThemeColor('950')}/95`,
    ]"
  >
    <div class="container flex items-center justify-between">
      <div class="flex items-center gap-6">
        <router-link
          to="/"
          :class="[
            'text-2xl font-bold transition-colors hover:text-white',
            themeStore.currentTheme === 'emerald'
              ? 'text-emerald-50 dark:text-emerald-100'
              : 'text-portage-50 dark:text-portage-100',
          ]"
        >
          AnimalLens
        </router-link>

        <nav class="flex items-center gap-4">
          <router-link
            to="/"
            :class="[
              'transition-colors hover:text-white dark:hover:text-white',
              themeStore.currentTheme === 'emerald'
                ? 'text-emerald-200 dark:text-emerald-200'
                : 'text-portage-200 dark:text-portage-200',
            ]"
            active-class="text-white dark:text-white"
          >
            Home
          </router-link>
          <router-link
            to="/animals/favorites"
            :class="[
              'transition-colors hover:text-white',
              `text-${themeStore.getThemeColor('200')}`,
              `dark:text-${themeStore.getThemeColor('200')}`,
              'dark:hover:text-white',
            ]"
            active-class="text-white dark:text-white"
          >
            Favorites
          </router-link>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search animals..."
            :class="[
              'motion-preset-focus rounded-lg px-4 py-2 motion-delay-200 focus:outline-none focus:ring-2',
              `bg-${themeStore.getThemeColor('400')}/20`,
              `text-${themeStore.getThemeColor('100')}`,
              `placeholder:text-${themeStore.getThemeColor('200')}`,
              `focus:ring-${themeStore.getThemeColor('00')}/50`,
              `dark:bg-${themeStore.getThemeColor('800')}/30`,
              `dark:text-${themeStore.getThemeColor('200')}`,
              `dark:placeholder:text-${themeStore.getThemeColor('400')}`,
              `dark:focus:ring-${themeStore.getThemeColor('600')}/50`,
            ]"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            :class="`absolute right-2 top-1/2 -translate-y-1/2 text-${themeStore.getThemeColor('200')} hover:text-white dark:text-${themeStore.getThemeColor('400')} dark:hover:text-white`"
          >
            <Icon
              icon="mdi:search"
              class="h-5 w-5"
            />
          </button>
        </div>
        <div class="relative">
          <button
            @click="isThemeMenuOpen = !isThemeMenuOpen"
            :class="[
              'flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-white',
              `bg-${themeStore.getThemeColor('400')}/20`,
              `text-${themeStore.getThemeColor('100')}`,
              `hover:bg-${themeStore.getThemeColor('400')}/30`,
              `dark:bg-${themeStore.getThemeColor('800')}/30`,
              `dark:text-${themeStore.getThemeColor('200')}`,
              `dark:hover:bg-${themeStore.getThemeColor('800')}/50`,
            ]"
          >
            <Icon
              icon="solar:palette-bold"
              class="h-5 w-5"
            />
            <span class="text-sm capitalize">{{ themeStore.currentTheme }}</span>
          </button>

          <div
            v-if="isThemeMenuOpen"
            class="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg"
            :class="`dark:bg-${themeStore.getThemeColor('950')}`"
          >
            <div class="p-2">
              <button
                v-for="theme in Object.values(themeStore.themes)"
                :key="theme.name"
                @click="selectTheme(theme.name)"
                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm"
                :class="[
                  `text-${themeStore.getThemeColor('700')}`,
                  `dark:text-${themeStore.getThemeColor('300')}`,
                  `hover:bg-${themeStore.getThemeColor('50')}`,
                  `dark:hover:bg-${themeStore.getThemeColor('900')}`,
                  {
                    [`bg-${themeStore.getThemeColor('50')}`]:
                      themeStore.currentTheme === theme.name,
                    [`dark:bg-${themeStore.getThemeColor('900')}`]:
                      themeStore.currentTheme === theme.name,
                  },
                ]"
              >
                <div :class="`h-4 w-4 rounded-full ${theme.color}`" />
                <span class="capitalize">{{ theme.name }}</span>
              </button>
            </div>
          </div>
        </div>
        <IconButton
          @click="toggleTheme"
          :icon="isDarkMode ? 'solar:moon-bold' : 'solar:sun-bold'"
          class="motion-preset-pop flex items-center gap-2 rounded-lg px-4 py-2 transition-all"
          :class="[
            `bg-${themeStore.getThemeColor('400')}/20`,
            `text-${themeStore.getThemeColor('100')}`,
            `hover:bg-${themeStore.getThemeColor('500')}`,
            `dark:bg-${themeStore.getThemeColor('800')}/30`,
            `dark:text-${themeStore.getThemeColor('200')}`,
            `dark:hover:bg-${themeStore.getThemeColor('800')}/50`,
          ]"
        />
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

  // Initialize searchQuery from URL
  const searchQuery = ref(route.query.q || '');

  // Watch for route changes to update searchQuery
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

  function selectTheme(theme) {
    themeStore.setTheme(theme);
    isThemeMenuOpen.value = false;
  }

  onClickOutside(themeMenuRef, () => {
    isThemeMenuOpen.value = false;
  });

  onMounted(() => {
    initTheme();
  });
</script>
