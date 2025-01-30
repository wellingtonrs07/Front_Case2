import { Route, Routes } from 'react-router-dom';
import { HeaderDados } from './components/header';
import styled from 'styled-components';
import UserServicesPage from './nested/meus_planos/meus_planos';


export const DashboardDados = () => {
    return (
        <DashboardStyles>
            <HeaderDados />
            <main>
                <Routes>
                    <Route path="meus-planos" element={<UserServicesPage />} />
                </Routes>
            </main>
        </DashboardStyles>
    );
};

const DashboardStyles = styled.div`
    display: grid;
    grid-template-rows: 100px 1fr; /* Header fixo + conteúdo */
    grid-template-columns: 100%;
    width: 100vw;
    height: 100vh; /* Garante que ocupe toda a tela */
    background-color: #f9f9f9;

    main {
        padding-top: 100px; /* Espaço para não sobrepor o header */
        width: 100%; /* Ocupa toda a largura */
    }
`;

