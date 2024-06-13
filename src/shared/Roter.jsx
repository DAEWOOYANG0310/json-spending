import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Detail from "../../pages/Detail";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";

const Roter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Detail/:id" element={<Detail />} />
        <Route path="Login/" element={<Login />} />
        <Route path="Sign/" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Roter;
