import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import styled from 'styled-components';
import MainPage from './nested/mainpage';
import AboutUs from './nested/sobre_nos/sobre_nos';

export const Dashboard = () => {
    return (
        <DashboardStyles>
            <Header />
            <main>
                <Routes>
                    <Route path="planos" element={<MainPage />} />
                </Routes>
                <Routes>
                    <Route path="sobre-nos" element={<AboutUs />} />
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

