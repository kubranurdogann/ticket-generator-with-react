import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Form from './Form.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import App from './App.tsx'

createRoot(document.getElementById('form-root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
