import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "@/components/layouts/navbar";
import LandingPage from "./pages/landing";
import Footer from "@/components/layouts/footer";
import PartnerDetail from "./pages/landing/PartnerDetail"; 

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
      </Route>

      {/* Jika nanti ada halaman Login/404 yang TIDAK butuh Navbar, taruh di luar MainLayout seperti ini: */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;