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

// 🔹 Função para encontrar o elemento pelo texto e rolar suavemente até ele
const scrollToSectionByText = (text: string) => {
  const elements = document.querySelectorAll("h3, h2"); // Busca pelos títulos das seções
  let targetElement: HTMLElement | null = null;

  elements.forEach((element) => {
    if (element.textContent?.trim().toLowerCase() === text.toLowerCase()) {
      targetElement = element as HTMLElement;
    }
  });

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};

export function Subheader() {
  return (
    <SubheaderStyle>
      <SubNavMenu>
        <NavItem onClick={() => scrollToSectionByText("Banda Larga")}>Banda Larga</NavItem>
        <NavItem onClick={() => scrollToSectionByText("Telefonia Fixa")}>Telefonia Fixa</NavItem>
        <NavItem onClick={() => scrollToSectionByText("Telefonia Móvel")}>Telefonia Móvel 4G</NavItem>
        <NavItem onClick={() => scrollToSectionByText("Telefonia Móvel")}>Telefonia Móvel 5G</NavItem>
      </SubNavMenu>
    </SubheaderStyle>
  );
}

export default Subheader;
