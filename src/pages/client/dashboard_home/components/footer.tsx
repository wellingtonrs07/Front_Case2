import React from 'react';
import styled from 'styled-components';
import logo from "/images/logo_correta.png"; // Caminho da logo

// Criando o estilo para o footer
const FooterContainer = styled.footer`
  background-color: #f1f1f1; /* Cor de fundo cinza claro */
  color: #333; /* Texto em cinza escuro para contrastar com o fundo */
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between; /* Distribui os itens ao longo do eixo horizontal */
  align-items: center; /* Alinha verticalmente os itens no centro */
`;

const FooterText = styled.p`
  margin-left: 300px;
  font-size: 14px;
  text-align: center;
  flex: 1; /* Faz com que o texto de copyright ocupe todo o espaço central */
`;

const ContactInfo = styled.div`
  font-size: 14px;
  text-align: right; /* Alinha os contatos à esquerda */
  flex: 1; /* Ocupa o espaço à esquerda */
`;

const Logo = styled.img`
  width: 250px; /* Tamanho ajustável para a logo */
  height:50px;
  flex: 0 0 auto; /* Garante que a logo tenha tamanho fixo e não ocupe mais espaço */
`;

export function Footer() {
  return (
    <FooterContainer>
      <Logo src={logo} alt="Logo Teleconnect" /> {/* Logo posicionada à direita */}
      <FooterText>© 2025 Teleconnect. Todos os direitos reservados.</FooterText>
      <ContactInfo>
        <p>Nossos contatos:</p>
        <p><a href="mailto:atendimento@teleconnect.com">atendimento@teleconnect.com</a></p>
        <p><a href="tel:+5511941490504">(11) 94149-0504</a></p>
      </ContactInfo>
    </FooterContainer>
  );
}
