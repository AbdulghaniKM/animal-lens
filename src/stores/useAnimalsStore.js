import { $axios } from '@/plugins/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref([]);
  const favorites = ref(new Set());
  const isInitialized = ref(false);
  function initFromStorage() {
    try {
      const storedAnimals = localStorage.getItem('animals');
      if (storedAnimals) {
        animals.value = JSON.parse(storedAnimals);
      }
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        favorites.value = new Set(JSON.parse(storedFavorites));
        animals.value = animals.value.map((animal) => ({
          ...animal,
          isFavorite: favorites.value.has(animal.name),
        }));
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }
  async function fetchAnimals(type) {
    try {
      if (animals.value.length > 0) {
        return;
      }
      const response = await $axios.get('v1/animals', {
        params: { name: type },
      });
      const animalsWithFavorites = response.data.map((animal) => ({
        ...animal,
        isFavorite: favorites.value.has(animal.name),
      }));
      animals.value = [...animals.value, ...animalsWithFavorites];
      localStorage.setItem('animals', JSON.stringify(animals.value));
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  }
  function toggleFavorite(animal) {
    const index = animals.value.findIndex((a) => a.name === animal.name);
    if (index !== -1) {
      animals.value[index].isFavorite = !animals.value[index].isFavorite;
      if (animals.value[index].isFavorite) {
        favorites.value.add(animal.name);
      } else {
        favorites.value.delete(animal.name);
      }
      localStorage.setItem('animals', JSON.stringify(animals.value));
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites.value)));
    }
    return animals.value[index]?.isFavorite || false;
  }
  function isFavorite(animal) {
    return favorites.value.has(animal.name);
  }
  function clearStorage() {
    localStorage.removeItem('animals');
    localStorage.removeItem('favorites');
    animals.value = [];
    favorites.value = new Set();
  }
  async function searchAnimals(query) {
    try {
      const response = await $axios.get('v1/animals', {
        params: { name: query },
      });
      const searchResults = response.data.map((animal) => ({
        ...animal,
        isFavorite: favorites.value.has(animal.name),
      }));
      animals.value = searchResults;
      localStorage.setItem('animals', JSON.stringify(animals.value));
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }
  initFromStorage();
  return {
    animals,
    favorites,
    fetchAnimals,
    toggleFavorite,
    isFavorite,
    clearStorage,
    searchAnimals,
  };
});
