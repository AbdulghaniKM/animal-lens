<template>
  <Card class="rounded-lg">
    <CardHeader class="rounded-t-lg bg-portage-500 dark:bg-portage-950">
      <CardTitle class="flex flex-col gap-2 text-portage-950 dark:text-portage-100">
        <div class="flex justify-between">
          <div class="flex flex-row gap-2 text-2xl font-bold">
            <p> Name: </p>
            <p> {{ animal.name }} </p>
          </div>
          <IconButton
            class="border-none"
            :class="isFavorite ? 'bg-portage-600' : 'bg-portage-500 active:!bg-portage-500'"
            :icon-class="isFavorite ? 'text-red-500' : ''"
            :icon="isFavorite ? 'iconamoon:heart-fill' : 'iconamoon:heart-light'"
            @click="toggleFavorite"
          />
        </div>
        <div class="flex flex-row gap-2 text-sm font-bold">
          <p> Scientific Name: </p>
          <p> {{ animal.taxonomy.scientific_name }} </p>
        </div>
      </CardTitle>
      <CardDescription>
        Locations: {{ animal.locations.filter((location) => location !== null).join(', ') }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm text-gray-500">
        <span class="font-bold">Slogan:</span>
        {{ animal.characteristics.slogan }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-bold">Lifespan:</span>
        {{ animal.characteristics.lifespan }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-bold">Diet:</span>
        {{ animal.characteristics.diet }}
      </p>
    </CardContent>
  </Card>
</template>

<script setup>
  import IconButton from '@/components/IconButton.vue';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { ref } from 'vue';
  const props = defineProps({
    animal: {
      type: Object,
      required: true,
    },
  });
  const isFavorite = ref(false);
  function toggleFavorite() {
    isFavorite.value = !isFavorite.value;
  }
</script>
