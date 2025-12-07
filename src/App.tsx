import { useState } from 'react';
import './App.css';
import { LayoutShell, type UserRole } from './components/LayoutShell';
import { DashboardWidgets } from './components/DashboardWidgets';

function App() {
  const [role, setRole] = useState<UserRole>('cso');

  return (
    <LayoutShell role={role} onRoleChange={setRole}>
      <DashboardWidgets role={role} />
    </LayoutShell>
  );
}

export default App
