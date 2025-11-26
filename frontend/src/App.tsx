import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ListNotes from "./pages/ListNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-notes" element={<ListNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
