import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { restoreCSRF , csrfFetch } from 'store/csrf';
import * as sessionActions from './store/session'
import { ModalProvider } from 'context/Modal';
import UpdateTriggerProvider from 'context/updateTrigger';
const store = configureStore();

let isProduction: boolean = process.env.NODE_ENV === 'production'

if (!isProduction) {
  restoreCSRF()
  window['csrfFetch'] = csrfFetch;
  window['store'] = store;
  window['sessionActions'] = sessionActions
}

function Root() {
  return (
      <Provider store={store}>
        <ModalProvider>
        <UpdateTriggerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UpdateTriggerProvider>
        </ModalProvider>
      </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
