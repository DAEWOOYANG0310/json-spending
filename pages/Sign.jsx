import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../src/Api/auth";

const Sign = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자에서 10글자 이내로만 가능합니다");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4글자에서 15글자 이내로만 가능합니다");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1글자에서 10글자 이내로만 가능합니다");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    if (response) {
      confirm("회원가입이 완료되었습니다.");
      navigate("/Login");
    }
  };

  return (
    <>
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
      <input
        type="text"
        value={nickname}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
        minLength="1"
        maxLength="10"
      />

      <button onClick={handleRegister}>회원가입</button>
      <button type="button" onClick={() => navigate("/Login")}>
        뒤로가기
      </button>
    </>
  );
};

export default Sign;
