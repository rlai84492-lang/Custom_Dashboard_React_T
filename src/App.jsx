import React from 'react';
import { RouterProvider, useRouter, matchPath } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CopilotProvider } from './context/CopilotContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Calendar from './pages/Calendar';
import Journeys from './pages/Journeys';
import Customers from './pages/Customers';
import Library from './pages/Library';
import Campground from './pages/Campground';
import Analytics from './pages/Analytics';
import Leads from './pages/Leads';
import Reports from './pages/Reports';
import Placeholder from './pages/Placeholder';

function Screens() {
  const { path, navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (path === '/' || path === '/login') {
    navigate('/overview', { replace: true });
    return null;
  }

  let body = null;
  let params;
  if (matchPath('/overview', path)) body = <Overview />;
  else if (matchPath('/campaigns', path)) body = <Campaigns />;
  else if ((params = matchPath('/campaigns/:id', path))) body = <CampaignDetail id={params.id} />;
  else if (matchPath('/calendar', path)) body = <Calendar />;
  else if (matchPath('/journeys', path)) body = <Journeys />;
  else if (matchPath('/customers', path)) body = <Customers />;
  else if (matchPath('/library', path)) body = <Library />;
  else if (matchPath('/campground', path)) body = <Campground />;
  else if (matchPath('/analytics', path)) body = <Analytics />;
  else if (matchPath('/leads', path)) body = <Leads />;
  else if (matchPath('/reports', path)) body = <Reports />;
  else body = <Placeholder title={path} />;

  return <Layout>{body}</Layout>;
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>
          <DataProvider>
            <CopilotProvider>
              <Screens />
            </CopilotProvider>
          </DataProvider>
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
