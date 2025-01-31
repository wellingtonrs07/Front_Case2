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
            <section id="promocoes" className="w-full flex flex-col items-center justify-center mt-8">
                <PromotionsList />
            </section>

            {/* Seção de Planos */}
            <section id="planos" className="w-full flex flex-col items-center justify-center mt-10 py-6">
                
                {/* 🔹 Seção de Planos "Para Você" */}
                <div className="w-full max-w-6xl">
                    <h3 id="para-voce" className="text-3xl font-semibold text-blue-700 text-center mb-8">
                    </h3>
                    <PlansList filter="Para você" />
                </div>
            </section>
        </div>
    );
};

export default MainPage;
