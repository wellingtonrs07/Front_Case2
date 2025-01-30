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
    color: #3A80E1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 🔹 Função para rolar suavemente até a seção correta
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Subheader() {
  return (
    <SubheaderStyle>
      <SubNavMenu>
        <NavItem onClick={() => scrollToSection("Banda")}>Banda Larga</NavItem>
        <NavItem onClick={() => scrollToSection("Telfonia Fixa")}>Telefonia Fixa</NavItem>
        <NavItem onClick={() => scrollToSection("movel-4G")}>Telefonia Móvel 4G</NavItem>
        <NavItem onClick={() => scrollToSection("movel-5G")}>Telefonia Móvel 5G</NavItem>
      </SubNavMenu>
    </SubheaderStyle>
  );
}

export default Subheader;
