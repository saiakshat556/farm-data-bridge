
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./services/api";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";

// Farmer Pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";

// Officer Pages (these would be created similarly to the farmer dashboard)
// Admin Pages (these would be created similarly to the farmer dashboard)

// Error Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: JSX.Element, 
  requiredRole: "farmer" | "officer" | "admin" | null 
}) => {
  const isAuthenticated = auth.isAuthenticated();
  const user = auth.getCurrentUser();
  const hasRequiredRole = !requiredRole || (user && user.role === requiredRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRequiredRole) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === "farmer") {
      return <Navigate to="/farmer" replace />;
    } else if (user?.role === "officer") {
      return <Navigate to="/officer" replace />;
    } else if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

const App = () => {
  // Helper function to redirect to role-specific dashboard if logged in
  const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = auth.isAuthenticated();
    const user = auth.getCurrentUser();

    if (isAuthenticated && user) {
      if (user.role === "farmer") {
        return <Navigate to="/farmer" replace />;
      } else if (user.role === "officer") {
        return <Navigate to="/officer" replace />;
      } else if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
      }
    }

    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <RedirectIfAuthenticated>
                <LandingPage />
              </RedirectIfAuthenticated>
            } />
            <Route path="/login" element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } />
            <Route path="/register" element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            } />
            
            {/* Farmer routes */}
            <Route path="/farmer" element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Officer routes would go here */}
            <Route path="/officer" element={
              <ProtectedRoute requiredRole="officer">
                <div>Officer Dashboard - To be implemented</div>
              </ProtectedRoute>
            } />
            
            {/* Admin routes would go here */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Dashboard - To be implemented</div>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
