import { $axios } from '@/plugins/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref(null);
  async function fetchAnimals(animalName) {
    const response = await $axios.get('v1/animals', {
      params: { name: animalName ? animalName : 'cheetah' },
    });
    animals.value = response.data;
  }
  return { animals, fetchAnimals };
});
