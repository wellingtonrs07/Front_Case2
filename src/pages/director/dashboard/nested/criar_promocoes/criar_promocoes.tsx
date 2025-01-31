import React, { useState, useEffect } from 'react';
import { postPromotionsRequest, getPlansRequest } from './api/criar_promocoes'; // Função para criar promoções e pegar planos
import toast from 'react-hot-toast'; // Importando o react-hot-toast
import styled from 'styled-components';

// Definindo o tipo para os dados da promoção
type Promotion = {
    _id: string;
    description: string;
    plan: string[]; // Lista de IDs dos planos associados à promoção
    price: number;
    discount: string;
};

// Definindo o tipo para os dados do plano
type Plan = {
    _id: string;
    type: string;
    speed: string;
    price: number;
};

export const DirPromotionsCreate: React.FC = () => {
    const [newPromotion, setNewPromotion] = useState<Promotion>({
        _id: '',
        description: '',
        plan: [],
        price: 0.0,
        discount: ''
    });
    const [plans, setPlans] = useState<Plan[]>([]); // Lista de planos disponíveis
    const [loadingPlans, setLoadingPlans] = useState<boolean>(true); // Estado de carregamento dos planos
    const [error, setError] = useState<string | null>(null); // Estado de erro

    // Função para buscar os planos
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const route = '/client/get-plan'; // Ajuste a rota conforme sua API
                const data = await getPlansRequest<Plan[]>(route);
                setPlans(data); // Atualiza a lista de planos
            } catch (err) {
                setError('Erro ao carregar os planos');
                console.error(err);
            } finally {
                setLoadingPlans(false);
            }
        };

        fetchPlans();
    }, []); // Executa uma vez ao montar o componente

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Envia a requisição para criar a promoção
            const createdPromotion = await postPromotionsRequest<Promotion>('/director/create-promotion', 'POST', newPromotion);

            toast.success('Promoção criada com sucesso!', {
                position: 'top-right',
                duration: 4000,
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            // Limpa o formulário após a criação
            setNewPromotion({
                _id: '',
                description: '',
                plan: [],
                price: 0.0,
                discount: ''
            });

        } catch (err) {
            toast.error('Erro ao criar a promoção!', {
                position: 'top-right',
                duration: 4000,
                style: {
                    backgroundColor: '#f44336',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        }
    };

    // Função para manipular a seleção de planos
    const handlePlanChange = (planId: string) => {
        setNewPromotion((prevPromotion) => {
            const newPlans = prevPromotion.plan.includes(planId)
                ? prevPromotion.plan.filter((id) => id !== planId)
                : [...prevPromotion.plan, planId];
            return { ...prevPromotion, plan: newPlans };
        });
    };

    if (loadingPlans) return <p>Carregando planos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Criar Nova Promoção</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Descrição da promoção"
                        value={newPromotion.description}
                        onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Preço da promoção"
                        value={newPromotion.price}
                        onChange={(e) => setNewPromotion({ ...newPromotion, price: parseFloat(e.target.value) })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Desconto</label>
                    <input
                        type="text"
                        id="discount"
                        placeholder="Desconto da promoção"
                        value={newPromotion.discount}
                        onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-700">Selecione os planos:</h3>
                    {plans.map((plan) => (
                        <div key={plan._id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={plan._id}
                                checked={newPromotion.plan.includes(plan._id)}
                                onChange={() => handlePlanChange(plan._id)}
                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor={plan._id} className="text-sm text-gray-600">
                                {plan.type} - {plan.speed} - R$ {plan.price.toFixed(2)}
                            </label>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Criar Promoção
                </button>
            </form>
        </div>
    );
};

// Styled Components (for consistency)
const InputField = styled.input`
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
    width: 100%;
`;

export default DirPromotionsCreate;
