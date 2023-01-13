import React from 'react'
import ReactDOM from 'react-dom/client'
import "./i18n";
import "./index.css";
import App from "@app";
import FirebaseProvider from "@contexts/firebase.context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App/>
    </FirebaseProvider>
  </React.StrictMode>,
)
