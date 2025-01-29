import React, { useEffect, useState } from 'react';
import { getPlansRequest } from '@/pages/client/dashboard_home/nested/planos/api/planos';
import publicidade from "/images/publicidade.jpeg"; // Imagem para os planos

// Define o tipo do plano
type Plan = {
    _id: string; // O _id é uma string no backend
    type: string;
    speed: string; // Mantemos speed como string
    details: string[]; // details é um array de strings
    price: number;
    public: string; // Campo public como string
};

export const PlansList: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]); // Estado com o tipo Plan[]
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const route = '/client/get-plan'; // Define a rota para a API
                const data: Plan[] = await getPlansRequest<Plan[]>(route); // Tipagem explícita
                const formattedPlans = data.map(plan => ({
                    ...plan,
                    id: plan._id, // Mapear _id para id
                    public: plan.public, // Campo public mapeado como string
                }));
                setPlans(formattedPlans); // Atualiza o estado com os dados formatados
            } catch (err) {
                setError('Failed to load plans.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">Nossos Planos</h1>
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="space-y-8">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row p-6 w-full"
                        >
                            {/* Conteúdo à esquerda */}
                            <div className="flex-1 pr-6">
                                <h2 className="text-xl font-bold mb-4">{plan.type}</h2>
                                <p className="text-lg text-gray-700 mb-4">Velocidade: {plan.speed}</p>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">Detalhes:</h3>
                                    <ul className="list-none pl-0 space-y-2">
                                        {plan.details.map((detail, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <span className="text-blue-600 mr-2">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 mb-4">R${plan.price.toFixed(2)}/mês</p>
                                <p className="text-sm text-gray-600">{plan.public}</p>
                                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">
                                    Contratar
                                </button>
                            </div>

                            {/* Imagem à direita */}
                            <div className="sm:w-1/3 mt-4 sm:mt-0">
                                <img
                                    src={publicidade}
                                    alt="Publicidade"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlansList;
