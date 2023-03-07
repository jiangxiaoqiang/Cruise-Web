import axios from 'axios';
import store from "../store";
import { getArticle } from "../action/ArticleAction";

const instance = axios.create({
  timeout: 15000
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(
  config => {
      const accessToken = localStorage.getItem('cruiseAccessToken');
      accessToken && (config.headers['x-access-token'] = accessToken);
      return config
  },
  error => {
      return Promise.reject(error)
  }
)

export function request(config) {
  return instance(config).then(
    response => {
      const data = response.data.result;
      store.dispatch(getArticle(data));
    }
  ).catch(
    error => {
      console.error(error);
    }
  );
}

export function requestWithAction(config, action) {
  return instance(config).then(
    response => {
      const data = response.data.result;
      store.dispatch(action(data));
      return response.data;
    }
  ).catch(
    error => {
      console.error(error);
    }
  );
}