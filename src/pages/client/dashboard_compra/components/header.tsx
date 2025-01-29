import { Link } from 'react-router-dom';
import styled from "styled-components";
import logo from "/images/logo.png"; // Certifique-se de que o caminho do logo está correto
import React from 'react';

const HeaderStyle = styled.div`
  position: fixed; /* Torna o cabeçalho fixo */
  top: 0; /* Fixa no topo da tela */
  left: 0; /* Garante que ocupe toda a largura */
  width: 100%; /* Ocupa 100% da largura da tela */
  height: 80px; /* Definindo uma altura fixa para o cabeçalho */
  background-color: white; /* Cor de fundo */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombras para o efeito visual */
  display: flex;
  justify-content: space-between; /* Garante que o logo e os links fiquem em lados opostos */
  align-items: center;
  padding: 0 20px; /* Espaçamento interno */
  z-index: 1000; /* Garante que o cabeçalho fique sobre outros elementos */

  /* Responsividade */
  @media (max-width: 768px) {
    height: 60px; /* Reduz a altura em telas menores */
    padding: 0 10px; /* Reduz o padding em telas menores */
    flex-direction: column; /* Empilha o logo e os links na versão mobile */
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 40px; /* Ajuste o tamanho do logo */
`;

const LogoText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3A80E1; /* Azul */
  background: linear-gradient(45deg, #3A80E1, #6A9EFC); /* Gradiente do logo */
  -webkit-background-clip: text;
  color: transparent;
`;

const NavMenu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-evenly; /* Distribui os itens igualmente */
  width: 60%; /* Ocupa 60% da largura do cabeçalho para os links */
  gap: 30px; /* Espaçamento entre os itens do menu */
  align-items: center;

  /* Responsividade */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os itens de navegação na versão mobile */
    width: 100%; /* Faz com que ocupe 100% da largura */
    gap: 10px;
    display: ${props => (props.isOpen ? 'flex' : 'none')}; /* Exibe os links quando o menu de hambúrguer estiver aberto */
  }
`;

const NavItem = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;

  &:hover {
    color: #007bff; /* Cor ao passar o mouse */
  }

  /* Responsividade: Ajusta o tamanho da fonte em telas menores */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Point = styled.div`
  width: 10px;
  height: 10px;
  background-color: #3A80E1; /* Cor do ponto azul */
  border-radius: 50%;
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
  const [isOpen, setIsOpen] = React.useState(false); // Estado para abrir/fechar o menu hambúrguer

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna o estado do menu
  };

  return (
    <HeaderStyle>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <LogoText>TELECONNECT</LogoText>
      </LogoContainer>
      
      {/* Ícone de hambúrguer para telas pequenas */}
      <HamburgerIcon onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>
    </HeaderStyle>
  );
}

export default Header;

