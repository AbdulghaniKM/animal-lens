<template>
  <main
    class="min-h-screen bg-gradient-to-b from-portage-200 to-portage-400 dark:bg-gradient-to-b dark:from-portage-900 dark:to-portage-950"
  >
    <div class="container py-8">
      <div class="mb-8 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon
            icon="solar:magnifier-bold"
            class="h-6 w-6 text-portage-600 dark:text-portage-400"
          />
          <h1 class="text-3xl font-bold text-portage-950 dark:text-portage-100">
            Search Results for "{{ searchQuery }}"
          </h1>
        </div>
        <div
          class="motion-preset-slide flex items-center gap-2 rounded-lg bg-white/50 px-4 py-2 motion-delay-200 dark:bg-portage-900/50"
        >
          <Icon
            icon="solar:documents-bold"
            class="h-5 w-5 text-portage-600 dark:text-portage-400"
          />
          <span class="font-medium text-portage-700 dark:text-portage-300">
            {{ animalsStore.animals.length }} results
          </span>
        </div>
      </div>

      <div
        class="motion-preset-slide grid grid-cols-1 gap-6 motion-delay-300 sm:grid-cols-2 md:grid-cols-3"
      >
        <template v-if="animalsStore.animals.length">
          <AnimalCard
            v-for="animal in animalsStore.animals"
            :key="animal.name"
            :animal="animal"
            :is-favorite="animalsStore.isFavorite(animal)"
            @toggle-favorite="animalsStore.toggleFavorite(animal)"
            class="transform transition-all duration-300 hover:translate-y-[-4px]"
          />
        </template>
        <div
          v-else
          class="motion-preset-focus col-span-full flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white/50 p-8 text-center dark:bg-portage-900/50"
        >
          <Icon
            icon="solar:round-search-broken-bold"
            class="mb-4 h-16 w-16 text-portage-400 dark:text-portage-600"
          />
          <h2 class="mb-2 text-xl font-bold text-portage-800 dark:text-portage-200">
            No Results Found
          </h2>
          <p class="mb-6 max-w-md text-portage-600 dark:text-portage-400">
            Try searching for different animals or check out our suggested categories on the home
            page.
          </p>
          <router-link
            to="/"
            class="flex items-center gap-2 rounded-lg bg-portage-500 px-6 py-3 text-white transition-all hover:bg-portage-600 dark:bg-portage-600 dark:hover:bg-portage-700"
          >
            <Icon
              icon="solar:home-bold"
              class="h-5 w-5"
            />
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import AnimalCard from '@/components/AnimalCard.vue';
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { Icon } from '@iconify/vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const animalsStore = useAnimalsStore();
  const route = useRoute();

  const searchQuery = computed(() => route.query.q || '');
</script>
