import axios from 'axios';
import store from "../store";
import { getArticle } from "../action/ArticleAction";

export function request(config) {
  return axios(config).then(
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
  return axios(config).then(
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