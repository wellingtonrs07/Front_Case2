import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from "styled-components";
import logo from "/images/logo_correta.png";
import React from 'react';

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background-color: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  z-index: 1000;

  @media (max-width: 768px) {
    height: 55px;
    padding: 0 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    padding: 12px 0;
  }
`;

const NavItem = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #3A80E1;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 7px 0;
  }
`;

const NavButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 18px;
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
    font-size: 13px;
    padding: 5px 12px;
  }
`;

const scrollToSection = (sectionId: string) => {
  setTimeout(() => {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 65, // Ajuste para compensar o header fixo
        behavior: "smooth",
      });
    }
  }, 100); // Pequeno delay para garantir que a página carregue antes de rolar
};

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 500);
    }
  };

  return (
    <HeaderStyle>
      {/* Logo */}
      <LogoContainer onClick={() => navigate("/")}>
        <Logo src={logo} alt="Teleconnect Logo" />
      </LogoContainer>

      {/* Menu de Navegação */}
      <NavMenu>
        <NavItem onClick={() => handleNavigation("para-voce")}>Para Você</NavItem>
        <NavItem onClick={() => handleNavigation("para-empresas")}>Para Empresas</NavItem>

        <NavItem>
          <Link to="sobre-nos" style={{ textDecoration: 'none', color: 'inherit' }}>
            Porque a Teleconnect
          </Link>
        </NavItem>

        <NavButton>
          <Link to="/client/dashboard-dados" style={{ textDecoration: 'none', color: 'inherit' }}>
            Meus Planos
          </Link>
        </NavButton>
      </NavMenu>
    </HeaderStyle>
  );
}

export default Header;
