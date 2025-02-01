<template>
  <div class="mt-12">
    <h2
      :class="[
        'mb-6 flex items-center gap-2 text-2xl font-bold',
        `text-${themeStore.getThemeColor('950')}`,
        `dark:text-${themeStore.getThemeColor('100')}`,
      ]"
    >
      <Icon
        icon="ri:compass-discover-fill"
        :class="[
          'h-6 w-6',
          `text-${themeStore.getThemeColor('500')}`,
          `dark:text-${themeStore.getThemeColor('400')}`,
        ]"
      />
      Suggested Species
    </h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <button
        v-for="species in suggestedSpecies"
        :key="species.name"
        @click="handleSpeciesSearch(species.query)"
        :class="[
          'group motion-preset-pop relative overflow-hidden rounded-xl p-4 text-left transition-all motion-delay-[calc(var(--motion-index)*100ms)]',
          'bg-white/60 hover:bg-white/80',
          `dark:bg-${themeStore.getThemeColor('900')}/60`,
          `dark:hover:bg-${themeStore.getThemeColor('900')}/80`,
        ]"
      >
        <div class="relative z-10 flex flex-col gap-2">
          <Icon
            :icon="species.icon"
            :class="[
              'h-8 w-8 transition-transform group-hover:scale-110',
              `text-${themeStore.getThemeColor('600')}`,
              `dark:text-${themeStore.getThemeColor('400')}`,
            ]"
          />
          <div>
            <h3
              :class="[
                'font-medium',
                `text-${themeStore.getThemeColor('900')}`,
                `dark:text-${themeStore.getThemeColor('100')}`,
              ]"
            >
              {{ species.name }}
            </h3>
            <p
              :class="[
                'text-sm',
                `text-${themeStore.getThemeColor('600')}`,
                `dark:text-${themeStore.getThemeColor('400')}`,
              ]"
            >
              {{ species.description }}
            </p>
          </div>
        </div>
        <div
          :class="[
            'absolute inset-0 bg-gradient-to-br',
            `from-${themeStore.getThemeColor('500')}/5`,
            `to-${themeStore.getThemeColor('500')}/10`,
            `dark:from-${themeStore.getThemeColor('400')}/5`,
            `dark:to-${themeStore.getThemeColor('400')}/10`,
          ]"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { Icon } from '@iconify/vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const animalsStore = useAnimalsStore();
  const themeStore = useThemeStore();

  const suggestedSpecies = [
    {
      name: 'Big Cats',
      query: 'lion',
      icon: 'solar:cat-bold',
      description: 'Majestic felines from around the world',
    },
    {
      name: 'Arctic Animals',
      query: 'penguin',
      icon: 'solar:snowflake-bold',
      description: 'Creatures adapted to extreme cold',
    },
    {
      name: 'Sea Life',
      query: 'whale',
      icon: 'iconoir:sea-waves',
      description: 'Fascinating marine species',
    },
    {
      name: 'Birds of Prey',
      query: 'eagle',
      icon: 'game-icons:bird-claw',
      description: 'Masters of the sky',
    },
  ];

  const handleSpeciesSearch = async (query) => {
    try {
      await animalsStore.searchAnimals(query);
      router.push({
        path: '/search',
        query: { q: query },
      });
    } catch (error) {
      console.error('Species search failed:', error);
    }
  };
</script>
