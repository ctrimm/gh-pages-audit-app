import { Outlet } from 'react-router-dom';
import { AuditProvider } from '../context/AuditContext';

export const AuditLayout = () => {
  return (
    <AuditProvider>
      <Outlet />
    </AuditProvider>
  );
};
