import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuditProvider } from './context/AuditContext';

function App() {
  const location = useLocation();
  const isMarketingPage = location.pathname === '/';

  return (
    <AuditProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px]">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
        <Footer variant={isMarketingPage ? 'marketing' : 'dashboard'} />
      </div>
    </AuditProvider>
  );
}

export default App;
