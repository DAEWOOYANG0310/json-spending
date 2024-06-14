import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../src/Api/auth";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #5352e6;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Login = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandle = async () => {
    const { userId, nickname, avatar } = await login({ id, password });
    setUser({ userId, nickname, avatar });
    navigate("/");
  };

  return (
    <LoginContainer>
      <Input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="아이디"
        minLength="4"
        maxLength="10"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="비밀번호"
        minLength="4"
        maxLength="15"
      />
      <Button type="button" onClick={loginHandle}>
        로그인
      </Button>
      <Button type="button" onClick={() => navigate("/Sign")}>
        회원가입
      </Button>
    </LoginContainer>
  );
};

export default Login;
