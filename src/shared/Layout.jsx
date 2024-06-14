import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getUserInfo } from "../Api/auth";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.nav`
  /* 네비게이션 바 스타일 */
`;

const LogoutButton = styled.button`
  padding: 0.8rem 1.5rem;
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

const Main = styled.main`
  flex-grow: 1;
  padding: 2rem;
`;

export default function Layout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        logoutHanlde;
      }
    });
  }, []);

  const logoutHanlde = () => {
    setUser(null);
    navigate("/Login");
    localStorage.clear();
  };

  return (
    <LayoutContainer>
      <Header>
        <Navigation>네비게이션바</Navigation>
        <LogoutButton onClick={logoutHanlde}>로그아웃</LogoutButton>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  );
}
