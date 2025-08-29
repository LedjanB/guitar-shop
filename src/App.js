import { Routes, Route } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BrandsPage />} />
        <Route path="/brand/:brandId" element={<ModelsPage />} />
        <Route path="/brand/:brandId/guitar/:guitarId" element={<GuitarDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;