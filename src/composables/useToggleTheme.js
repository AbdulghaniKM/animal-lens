import { ref } from 'vue';

const isDarkMode = ref(
  localStorage.getItem('dark-mode') === 'true' ||
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

function initTheme() {
  // Apply initial theme
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    toggleTheme(e.matches);
  });
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('dark-mode', isDarkMode.value);

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export { isDarkMode, toggleTheme, initTheme };
