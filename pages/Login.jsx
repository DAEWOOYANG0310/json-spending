import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <form>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디"
          minLength="4"
          maxLength="10"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength="4"
          maxLength="15"
        />
        <button>로그인</button>
        <button type="button" onClick={() => navigate("/Sign")}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default Login;
