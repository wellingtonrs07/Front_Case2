import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from './components/menu';
import {DirPlansList} from './nested/planos/planos.page'

export const DirectorDashboard = () => {
    return (
        <DashboardStyles>
            <Menu/>
            <main>
            <Routes>
                    <Route path="planos-dir" element={<DirPlansList />} />
                </Routes>
            </main>
        </DashboardStyles>
    );
};

const DashboardStyles = styled.div`
    display: grid;
    grid-template-rows: 100px 1fr; /* Header fixo + conteúdo */
    grid-template-columns: 250px 1fr; /* Menu de 250px de largura + conteúdo */
    width: 100vw;
    height: 100vh; /* Garante que ocupe toda a tela */
    background-color: #dcdcdc;

    main {
        padding-top: 100px; /* Espaço para não sobrepor o header */
        width: 100%; /* Ocupa toda a largura disponível */
        padding-left: 20px; /* Ajuste o padding conforme necessário para garantir que o conteúdo não encoste no menu */
    }
`;
