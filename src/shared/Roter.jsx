import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Detail from "../../pages/Detail";

const Roter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Roter;
