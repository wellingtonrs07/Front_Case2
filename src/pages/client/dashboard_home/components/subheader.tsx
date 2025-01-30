import React, { useEffect, useState } from 'react';
import { getPlansRequest } from '@/pages/client/dashboard_home/nested/planos/api/planos';
import publicidade from "/images/publicidade.jpeg"; 

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

    // 🔹 Separar os planos por categorias
    const bandaLarga = plans.filter(plan => plan.type.toLowerCase().includes("banda larga"));
    const telefoniaFixa = plans.filter(plan => plan.type.toLowerCase().includes("telefonia fixa"));
    const telefoniaMovel4G = plans.filter(plan => plan.type.toLowerCase().includes("telefonia móvel 4g"));
    const telefoniaMovel5G = plans.filter(plan => plan.type.toLowerCase().includes("telefonia móvel 5g"));

    return (
        <div className="w-full flex flex-col items-center justify-center px-4">
            {/* 🔹 Seção Banda Larga */}
            <h2 id="banda-larga" className="text-3xl font-bold mt-10 mb-6">Planos de Banda Larga</h2>
            {bandaLarga.map(plan => (
                <PlanCard key={plan._id} plan={plan} />
            ))}

            {/* 🔹 Seção Telefonia Fixa */}
            <h2 id="telefonia-fixa" className="text-3xl font-bold mt-10 mb-6">Planos de Telefonia Fixa</h2>
            {telefoniaFixa.map(plan => (
                <PlanCard key={plan._id} plan={plan} />
            ))}

            {/* 🔹 Seção Telefonia Móvel 4G */}
            <h2 id="telefonia-movel-4g" className="text-3xl font-bold mt-10 mb-6">Planos de Telefonia Móvel 4G</h2>
            {telefoniaMovel4G.map(plan => (
                <PlanCard key={plan._id} plan={plan} />
            ))}

            {/* 🔹 Seção Telefonia Móvel 5G */}
            <h2 id="telefonia-movel-5g" className="text-3xl font-bold mt-10 mb-6">Planos de Telefonia Móvel 5G</h2>
            {telefoniaMovel5G.map(plan => (
                <PlanCard key={plan._id} plan={plan} />
            ))}
        </div>
    );
};

// 🔹 Componente separado para cada plano
const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    return (
        <div className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 mb-10">
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

            {/* Imagem do plano */}
            <div className="w-80 h-80 rounded-lg overflow-hidden shadow-lg mt-6 md:mt-0">
                <img src={publicidade} alt="Plano" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default PlansList;
