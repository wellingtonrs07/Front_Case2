import React, { useEffect, useState } from 'react';
import { getPlansRequest, deleteRequest, postRequest } from '@/pages/director/dashboard/nested/planos/api/planos'; // Função para buscar planos
import styled from 'styled-components'; // Importando o styled-components
import toast, { Toaster } from 'react-hot-toast'; // Importando o react-hot-toast

// Definindo o tipo para os dados do plano
type Plan = {
    _id: string;
    type: string;
    speed: string;
    details: string[];
    price: number;
    public: string;
};

export const DirPlansList: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const route = '/client/get-plan';
                const data: Plan[] = await getPlansRequest<Plan[]>(route);
                const formattedPlans = data.map(plan => ({
                    ...plan,
                    id: plan._id,
                    public: plan.public,
                }));
                setPlans(formattedPlans);
            } catch (err) {
                setError('Failed to load plans.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleDelete = async (planId: string) => {
        try {
            // Envia a requisição DELETE para a API
            await deleteRequest<{}>(`/director/delete-plan/${planId}`);

            // Atualiza o estado para remover o plano localmente após a exclusão
            setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));

            // Exibe o toast de confirmação
            toast.success('Plano deletado com sucesso!', {
                position: 'top-right',
                duration: 4000,
                style: {
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });
        } catch (err) {
            setError('Erro ao excluir o plano');
            toast.error('Erro ao excluir o plano!', {
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

    const handleCreateNewPlan = () => {
        // Lógica para criar um novo plano, como redirecionar para outra página ou abrir um modal
        // Exibe um toast de confirmação
        toast.success('Criar novo plano', {
            position: 'top-right',
            duration: 4000,
            style: {
                backgroundColor: '#2196F3',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Title>Nossos Planos</Title>
            <PlansList>
                {plans.map((plan) => (
                    <PlanCard key={plan._id}>
                        <PlanContent>
                            <PlanTitle>{plan.type}</PlanTitle>
                            <PlanSpeed>Velocidade: {plan.speed}</PlanSpeed>
                            <PlanDetails>
                                <h3>Detalhes:</h3>
                                <ul>
                                    {plan.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </PlanDetails>
                            <PlanPrice>R$ {plan.price.toFixed(2)}/mês</PlanPrice>
                            <PlanPublic>{plan.public}</PlanPublic>
                        </PlanContent>
                        <DeleteButton onClick={() => handleDelete(plan._id)}>
                            Deletar
                        </DeleteButton>
                    </PlanCard>
                ))}
            </PlansList>

            {/* Botão Criar Novo Plano */}
            <CreateNewButton onClick={handleCreateNewPlan}>
                Criar Novo Plano
            </CreateNewButton>

            <Toaster /> {/* Exibe o ToastContainer para as mensagens de toast */}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 2rem;
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
`;

const PlanCard = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PlanContent = styled.div`
    flex: 1;
`;

const PlanTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const PlanSpeed = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const PlanDetails = styled.div`
    margin-bottom: 1rem;
`;

const PlanPrice = styled.p`
    font-size: 1.5rem;
    color: #4CAF50;
    margin-bottom: 1rem;
`;

const PlanPublic = styled.p`
    font-size: 0.875rem;
    color: #555;
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

const CreateNewButton = styled.button`
    display: block;
    margin: 2rem auto 0;
    background-color: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        background-color: #388e3c;
    }
`;

export default DirPlansList;
