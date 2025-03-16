import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuditProvider } from './context/AuditContext.tsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuditProvider>
      <RouterProvider router={router} />
    </AuditProvider>
  </React.StrictMode>,
)
