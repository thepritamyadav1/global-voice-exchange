
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BrandDashboard from "./pages/BrandDashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Brands from "./pages/Brands";
import Contact from "./pages/Contact";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Enterprise from "./pages/Enterprise";
import Careers from "./pages/Careers";
import Rewards from "./pages/Rewards";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/rewards" element={<Rewards />} />

            {/* Auth routes - redirect to dashboard if already logged in */}
            <Route element={<ProtectedRoute requireAuth={false} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* User protected routes */}
            <Route element={<ProtectedRoute requireAuth={true} allowedRole="user" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/submit-feedback" element={<SubmitFeedback />} />
            </Route>

            {/* Brand protected routes */}
            <Route element={<ProtectedRoute requireAuth={true} allowedRole="brand" />}>
              <Route path="/brand-dashboard" element={<BrandDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
