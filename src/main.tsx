
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SiteHeader from "./app/components/SiteHeader.tsx";
import Home from "./app/pages/Home.tsx";
import Referees from "./app/pages/Referees.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SiteHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/referees" element={<Referees />} />
    </Routes>
  </BrowserRouter>
);