import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import TicketList from './pages/tickets/TicketList';
import TicketDetail from './pages/tickets/TicketDetail';
import TicketForm from './pages/tickets/TicketForm';
import Profile from './pages/profile/Profile';
import UsersManagement from './pages/admin/UsersManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, 
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<TicketList />} />
            <Route path="tickets/new" element={<TicketForm />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/users" element={<UsersManagement />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;