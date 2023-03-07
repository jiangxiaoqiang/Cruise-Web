import axios from 'axios';
import store from "../store";
import { getArticle } from "../action/ArticleAction";
import { v4 as uuid } from 'uuid';

const instance = axios.create({
  timeout: 15000
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(
  config => {
      const accessToken = localStorage.getItem('cruiseAccessToken');
      accessToken && (config.headers['x-access-token'] = accessToken);
      config.headers['x-request-id'] = uuid();
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