import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          backgroundImage:
            'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(30,64,175,0.95))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <App />
      </div>
    </>
  </React.StrictMode>
);
