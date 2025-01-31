import React, { useEffect, useState } from 'react';
import { getPlansRequest } from '@/pages/client/dashboard_home/nested/planos/api/planos';
import publicidade from "/images/publicidade.jpeg"; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Plan = {
    _id: string;
    type: string;
    speed: string;
    details: string[];
    price: number;
    public: string;
};

export const PlansList: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const route = '/client/get-plan';
                const data: Plan[] = await getPlansRequest<Plan[]>(route);
                setPlans(data);
            } catch (err) {
                setError('Falha ao carregar planos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Agrupar planos por tipo
    const groupedPlans = plans.reduce((acc: { [key: string]: Plan[] }, plan: Plan) => {
        if (!acc[plan.type]) {
            acc[plan.type] = [];
        }
        acc[plan.type].push(plan);
        return acc;
    }, {});

    return (
        <div className="w-full flex flex-col items-center justify-center px-6 bg-white">
            {/* Renderizando cada grupo de planos */}
            {Object.entries(groupedPlans).map(([type, plansGroup]) => (
                <div key={type} className="w-full max-w-6xl p-6 mb-20">
                    <h2 className="text-4xl font-bold text-blue-700 mb-16 text-center">{type}</h2>
                    <div className="flex flex-col space-y-24">
                        {plansGroup.map((plan) => (
                            <div 
                                key={plan._id} 
                                id={plan.type} 
                                className="flex flex-col md:flex-row items-center justify-between w-full p-12 rounded-2xl shadow-sm border border-gray-200 bg-white transition-all"
                            >
                                {/* 🔹 Container das informações do plano */}
                                <div className="w-full md:w-3/5 p-12 text-center">
                                    <h3 className="text-3xl font-bold text-blue-700 uppercase">{plan.type}</h3>
                                    <p className="text-6xl font-extrabold text-blue-600 mt-4">{plan.speed}</p>
                                    <p className="text-xl text-gray-500">Velocidade</p>

                                    <div className="w-full border-t border-gray-300 my-10"></div>

                                    <ul className="text-gray-700 text-lg space-y-4">
                                        {plan.details.map((detail, index) => (
                                            <li key={index} className="font-medium">{detail}</li>
                                        ))}
                                    </ul>

                                    <div className="w-full border-t border-gray-300 my-10"></div>

                                    {/* 🔹 Preço e "/mês" na mesma linha, botão abaixo */}
                                    <div className="flex flex-col items-center">
                                        <div className="inline-flex items-baseline text-blue-700">
                                            <p className="text-5xl font-extrabold">R${plan.price.toFixed(2)}</p>
                                            <p className="text-2xl font-medium ml-2">/mês</p>
                                        </div>

                                        <Link
                                            to="/client/dashboard/compra/confirmar-dados" 
                                            className="mt-6 px-12 py-4 bg-blue-600 text-white text-xl font-bold rounded-full hover:bg-blue-700 transition-all"
                                        >
                                            Contratar Agora
                                        </Link>
                                    </div>
                                </div>

                                {/* 🔹 Imagem sempre à direita */}
                                <div className="w-full md:w-2/5 flex justify-center">
                                    <img 
                                        src={publicidade} 
                                        alt="Plano"
                                        className="w-[550px] h-[550px] rounded-lg shadow-lg object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlansList;
