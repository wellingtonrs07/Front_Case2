import React, { useEffect, useState } from 'react';
import { getPlansRequest } from '@/pages/client/dashboard_home/nested/planos/api/planos';
import publicidade from "/images/publicidade.jpeg"; // Imagem do plano

// Define o tipo do plano
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

    return (
        <div className="w-full flex flex-col items-center justify-center px-4">
            {plans.map((plan) => (
                <div
                    key={plan._id}
                    className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 mb-10"
                >
                    {/* Caixa de informações do plano */}
                    <div className="rounded-xl p-6 w-full md:w-1/3 flex flex-col items-center text-center shadow-md border border-gray-300">
                        <h2 className="text-lg font-semibold text-blue-700 uppercase mb-2">{plan.type}</h2>
                        <p className="text-4xl font-bold text-blue-600">{plan.speed}</p>
                        <p className="text-sm text-gray-500">Velocidade</p>

                        <div className="w-full border-t border-gray-300 my-4"></div>

                        <ul className="text-gray-700 text-sm space-y-2">
                            {plan.details.map((detail, index) => (
                                <li key={index} className="text-gray-700">{detail}</li>
                            ))}
                        </ul>

                        <div className="w-full border-t border-gray-300 my-4"></div>

                        <p className="text-2xl font-bold text-blue-700">R${plan.price.toFixed(2)}</p>
                        <p className="text-gray-500 text-sm">/mês</p>

                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
                            Contratar Agora
                        </button>
                    </div>

                    {/* Benefícios e imagem do plano */}
                    <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-2/3 px-6 mt-6 md:mt-0">
                        {/* Lista de benefícios */}
                        <div className="flex flex-col text-left text-gray-600 space-y-1 w-full">
                            <p className="text-lg font-medium">Internet rápida e confiável</p>
                            <p className="text-lg font-medium">Atendimento prioritário</p>
                            <p className="text-lg font-medium">Wi-Fi incluso</p>
                            <p className="text-lg font-medium">Sem fidelidade</p>
                        </div>

                        {/* Imagem do plano */}
                        <div className="w-72 h-72 rounded-lg overflow-hidden shadow-lg mt-6 md:mt-0">
                            <img
                                src={publicidade}
                                alt="Plano"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlansList;
