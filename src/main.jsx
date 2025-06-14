import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import OsContextProvider from './context/Context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <BrowserRouter>
    <OsContextProvider>
      <App />

    </OsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
