import styled from "styled-components";

const SubheaderStyle = styled.div`
  position: fixed;
  top: 65px;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #f1f3f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  @media (max-width: 768px) {
    top: 55px;
    height: 35px;
  }
`;

const SubNavMenu = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const NavItem = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #3a80e1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 🔹 Função para encontrar o elemento pelo ID e rolar suavemente até ele
const scrollToSectionById = (id: string) => {
  const targetElement = document.getElementById(id); // Busca pelo ID do elemento

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" }); // Rola suavemente até o elemento
  }
};

export function Subheader() {
  return (
    <SubheaderStyle>
      <SubNavMenu>
        <NavItem onClick={() => scrollToSectionById("Banda Larga")}>Banda Larga</NavItem>
        <NavItem onClick={() => scrollToSectionById("Telefonia Fixa")}>Telefonia Fixa</NavItem>
        <NavItem onClick={() => scrollToSectionById("movel-5G")}>Telefonia Móvel 5G</NavItem>
      </SubNavMenu>
    </SubheaderStyle>
  );
}

export default Subheader;

