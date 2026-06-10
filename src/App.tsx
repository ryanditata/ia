import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "@/components/layouts/navbar";
import LandingPage from "./pages/landing";
import Footer from "@/components/layouts/footer";
import PartnerDetail from "./pages/landing/PartnerDetail";
import MouDetail from "./pages/landing/MouDetail";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
        <main className="flex-1">
          <Outlet /> 
        </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partners/:id" element={<PartnerDetail />} />
        <Route path="/mous/:id" element={<MouDetail />} />
      </Route>

      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;