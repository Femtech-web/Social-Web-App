import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css';

import { Provider } from 'react-redux';
import {store, persistor} from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider
    clientId="24585174080-s0g6hv933skb9onsti1kvrdh8mq04p69.apps.googleusercontent.com" >
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
)