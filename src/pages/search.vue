<template>
  <main
    :class="[
      'min-h-screen bg-gradient-to-b dark:bg-gradient-to-b',
      `from-${themeStore.getThemeColor('200')} to-${themeStore.getThemeColor('400')}`,
      `dark:from-${themeStore.getThemeColor('900')} dark:to-${themeStore.getThemeColor('950')}`,
    ]"
  >
    <div class="container py-8">
      <div class="mb-12 text-center">
        <h1
          :class="[
            'motion-preset-focus mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent motion-delay-100 md:text-5xl',
            `from-${themeStore.getThemeColor('700')} to-${themeStore.getThemeColor('500')}`,
            `dark:from-${themeStore.getThemeColor('300')} dark:to-${themeStore.getThemeColor('100')}`,
          ]"
        >
          Search Results
          <Icon
            icon="solar:magnifier-bold"
            :class="[
              'motion-preset-bounce mr-2 inline-block h-6 w-6',
              `text-${themeStore.getThemeColor('500')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
          />
        </h1>
        <p
          :class="[
            'motion-preset-focus mx-auto max-w-2xl text-lg motion-delay-200',
            `text-${themeStore.getThemeColor('800')}`,
            `dark:text-${themeStore.getThemeColor('200')}`,
          ]"
        >
          Showing results for "{{ route.query.q }}"
        </p>
      </div>
      <div
        v-if="isLoading"
        class="flex justify-center py-12"
      >
        <div class="flex flex-col items-center gap-4">
          <Icon
            icon="solar:loading-bold"
            :class="[
              'h-12 w-12 animate-spin',
              `text-${themeStore.getThemeColor('500')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
          />
          <p
            :class="[
              `text-${themeStore.getThemeColor('700')}`,
              `dark:text-${themeStore.getThemeColor('300')}`,
            ]"
            >Searching for animals...</p
          >
        </div>
      </div>
      <div
        v-else-if="!animalsStore.animals.length"
        :class="[
          'flex flex-col items-center justify-center gap-4 rounded-xl p-12 text-center',
          'bg-white/50',
          `dark:bg-${themeStore.getThemeColor('900')}/50`,
        ]"
      >
        <Icon
          icon="solar:emoji-sad-circle-bold"
          :class="[
            'h-16 w-16',
            `text-${themeStore.getThemeColor('500')}`,
            `dark:text-${themeStore.getThemeColor('400')}`,
          ]"
        />
        <div>
          <h2
            :class="[
              'mb-2 text-2xl font-bold',
              `text-${themeStore.getThemeColor('900')}`,
              `dark:text-${themeStore.getThemeColor('100')}`,
            ]"
          >
            No Results Found
          </h2>
          <p
            :class="[
              `text-${themeStore.getThemeColor('700')}`,
              `dark:text-${themeStore.getThemeColor('300')}`,
            ]"
          >
            Try searching for a different animal or check out our suggested categories.
          </p>
          <router-link
            to="/"
            :class="[
              'motion-preset-pop mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-all',
              `bg-${themeStore.getThemeColor('500')}/10`,
              `text-${themeStore.getThemeColor('700')}`,
              `hover:bg-${themeStore.getThemeColor('500')}/20`,
              `dark:bg-${themeStore.getThemeColor('400')}/10`,
              `dark:text-${themeStore.getThemeColor('300')}`,
              `dark:hover:bg-${themeStore.getThemeColor('400')}/20`,
            ]"
          >
            <Icon
              icon="solar:home-2-bold"
              class="w-5 h-5"
            />
            Back to Home
          </router-link>
        </div>
      </div>
      <div
        v-else
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <AnimalCard
          v-for="animal in animalsStore.animals"
          :key="animal.name"
          :animal="animal"
          :is-favorite="animalsStore.isFavorite(animal)"
          @toggle-favorite="animalsStore.toggleFavorite(animal)"
          class="transform transition-all duration-300 hover:translate-y-[-4px]"
        />
      </div>
    </div>
  </main>
</template>
<script setup>
  import AnimalCard from '@/components/AnimalCard.vue';
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const animalsStore = useAnimalsStore();
  const themeStore = useThemeStore();
  const isLoading = ref(true);
  async function searchAnimals(query) {
    if (!query) return;
    isLoading.value = true;
    try {
      await animalsStore.searchAnimals(query);
    } finally {
      isLoading.value = false;
    }
  }
  watch(
    () => route.query.q,
    (newQuery) => {
      if (newQuery) {
        searchAnimals(newQuery);
      }
    }
  );
  onMounted(() => {
    if (route.query.q) {
      searchAnimals(route.query.q);
    }
  });
</script>
