import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Symptom from "./pages/Symptom";
import Drug from "./pages/Drug";
import DrugDetail from "./pages/DrugDetail";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import "./App.css";

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/symptom" element={<Symptom />} />
        <Route path="/drug" element={<Drug />} />
        <Route path="/detail/condition/:term" element={<Detail/>} />
        <Route path="/drugDetail/:term" element={<DrugDetail/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
);