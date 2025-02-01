<template>
  <main
    class="min-h-screen bg-gradient-to-b from-portage-200 to-portage-400 dark:bg-gradient-to-b dark:from-portage-900 dark:to-portage-950"
  >
    <div class="container py-4">
      <h1
        class="motion-preset-focus text-2xl font-bold text-portage-950 delay-75 dark:text-portage-100"
      >
        Welcome to AnimalLens!
      </h1>
      <h2
        class="motion-preset-focus text-lg font-bold text-portage-950 delay-100 dark:text-portage-100"
      >
        AnimalLens: Bringing the Wild to Your Fingertips – Discover, Learn, and Connect with the
        Animal Kingdom!
      </h2>
    </div>
    <div class="container">
      <h1 class="mb-4 text-2xl font-bold text-portage-950 delay-100 dark:text-portage-100">
        Featured Animals:
      </h1>
      <div class="lg:grid-cols mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <h1 v-if="animalsStore.animals === null">Loading...</h1>
        <AnimalCard
          v-for="animal in animalsStore.animals"
          :key="animal.name"
          :animal="animal"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
  import { useAnimalsStore } from '@/stores/useAnimalsStore';
  import { onMounted } from 'vue';
  import AnimalCard from '@/components/AnimalCard.vue';
  const animalsStore = useAnimalsStore();

  onMounted(() => {
    animalsStore.fetchAnimals();
  });
</script>
