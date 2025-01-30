import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from "styled-components";
import logo from "/images/logo.png";
import React, { useState } from 'react';

const HeaderStyle = styled.header`
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
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
    padding: 10px 0;
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
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #333;
    margin: 6px 0;
  }
`;

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <NavItem onClick={() => handleNavigation("plano-movel")}>Para você</NavItem>
        <NavItem onClick={() => handleNavigation("plano-empresa")}>Para empresas</NavItem>
        <NavItem>
          <Link to="sobre-nos" style={{ textDecoration: 'none', color: 'inherit' }}>
            Porque a Teleconect
          </Link>
        </NavItem>

        <NavButton>Meus Planos</NavButton>
        <NavButton>Staff</NavButton>
      </NavMenu>
    </HeaderStyle>
  );
}

export default Header;
