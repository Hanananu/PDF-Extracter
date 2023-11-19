import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from "./routes/AppRouter"
import { ToastContainer } from 'react-toastify'
import { UserProvider } from "./context/UserContext";
import './index.css'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <React.StrictMode>
  <UserProvider>
  <RouterProvider router={AppRouter}>
  </RouterProvider>
  </UserProvider>
  <ToastContainer/>
  </React.StrictMode>

  </>
  

)
