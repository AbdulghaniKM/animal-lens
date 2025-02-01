import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/',
  headers: {
    'X-Api-Key': 'yhxeDukonpqWGUlVgswGeA==2N8VnLf1H7vVEHIu',
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = Axios;
    app.provide('axios', Axios);
  },
};

export { Axios };
