import styled from "styled-components";

const SubheaderStyle = styled.div`
  position: fixed; /* Torna o subheader fixo */
  top: 80px; /* Posiciona logo abaixo do cabeçalho principal */
  left: 0; /* Garante que ocupe toda a largura */
  width: 100%; /* Ocupa 100% da largura da tela */
  height: 50px; /* Definindo uma altura fixa para o subheader */
  background-color: #f8f9fa; /* Cor de fundo mais clara */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombras para o efeito visual */
  display: flex;
  justify-content: center; /* Centraliza os itens do menu */
  align-items: center;
  padding: 0 20px; /* Espaçamento interno */
  z-index: 999; /* Garante que o subheader fique abaixo do cabeçalho principal */

  /* Responsividade */
  @media (max-width: 768px) {
    top: 50px; /* Ajusta a posição em telas menores */
    height: 40px; /* Reduz a altura em telas menores */
    padding: 0 10px; /* Reduz o padding em telas menores */
  }
`;

const SubNavMenu = styled.nav`
  display: flex;
  width: 100%; /* Ocupa toda a largura disponível */
  justify-content: space-between; /* Distribui os itens igualmente no espaço horizontal */
  align-items: center;
  padding: 0 20px; /* Adiciona um padding para não colar nas bordas */

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 0 10px; /* Reduz o padding em telas menores */
  }
`;

const NavItem = styled.div`
  font-weight: 500;
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

export function Subheader() {
  return (
    <SubheaderStyle>
      <SubNavMenu>
        <NavItem>Produto 1</NavItem>
        <NavItem>Produto 2</NavItem>
        <NavItem>Produto 3</NavItem>
        <NavItem>Produto 4</NavItem>
        <NavItem>Produto 5</NavItem>
      </SubNavMenu>
    </SubheaderStyle>
  );
}

export default Subheader;
