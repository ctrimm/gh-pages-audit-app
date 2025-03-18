import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { LandingPage } from './components/LandingPage'
import { SignInPage } from './components/SignInPage'
import { AuditDashboard } from './components/AuditDashboard'
import SegmentOverview from './components/SegmentOverview'
import AuditForm from './components/AuditForm'
import ReportDashboard from './components/ReportDashboard'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<AuditDashboard />} />
          <Route path="/audit" element={<SegmentOverview />} />
          <Route path="/audit/segment/:segmentId" element={<AuditForm />} />
          <Route path="/report/" element={<ReportDashboard isRandomData={false} />} />
          <Route path="/report/:auditId" element={<ReportDashboard isRandomData={true} />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
