import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from 'App';
import store from 'store';
import { ENV } from 'utils/constants';

const name = localStorage.getItem('api_name') || '이프';

if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
  const { worker } = require('./mocks/worker');
  worker.start();
  document.title = 'MSW로 API를 모킹 중인 마르코 장바구니 사이트';
} else {
  document.title = `${name}의 API가 작동 중인 마르코 장바구니 사이트`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
