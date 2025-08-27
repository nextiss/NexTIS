import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginpage/LoginPage"; 
import Nextis from "../pages/nextis/Nextis"; 
import Comandou from "../pages/comandou/Comandou"; 
import Estock from "../pages/estock/Estock"; 
import ScrollToTop from "./ScrollToTop";

const AppRoutes = () => { 
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Nextis />} /> {/* Página comanda*/}
        <Route path="/login" element={<LoginPage/>} /> {/* Página login*/}
        <Route path="/comandou" element={<Comandou />} /> {/* Página comanda*/}
        <Route path="/estock" element={<Estock />} /> {/* Página comanda*/}

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;