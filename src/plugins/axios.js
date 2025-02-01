import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/animals',
  headers: {
    'X-Api-Key': process.env.VUE_APP_API_KEY,
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = Axios;
    app.provide('axios', Axios);
  },
};

export { Axios };
