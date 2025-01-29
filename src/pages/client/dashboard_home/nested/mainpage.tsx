import React from 'react';
import PlansList from './planos/planos.page';
import PromotionsList from './promocoes/promocoes.page';
import { Subheader } from '../components/subheader';

const MainPage: React.FC = () => {
    return (
        <div>
            <Subheader />
        <div className="w-full max-w-screen-xl mx-auto px-4">
            <PromotionsList />
            <PlansList/>
        </div>
        </div>
    );
};

export default MainPage;
