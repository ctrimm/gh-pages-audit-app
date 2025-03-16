import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuditProvider } from './context/AuditContext.tsx'

const router = createBrowserRouter([
  {
    path: "/gh-pages-audit-app/",
    element: <App />,
  },
], {
  basename: "/gh-pages-audit-app"
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuditProvider>
      <RouterProvider router={router} />
    </AuditProvider>
  </React.StrictMode>,
)
