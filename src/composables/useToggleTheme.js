import { ref } from 'vue';

const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  window.localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const initTheme = () => {
  const theme = window.localStorage.getItem('theme');
  if (theme) {
    isDarkMode.value = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  }
};

export { isDarkMode, toggleTheme, initTheme };
