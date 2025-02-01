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
            'font-atma-bold motion-preset-focus mb-4 bg-gradient-to-r bg-clip-text text-4xl text-transparent motion-delay-100 md:text-5xl',
            `from-${themeStore.getThemeColor('700')} to-${themeStore.getThemeColor('500')}`,
            `dark:from-${themeStore.getThemeColor('300')} dark:to-${themeStore.getThemeColor('100')}`,
          ]"
        >
          Welcome to AnimalLens
          <Icon
            icon="solar:telescope-bold"
            :class="[
              'motion-preset-bounce mr-2 inline-block h-6 w-6',
              `text-${themeStore.getThemeColor('500')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
          />
        </h1>
        <p
          :class="[
            'font-atma-medium motion-preset-focus mx-auto max-w-2xl text-lg motion-delay-200',
            `text-${themeStore.getThemeColor('800')}`,
            `dark:text-${themeStore.getThemeColor('200')}`,
          ]"
        >
          Discover the fascinating world of animals through our curated collection. From majestic
          predators to gentle giants, explore their unique characteristics and stories.
        </p>
        <div class="flex flex-col items-center justify-center gap-4 mt-6">
          <div class="w-full max-w-xl">
            <div
              :class="[
                'flex items-center gap-2 rounded-lg px-4 py-3',
                `border bg-white/80 border-${themeStore.getThemeColor('400')} dark:bg-${themeStore.getThemeColor('900')}/80`,
                'shadow-sm backdrop-blur-sm',
              ]"
            >
              <Icon
                icon="solar:magnifer-bold"
                :class="[
                  'h-5 w-5',
                  `text-${themeStore.getThemeColor('500')}`,
                  `dark:text-${themeStore.getThemeColor('400')}`,
                ]"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for animals..."
                :class="[
                  'font-atma-medium w-full bg-transparent outline-none',
                  `placeholder:text-${themeStore.getThemeColor('400')}`,
                  `text-${themeStore.getThemeColor('900')}`,
                  `dark:text-${themeStore.getThemeColor('100')}`,
                  `dark:placeholder:text-${themeStore.getThemeColor('100')}`,
                ]"
                @keyup.enter="handleSearch"
              />
              <button
                v-if="searchQuery"
                @click="handleSearch"
                :class="[
                  'font-atma-medium rounded-lg px-3 py-1 text-sm transition-all',
                  `bg-${themeStore.getThemeColor('500')}`,
                  'text-white',
                  `hover:bg-${themeStore.getThemeColor('600')}`,
                ]"
              >
                Search
              </button>
            </div>
          </div>
          <div
            :class="[
              'motion-preset-slide flex max-w-xl items-center gap-3 rounded-lg px-4 py-3 motion-delay-300',
              `bg-${themeStore.getThemeColor('500')}/10`,
              `dark:bg-${themeStore.getThemeColor('400')}/10`,
            ]"
          >
            <Icon
              icon="solar:info-circle-bold"
              :class="[
                'h-5 w-5 shrink-0',
                `text-${themeStore.getThemeColor('600')}`,
                `dark:text-${themeStore.getThemeColor('400')}`,
              ]"
            />
            <p
              :class="[
                'font-atma-medium text-sm',
                `text-${themeStore.getThemeColor('700')}`,
                `dark:text-${themeStore.getThemeColor('300')}`,
              ]"
            >
              Note: This website uses query search to show animals. Try searching for animals like
              "lion", "penguin", "whale", or use our suggested categories below for the best
              experience!
            </p>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <SuggestedSpecies />
      </div>
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <h2
            :class="[
              'font-atma-bold mb-6 text-2xl',
              `text-${themeStore.getThemeColor('950')}`,
              `dark:text-${themeStore.getThemeColor('100')}`,
            ]"
          >
            <Icon
              icon="solar:stars-bold"
              :class="[
                'motion-preset-seesaw mr-2 inline-block h-6 w-6',
                `text-${themeStore.getThemeColor('500')}`,
                `dark:text-${themeStore.getThemeColor('400')}`,
              ]"
            />
            Featured Animals
          </h2>
          <button
            @click="shuffleAnimals"
            :class="[
              'font-atma-medium motion-preset-pop flex items-center gap-2 rounded-lg px-4 py-2 transition-all',
              `bg-${themeStore.getThemeColor('500')}/10`,
              `text-${themeStore.getThemeColor('700')}`,
              `hover:bg-${themeStore.getThemeColor('500')}/20`,
              `dark:bg-${themeStore.getThemeColor('400')}/10`,
              `dark:text-${themeStore.getThemeColor('300')}`,
              `dark:hover:bg-${themeStore.getThemeColor('400')}/20`,
            ]"
          >
            <Icon
              icon="solar:refresh-circle-bold"
              class="w-5 h-5"
            />
            Shuffle
          </button>
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
                'font-atma-medium',
                `text-${themeStore.getThemeColor('700')}`,
                `dark:text-${themeStore.getThemeColor('300')}`,
              ]"
            >
              Discovering amazing animals...
            </p>
          </div>
        </div>
        <div
          v-else
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          <template v-if="shuffledAnimals.length">
            <AnimalCard
              v-for="animal in shuffledAnimals"
              :key="animal.name"
              :animal="animal"
              :is-favorite="animalsStore.isFavorite(animal)"
              @toggle-favorite="animalsStore.toggleFavorite(animal)"
              class="transform transition-all duration-300 hover:translate-y-[-4px]"
            />
          </template>
        </div>
      </div>
      <div
        :class="[
          'mt-12 grid grid-cols-1 gap-6 rounded-xl p-6 sm:grid-cols-3',
          'bg-white/50',
          `dark:bg-${themeStore.getThemeColor('900')}/50`,
        ]"
      >
        <div class="text-center">
          <p
            :class="[
              'font-atma-bold text-3xl',
              `text-${themeStore.getThemeColor('700')}`,
              `dark:text-${themeStore.getThemeColor('300')}`,
            ]"
          >
            {{ shuffledAnimals.length }}
          </p>
          <p
            :class="[
              'font-atma-medium',
              `text-${themeStore.getThemeColor('600')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
            >Animals</p
          >
        </div>
        <div class="text-center">
          <p
            :class="[
              'font-atma-bold text-3xl',
              `text-${themeStore.getThemeColor('700')}`,
              `dark:text-${themeStore.getThemeColor('300')}`,
            ]"
          >
            {{ animalsStore.favorites.size }}
          </p>
          <p
            :class="[
              'font-atma-medium',
              `text-${themeStore.getThemeColor('600')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
            >Favorites</p
          >
        </div>
        <div class="text-center">
          <p
            :class="[
              'font-atma-bold text-3xl',
              `text-${themeStore.getThemeColor('700')}`,
              `dark:text-${themeStore.getThemeColor('300')}`,
            ]"
          >
            {{ uniqueLocations }}
          </p>
          <p
            :class="[
              'font-atma-medium',
              `text-${themeStore.getThemeColor('600')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
            >Locations</p
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
  import AnimalCard from '@/components/AnimalCard.vue';
  import SuggestedSpecies from '@/components/SuggestedSpecies.vue';
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const animalsStore = useAnimalsStore();
  const themeStore = useThemeStore();
  const route = useRoute();
  const router = useRouter();
  const searchQuery = ref(route.query.q || '');
  const isLoading = ref(true);
  watch(
    () => route.query.q,
    (newQuery) => {
      if (newQuery !== searchQuery.value) {
        searchQuery.value = newQuery || '';
        if (newQuery) {
          handleSearch();
        }
      }
    }
  );
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  const shuffledAnimals = computed(() => {
    if (!animalsStore.animals.length) return [];
    return shuffleArray(animalsStore.animals);
  });
  const uniqueLocations = computed(() => {
    const locations = new Set();
    animalsStore.animals.forEach((animal) => {
      animal.locations.forEach((location) => {
        if (location) locations.add(location);
      });
    });
    return locations.size;
  });
  function shuffleAnimals() {
    animalsStore.animals = [...animalsStore.animals];
  }
  async function handleSearch() {
    if (!searchQuery.value.trim()) return;
    isLoading.value = true;
    try {
      await animalsStore.fetchAnimals(searchQuery.value);
      router.push({
        path: '/search',
        query: { q: searchQuery.value },
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      isLoading.value = false;
    }
  }
  onMounted(async () => {
    isLoading.value = true;
    try {
      if (route.query.q) {
        await animalsStore.fetchAnimals(route.query.q);
      } else {
        await Promise.all([
          animalsStore.fetchAnimals('cat'),
          animalsStore.fetchAnimals('lion'),
          animalsStore.fetchAnimals('fox'),
        ]);
      }
    } finally {
      isLoading.value = false;
    }
  });
</script>
