import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import {store, persistor} from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_ID = import.meta.env.VITE_GOOGLE_CLIENTID


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider
    clientId={GOOGLE_ID} >
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
)