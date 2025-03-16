import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuditProvider } from './context/AuditContext.tsx'
import { MoveInOutProvider } from './context/MoveInOutContext.tsx'
import SegmentOverview from './components/SegmentOverview'
import AuditForm from './components/AuditForm'
import ReportDashboard from './components/ReportDashboard'
import MoveInOutOverview from './components/MoveInOutOverview'
import MoveInOutForm from './components/MoveInOutForm'
import MoveInOutReport from './components/MoveInOutReport'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Routes>
            <Route
              path="/"
              element={
                <AuditProvider>
                  <SegmentOverview />
                </AuditProvider>
              }
            />
            <Route
              path="/segment/:segmentId"
              element={
                <AuditProvider>
                  <AuditForm />
                </AuditProvider>
              }
            />
            <Route
              path="/report"
              element={
                <AuditProvider>
                  <ReportDashboard />
                </AuditProvider>
              }
            />
            <Route
              path="/move-in-out"
              element={
                <MoveInOutProvider>
                  <MoveInOutOverview />
                </MoveInOutProvider>
              }
            />
            <Route
              path="/move-in-out/segment/:segmentId"
              element={
                <MoveInOutProvider>
                  <MoveInOutForm />
                </MoveInOutProvider>
              }
            />
            <Route
              path="/move-in-out/report"
              element={
                <MoveInOutProvider>
                  <MoveInOutReport />
                </MoveInOutProvider>
              }
            />
          </Routes>
        </div>
      </div>
    </HashRouter>
  </React.StrictMode>,
)
