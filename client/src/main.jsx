import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => console.log('Error boundary reset')}>
  <RouterProvider router={AppRouter}>
  </RouterProvider>
  <ToastContainer/>
    </ErrorBoundary>
  </>
  

)
