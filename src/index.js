import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import routes from './routes/routes';
import store from './store';
window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {routes}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

window.onload = function () {
  document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
          event.preventDefault();
      }
  }, {
      passive: false  // 关闭被动监听
  });
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
