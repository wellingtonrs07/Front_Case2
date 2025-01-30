import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";
import logo from "/images/logo_correta.png";
import React from 'react';

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 10px;
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavMenu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: auto; /* 🔹 Empurra o botão para a direita */
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
  }
`;

const NavButton = styled.button`
  font-weight: 600;
  font-size: 16px;
  padding: 8px 18px;
  border-radius: 25px;
  border: 2px solid #3A80E1;
  background-color: transparent;
  color: #3A80E1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #3A80E1;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 14px;
  }
`;

export function HeaderDados() {
  const [isOpen, setIsOpen] = React.useState(false);

  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <HeaderStyle>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
      </LogoContainer>

      <NavMenu isOpen={isOpen}>
        <NavButton onClick={goToHome}>Página Inicial</NavButton>
      </NavMenu>
    </HeaderStyle>
  );
}

export default HeaderDados;
