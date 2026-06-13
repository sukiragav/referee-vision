
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SiteHeader from "./app/components/SiteHeader.tsx";
import Home from "./app/pages/Home.tsx";
import Referees from "./app/pages/Referees.tsx";
import Books from "./app/pages/Books.tsx";
import Videos from "./app/pages/Videos.tsx";
import Webinars from "./app/pages/Webinars.tsx";
import Coaches from "./app/pages/Coaches.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SiteHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/referees" element={<Referees />} />
      <Route path="/books" element={<Books />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/webinars" element={<Webinars />} />
      <Route path="/coaches" element={<Coaches />} />
    </Routes>
  </BrowserRouter>
);