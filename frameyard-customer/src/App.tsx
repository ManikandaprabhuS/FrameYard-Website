import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Toaster position="top-center" />
      
      {/* Header Placeholder */}
      <header className="h-16 border-b border-outline/30 flex items-center px-8 bg-surface/80 backdrop-blur sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tight text-primary">FrameYard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Public Auth Routes (Redirect to home if already logged in) */}
          <Route element={<AuthGuard requireAuth={false} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Regular Routes */}
          <Route path="/" element={<div className="p-8 text-center"><h2 className="text-3xl font-bold">Welcome to FrameYard</h2><p className="mt-4 text-on-surface-variant">The customer storefront is under construction.</p></div>} />
        </Routes>
      </main>

      {/* Footer Placeholder */}
      <footer className="py-8 text-center text-sm text-on-surface-variant border-t border-outline/30 mt-auto">
        &copy; {new Date().getFullYear()} FrameYard Studio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
