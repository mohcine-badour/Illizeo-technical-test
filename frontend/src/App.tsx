import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeroSection from "./components/Home/HeroSection";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard/dashboard";
import ListNotes from "./pages/notes/listNotes";
import MyNotes from "./pages/notes/myNotes";
import Profile from "./pages/profile/profile";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "./routing/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/list-notes" element={<ProtectedRoute><ListNotes /></ProtectedRoute>} />
          <Route path="/my-notes" element={<ProtectedRoute><MyNotes /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
