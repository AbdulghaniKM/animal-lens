import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref(localStorage.getItem('color-theme') || 'portage');
  const themes = {
    portage: {
      name: 'portage',
      color: 'bg-portage-500',
      from: 'portage',
    },
    emerald: {
      name: 'emerald',
      color: 'bg-emerald-500',
      from: 'emerald',
    },
    sky: {
      name: 'sky',
      color: 'bg-sky-500',
      from: 'sky',
    },
    rose: {
      name: 'rose',
      color: 'bg-rose-500',
      from: 'rose',
    },
    orange: {
      name: 'orange',
      color: 'bg-orange-500',
      from: 'orange',
    },
    yellow: {
      name: 'yellow',
      color: 'bg-yellow-500',
      from: 'yellow',
    },
    lime: {
      name: 'lime',
      color: 'bg-lime-500',
      from: 'lime',
    },
    cyan: {
      name: 'cyan',
      color: 'bg-cyan-500',
      from: 'cyan',
    },
    slate: {
      name: 'slate',
      color: 'bg-slate-500',
      from: 'slate',
    },
    zinc: {
      name: 'zinc',
      color: 'bg-zinc-500',
      from: 'zinc',
    },
    blue: {
      name: 'blue',
      color: 'bg-blue-500',
      from: 'blue',
    },
    purple: {
      name: 'purple',
      color: 'bg-purple-500',
      from: 'purple',
    },
  };
  function setTheme(theme) {
    currentTheme.value = theme;
    localStorage.setItem('color-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
  function getThemeColor(shade = '500') {
    const theme = themes[currentTheme.value];
    return `${theme.from}-${shade}`;
  }
  setTheme(currentTheme.value);
  return {
    currentTheme,
    themes,
    setTheme,
    getThemeColor,
  };
});
