import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import Footer from "./components/Footer";
import "./styles/vibestrings.css";
import "./styles/global.css";

function App() {
  const location = useLocation();
  const showBack = location.pathname !== "/";
  
  return (
    <div className="app">
      <Header showBack={showBack} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<BrandsPage />} />
          <Route path="/brand/:brandId" element={<ModelsPage />} />
          <Route path="/brand/:brandId/guitar/:guitarId" element={<GuitarDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;