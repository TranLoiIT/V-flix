import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/libs/tailwind.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './state/configureStore';
import rootReducer from './state/rootReducer';
import rootSaga from './state/rootSaga';
import App from './views/App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore({}, rootReducer);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider
      // className='cursor-pointer'
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    >
      <ToastContainer />
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.isPushNotificationSupported
  ? serviceWorker.register()
  : serviceWorker.unregister();
