import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import ai from './images/ai.png';
import { PrivyProvider } from '@privy-io/react-auth';

import App from './App';
const AppID = 'cm8t6pfqx009k4l8skhscc6iz'
const ClientID = 'client-WY5i4SRZQ4XFte27tznLUS4kzUj4jJ8ApbVp8UusPe2ZZ'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={AppID}
      clientId={ClientID}
      config={{
        // Display email and wallet as login methods
        loginMethods: ['email', 'google', 'github', 'twitter'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: ai
        },

      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);