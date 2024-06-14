import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Detail from "../../pages/Detail";
import Login from "../../pages/Login";
import Sign from "../../pages/Sign";
import { useState } from "react";

import Layout from "./Layout";

const Roter = () => {
  const [user, setUser] = useState(null);
  console.log("유저값", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="Detail/:id" element={<Detail />} />
        </Route>
        <Route path="Login/" element={<Login setUser={setUser} />} />
        <Route path="Sign/" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Roter;
