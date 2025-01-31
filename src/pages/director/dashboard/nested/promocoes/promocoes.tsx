import React, { useState, useEffect } from 'react';
import { getPromotionsRequest, getPlanByIdRequest, deletePromotionsRequest, postPromotionsRequest } from './api/promocoes'; // Funções para buscar promoções, planos e criar promoções
import styled from 'styled-components'; // Importando o styled-components
import toast from 'react-hot-toast'; // Importando o react-hot-toast

// Definindo o tipo para os dados da promoção
type Promotion = {
    _id: string;
    description: string;
    plan: string[]; // Lista de planos associados à promoção
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

export const DirPromotionsList: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [plans, setPlans] = useState<{ [key: string]: Plan[] }>({});  // Tipo do estado ajustado
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Função para buscar as promoções
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const route = '/client/get-promotion'; // Ajuste a rota conforme sua API
                const data: Promotion[] = await getPromotionsRequest<Promotion[]>(route);
                setPromotions(data); // Atualiza a lista de promoções

                // Busca os planos relacionados a cada promoção
                const plansData = await Promise.all(
                    data.map(async (promotion) => {
                        const planDetails = await Promise.all(
                            promotion.plan.map((planId) => getPlanByIdRequest<Plan>(planId))  // Para cada plano da promoção, busca as informações detalhadas
                        );
                        return { promotionId: promotion._id, plans: planDetails };
                    })
                );
                // Atualiza os planos com as informações completas
                const allPlans = plansData.reduce((acc, { promotionId, plans }) => {
                    acc[promotionId] = plans;
                    return acc;
                }, {} as { [key: string]: Plan[] });  // Garantindo que o tipo seja correto
                setPlans(allPlans);  // Armazena os planos detalhados no estado
            } catch (err) {
                setError('Failed to load promotions.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []); // Executa uma vez ao montar o componente

    // Função para criar uma nova promoção
    const handleCreatePromotion = async (newPromotion: Promotion) => {
        try {
            // Envia a requisição para criar a promoção
            const createdPromotion = await postPromotionsRequest<Promotion>('/director/create-promotion', 'POST', newPromotion);

            // Atualiza a lista de promoções com a nova promoção
            setPromotions((prevPromotions) => [...prevPromotions, createdPromotion]);

            toast.success('Promoção criada com sucesso!', {
                position: 'top-right',
                duration: 4000,
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    fontWeight: 'bold',
                },
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

    // Função para deletar a promoção
    const handleDelete = async (promotionId: string) => {
        try {
            await deletePromotionsRequest<{}>(`/director/delete-promotion/${promotionId}`);
            setPromotions((prevPromotions) => prevPromotions.filter((promotion) => promotion._id !== promotionId));
            toast.success('Promoção deletada com sucesso!', {
                position: 'top-right',
                duration: 4000,
                style: {
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        } catch (err) {
            setError('Erro ao excluir a promoção');
            toast.error('Erro ao excluir a promoção!', {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Title>Nossas Promoções</Title>
            <PlansList>
                {promotions.map((promotion) => (
                    <PromotionCard key={promotion._id}>
                        <PromotionContent>
                            <PromotionTitle>{promotion.description}</PromotionTitle>
                            <PromotionPlans>
                                <h3>Planos:</h3>
                                {plans[promotion._id] && plans[promotion._id].length > 0 ? (
                                    <ul>
                                        {plans[promotion._id].map((plan, index) => (
                                            <li key={index}>
                                               <strong>{plan.type}</strong> - {plan.speed} - Preço: R${plan.price || 0}  {/* Protegendo contra valores undefined */}
                                            </li> // Exibindo as informações completas de cada plano
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Sem planos associados.</p>
                                )}
                            </PromotionPlans>
                            <PromotionPrice>Preço: R$ {promotion.price || 0}</PromotionPrice>  {/* Protegendo contra valores undefined */}
                            <PromotionDiscount>Desconto: {promotion.discount}</PromotionDiscount>
                        </PromotionContent>
                        <DeleteButton onClick={() => handleDelete(promotion._id)}>
                            Deletar
                        </DeleteButton>
                    </PromotionCard>
                ))}
            </PlansList>

            {/* Formulário para criar uma nova promoção */}
            <CreatePromotionForm onCreate={handleCreatePromotion} />
        </Container>
    );
};

// Componente para o formulário de criação de promoções
const CreatePromotionForm = ({ onCreate }: { onCreate: (promotion: Promotion) => void }) => {
    const [newPromotion, setNewPromotion] = useState<Promotion>({
        _id: '',
        description: '',
        plan: [],
        price: 0.0,
        discount: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(newPromotion);
        // Não fecha o formulário após o envio
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Criar Nova Promoção</h2>
            <InputField
                type="text"
                placeholder="Descrição"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
            />
            <InputField
                type="number"
                placeholder="Preço"
                value={newPromotion.price}
                onChange={(e) => setNewPromotion({ ...newPromotion, price: parseFloat(e.target.value) })}
            />
            <InputField
                type="text"
                placeholder="Desconto"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
            />
            {/* Adicione um componente de seleção de planos conforme necessário */}
            <button type="submit">Criar Promoção</button>
        </Form>
    );
};

// Styled Components
const Container = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
`;

const PlansList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
`;

const PromotionCard = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PromotionContent = styled.div`
    flex: 1;
`;

const PromotionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const PromotionPlans = styled.div`
    margin-bottom: 1rem;
`;

const PromotionPrice = styled.p`
    font-size: 1.5rem;
    color: #4CAF50;
    margin-bottom: 1rem;
`;

const PromotionDiscount = styled.p`
    font-size: 1rem;
    color: #888;
`;

const DeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d32f2f;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
`;

const InputField = styled.input`
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
    width: 100%;
`;

export default DirPromotionsList;
