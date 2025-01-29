import React from 'react';
import PlansList from './planos/planos.page';
import PromotionsList from './promocoes/promocoes.page';
import { Subheader } from '../components/subheader';

const MainPage: React.FC = () => {
    return (
        <div className="w-screen flex flex-col items-center justify-center">
            {/* Barra superior */}
            <Subheader />

            {/* Seção de Promoções */}
            <section id="promocoes" className="w-full flex flex-col items-center justify-center">
                <PromotionsList />
            </section>

            {/* Seção de Planos Móveis */}
            <section id="plano-movel" className="w-full flex flex-col items-center justify-center mt-20">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-8">
                    Nossos Planos Móveis
                </h2>
                <PlansList />
            </section>

            {/* Seção de Planos Empresariais */}
            <section id="plano-empresa" className="w-full flex flex-col items-center justify-center mt-20 bg-gray-100">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-8">
                    Nossos Planos Empresariais
                </h2>
                <PlansList />
            </section>
        </div>
    );
};

export default MainPage;
