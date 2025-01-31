import React from 'react';
import PlansList from './planos/planos.page';
import PromotionsList from './promocoes/promocoes.page';
import { Subheader } from '../components/subheader';

const MainPage: React.FC = () => {
    return (
        <div className="w-screen flex flex-col items-center justify-center bg-white">
            {/* Barra superior */}
            <Subheader />

            {/* Seção de Promoções */}
            <section id="promocoes" className="w-full flex flex-col items-center justify-center">
                <PromotionsList />
            </section>

            {/* Seção de Planos */}
            <section id="planos" className="w-full flex flex-col items-center justify-center mt-14 py-8">
                {/* 🔹 Título um pouco maior e mais chamativo */}
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
                    As Melhores Ofertas Para Você
                </h2>

                <PlansList />
            </section>
        </div>
    );
};

export default MainPage;
