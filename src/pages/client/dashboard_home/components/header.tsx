import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";
import logo from "/images/logo.png";
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

const LogoText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3A80E1;
  background: linear-gradient(45deg, #3A80E1, #6A9EFC);
  -webkit-background-clip: text;
  color: transparent;
`;

const NavMenu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-evenly;
  width: 60%;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
  }
`;

const NavItem = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #3A80E1;
  }

  @media (max-width: 768px) {
    font-size: 16px;
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

const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #333;
    margin: 6px 0;
  }
`;

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Redireciona para a página principal e navega para a seção específica
  const navigateToSection = (section: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${section}`;
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <HeaderStyle>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <LogoText>TELECONNECT</LogoText>
      </LogoContainer>
      
      <HamburgerIcon onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>

      <NavMenu isOpen={isOpen}>
        {/* 🔹 AGORA "Para Você" VOLTA PARA A HOME E DIRECIONA PARA AS PROMOÇÕES */}
        <NavItem onClick={() => navigateToSection("promocoes")}>Para você</NavItem>

        {/* 🔹 "Para Empresas" VOLTA PARA A HOME E DIRECIONA PARA PLANOS EMPRESARIAIS */}
        <NavItem onClick={() => navigateToSection("plano-empresa")}>Para empresas</NavItem>

        <NavItem>
          <Link to="sobre-nos" style={{ textDecoration: 'none', color: 'inherit' }}>
            Porque a Teleconect
          </Link>
        </NavItem>
        
        {/* Botões estilizados */}
        <NavButton>Meus Planos</NavButton>
        <NavButton>Staff</NavButton>
      </NavMenu>
    </HeaderStyle>
  );
}

export default Header;
