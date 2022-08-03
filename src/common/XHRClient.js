import axios from 'axios';
import store from "../store";
import { getArticle } from "../action/ArticleAction";

const options = {
  headers: {"content-type": "application/json"}
}

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
    }
  ).catch(
    error => {
      console.error(error);
    }
  );
}