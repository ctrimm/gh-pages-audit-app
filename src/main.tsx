import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuditProvider } from './context/AuditContext.tsx'
import SegmentOverview from './components/SegmentOverview'
import AuditForm from './components/AuditForm'
import ReportDashboard from './components/ReportDashboard'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuditProvider>
      <HashRouter>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<SegmentOverview />} />
              <Route path="/segment/:segmentId" element={<AuditForm />} />
              <Route path="/report" element={<ReportDashboard />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </AuditProvider>
  </React.StrictMode>,
)
