import { Routes, Route } from 'react-router-dom';
import SegmentOverview from './components/SegmentOverview';
import AuditForm from './components/AuditForm';
import ReportDashboard from './components/ReportDashboard';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<SegmentOverview />} />
          <Route path="/segment/:segmentId" element={<AuditForm />} />
          <Route path="/report" element={<ReportDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
