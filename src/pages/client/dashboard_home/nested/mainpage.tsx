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
                {/* 🔹 Título Geral */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    As Melhores Ofertas
                </h2>

                {/* 🔹 Seção de Planos "Para Você" */}
                <div className="w-full max-w-6xl">
                    <h3 id= 'Para Você'className="text-2xl font-semibold text-blue-700 text-center mb-6"></h3>
                    <PlansList filter="Para você" />
                </div>

                {/* 🔹 Espaço entre seções */}
                <div className="w-full border-t border-gray-300 my-12"></div>

                {/* 🔹 Seção de Planos "Para Empresas" */}
                <div className="w-full max-w-6xl">
                    <h3 className="text-2xl font-semibold text-blue-700 text-center mb-6">Para Empresas</h3>
                    <PlansList filter="Para empresas" />
                </div>
            </section>
        </div>
    );
};

export default MainPage;
