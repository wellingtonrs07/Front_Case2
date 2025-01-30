import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import styled from 'styled-components';
import MainPage from './nested/mainpage';
import AboutUs from './nested/sobre_nos/sobre_nos';
import ConfirmCompra from './nested/compra/confirmar_dados/confirmar_dados';
import { Footer } from './components/footer';

export const Dashboard = () => {
    return (
        <DashboardStyles>
            <Header />
            <main>
                <Routes>
                    <Route path="planos" element={<MainPage />} />
                    <Route path="sobre-nos" element={<AboutUs />} />
                    <Route path="compra/confirmar-dados" element={<ConfirmCompra />} />
                </Routes>
            </main>
            <Footer /> {/* Adicionando o Footer ao final da página */}
        </DashboardStyles>
    );
};

const DashboardStyles = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Garante que ocupe toda a altura da tela */
    background-color: #f9f9f9;

    main {
        flex: 1; /* Faz com que o conteúdo principal ocupe o espaço disponível */
        padding-top: 100px; /* Espaço para não sobrepor o header */
        width: 100%; /* Ocupa toda a largura */
        padding-bottom: 50px; /* Garantir que o conteúdo não se sobreponha ao Footer */
    }
`;

