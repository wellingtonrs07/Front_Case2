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
            <Footer />
        </DashboardStyles>
    );
};

const DashboardStyles = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f9f9f9;

    main {
        flex: 1;
        width: 100%;
        padding-bottom: 50px; /* Mantém o espaçamento apenas para evitar sobreposição com o footer */
    }
`;

export default Dashboard;
