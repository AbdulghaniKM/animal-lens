<template>
  <Card
    :class="[
      'motion-preset-slide group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
      `shadow-${themeStore.getThemeColor('200')}/20 dark:shadow-${themeStore.getThemeColor('950')}/30`,
      isFavorite
        ? [
            `border-${themeStore.getThemeColor('400')}`,
            `bg-${themeStore.getThemeColor('50')}`,
            `dark:border-${themeStore.getThemeColor('600')}`,
            `dark:bg-${themeStore.getThemeColor('900')}`,
            'dark:backdrop-blur-sm',
          ]
        : [
            `border-${themeStore.getThemeColor('200')}`,
            'bg-white/80',
            `dark:border-${themeStore.getThemeColor('800')}`,
            `dark:bg-${themeStore.getThemeColor('900')}/80`,
            'dark:backdrop-blur-sm',
          ],
    ]"
  >
    <CardHeader
      :class="[
        'rounded-t-lg bg-gradient-to-br p-6',
        `from-${themeStore.getThemeColor('400')} to-${themeStore.getThemeColor('500')}`,
        `dark:from-${themeStore.getThemeColor('700')} dark:to-${themeStore.getThemeColor('800')}`,
        'dark:backdrop-blur-sm',
      ]"
    >
      <CardTitle class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="flex flex-row items-center gap-3">
            <p
              :class="[
                'text-2xl font-bold',
                'text-white',
                `dark:text-${themeStore.getThemeColor('50')}`,
                'dark:drop-shadow-md',
              ]"
            >
              {{ animal.name ? animal.name : 'No name available' }}
            </p>
          </div>
          <IconButton
            class="absolute right-4 top-4 border-none transition-all duration-300 hover:scale-110 dark:shadow-lg"
            :class="[
              isFavorite
                ? [
                    `bg-${themeStore.getThemeColor('500')}/90`,
                    `hover:bg-${themeStore.getThemeColor('600')}/90`,
                    `dark:bg-${themeStore.getThemeColor('600')}/90`,
                    `dark:hover:bg-${themeStore.getThemeColor('700')}/90`,
                    'dark:backdrop-blur-sm',
                  ]
                : [
                    `bg-${themeStore.getThemeColor('400')}/90`,
                    `hover:bg-${themeStore.getThemeColor('500')}/90`,
                    `dark:bg-${themeStore.getThemeColor('700')}`,
                    `dark:hover:bg-${themeStore.getThemeColor('800')}/90`,
                    'dark:backdrop-blur-sm',
                  ],
            ]"
            :icon-class="
              isFavorite ? 'text-red-400 dark:text-red-300' : 'text-white dark:text-white/90'
            "
            :icon="isFavorite ? 'iconamoon:heart-fill' : 'iconamoon:heart-light'"
            @click="$emit('toggle-favorite')"
          />
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span
              :class="[
                'font-medium',
                `text-${themeStore.getThemeColor('100')}`,
                'dark:drop-shadow-md',
              ]"
              >Scientific Name:</span
            >
            <span class="text-white dark:text-white/90 dark:drop-shadow-md">
              {{ animal.taxonomy.scientific_name || 'No scientific name available' }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span
              :class="[
                'font-medium',
                `text-${themeStore.getThemeColor('100')}`,
                'dark:drop-shadow-md',
              ]"
              >Locations:</span
            >
            <span class="text-white dark:text-white/90 dark:drop-shadow-md">
              {{
                animal.locations.filter((location) => location !== null).join(', ') ||
                'No locations available'
              }}
            </span>
          </div>
        </div>
      </CardTitle>
    </CardHeader>

    <CardContent
      :class="[
        'space-y-4 bg-gradient-to-br from-transparent p-6',
        `to-${themeStore.getThemeColor('50')}/30`,
        `dark:to-${themeStore.getThemeColor('950')}/20`,
        'dark:backdrop-blur-sm',
      ]"
    >
      <div class="flex flex-col gap-3">
        <div
          v-for="(value, key) in displayInfo"
          :key="key"
          :class="[
            'rounded-lg p-4 shadow-sm transition-colors',
            'bg-white/60 hover:bg-white/70',
            `dark:bg-${themeStore.getThemeColor('950')}/40`,
            `dark:hover:bg-${themeStore.getThemeColor('950')}/50`,
            'dark:shadow-md dark:backdrop-blur-sm',
          ]"
        >
          <div class="flex items-center justify-between">
            <span
              :class="[
                'font-medium',
                `text-${themeStore.getThemeColor('700')}`,
                `dark:text-${themeStore.getThemeColor('200')}`,
                'dark:drop-shadow-md',
              ]"
            >
              {{ formatKey(key) }}:
            </span>
            <span
              :class="[
                `text-${themeStore.getThemeColor('900')}`,
                `dark:text-${themeStore.getThemeColor('50')}`,
                'dark:drop-shadow-md',
              ]"
            >
              {{ formatValue(value) }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { useThemeStore } from '@/stores/useThemeStore';
  import { computed } from 'vue';

  const props = defineProps({
    animal: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  });

  const themeStore = useThemeStore();
  defineEmits(['toggle-favorite']);

  const displayInfo = computed(() => ({
    Slogan: props.animal.characteristics.slogan || 'No slogan available',
    Lifespan: props.animal.characteristics.lifespan || 'No lifespan available',
    'Biggest Threats':
      props.animal.characteristics.biggest_threat || 'No biggest threats available',
    Diet: props.animal.characteristics.diet || 'No diet available',
  }));

  const formatKey = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (value) => {
    return value;
  };
</script>
