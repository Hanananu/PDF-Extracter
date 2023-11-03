import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={AppRouter}>
  <ToastContainer/>
  </RouterProvider>
)
