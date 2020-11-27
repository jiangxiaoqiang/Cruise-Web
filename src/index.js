import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import routes from './routes/routes';
import store from './store';
import 'lib-flexible';
window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {routes}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// 禁用IOS双指缩放和双击缩放, 安卓则不需要下面这个段代码

(function() {
  var agent = navigator.userAgent.toLowerCase();        //检测是否是ios

  if(agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0){

      // 禁用双指缩放
      document.documentElement.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
              event.preventDefault();
          }
      }, false);

      // 禁用双击缩放
      var lastTouchEnd=0;
      document.addEventListener('touchend',function (event) {
          var now=(new Date()).getTime();
          if(now-lastTouchEnd<=300){
              event.preventDefault();
          }
          lastTouchEnd=now;
      },false)
  }
})()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
