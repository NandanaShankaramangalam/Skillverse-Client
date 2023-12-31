import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux/es/exports';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ChatProvider from './Context/chatContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ChatProvider> */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}>
        <App />
        </GoogleOAuthProvider>
        {/* </ChatProvider> */}
      </PersistGate> 
    </Provider> 
  // </React.StrictMode>
);

