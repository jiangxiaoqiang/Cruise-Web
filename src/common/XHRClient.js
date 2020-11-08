import axios from 'axios';
import store from "../../store";
import { getAnalysis } from "../action/BookAnalysisAction";

export function request(config) {
  return axios(config).then(
    response => {
      console.info("Axios请求服务端返回结果是：", response.data.data);
      const data = response.data.data;
      console.info("result data:" + data)
      store.dispatch(getAnalysis(data));
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
      console.info("Axios请求服务端返回结果是：", response.data);
      const data = response.data.data;
      store.dispatch(action(data));
    }
  ).catch(
    error => {
      console.error(error);
    }
  );
}