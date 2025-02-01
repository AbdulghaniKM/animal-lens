import axios from 'axios';

export const $axios = axios.create({
  baseURL: 'https://api.api-ninjas.com',
  headers: {
    'X-Api-Key': 'yhxeDukonpqWGUlVgswGeA==2N8VnLf1H7vVEHIu',
    'Content-Type': 'application/json',
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = $axios;
    app.provide('axios', $axios);
  },
};
