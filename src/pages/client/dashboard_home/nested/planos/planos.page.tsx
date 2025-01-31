import React, { useEffect, useState } from 'react';
import { getPlansRequest } from '@/pages/client/dashboard_home/nested/planos/api/planos';
import publicidade from "/images/publicidade.jpeg"; 
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import { Link } from 'react-router-dom'; // Importando Link do react-router-dom

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
    const navigate = useNavigate(); // Inicializando o useNavigate

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
        <div className="w-full flex flex-col items-center justify-center px-4">
            {/* Renderizando cada grupo de planos */}
            {Object.entries(groupedPlans).map(([type, plansGroup]) => (
                <div key={type} className="w-full max-w-6xl p-6 mb-12">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">{type}</h2>
                    <div className="flex flex-col justify-center">
                        {plansGroup.map((plan) => (
                            <div
                                key={plan._id}
                                id={plan.type}
                                className="flex flex-col items-center w-full p-6 mb-12"
                            >
                                {/* 🔹 Caixa de informações do plano (reduzida) */}
                                <div className="rounded-xl h-[400px] p-6 w-full flex flex-col items-center text-center shadow-md border border-gray-300">
                                    <h3 className="text-lg font-semibold text-blue-700 uppercase mb-2">{plan.type}</h3>
                                    <p className="text-3xl font-bold text-blue-600">{plan.speed}</p>
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

                                    {/* Alterando o botão para um Link */}
                                    <Link
                                        to="/client/dashboard/compra/confirmar-dados" 
                                        className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all"
                                    >
                                        Contratar Agora
                                    </Link>
                                </div>

                                {/* Benefícios e imagem do plano */}
                                <div className="flex flex-col items-center justify-center w-full px-6 mt-6 md:mt-0 space-y-6">
                                    {/* 🔹 Imagem grande e responsiva */}
                                    <div className="w-[500px] h-[600px] md:w-[400px] md:h-[400px] sm:w-[350px] sm:h-[350px] rounded-lg overflow-hidden shadow-lg">
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
                </div>
            ))}
        </div>
    );
};

export default PlansList;
