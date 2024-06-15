import { Outlet } from 'react-router';
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';

import AuthButtonsPanel from './components/AuthButtonsPanel';
import { Link } from 'react-router-dom';
function App() {
  return (
    <MainLayout>
      <Header className="border-b-[1px] border-foreground ">
        <Header.Slot name="start">
          <h1 className="text-3xl font-bold">
            <Link to="/">My App</Link>
          </h1>
        </Header.Slot>
        <Header.Slot name="end">
          <AuthButtonsPanel />
        </Header.Slot>
      </Header>
      <Outlet />
    </MainLayout>
  );
}

export default App;
