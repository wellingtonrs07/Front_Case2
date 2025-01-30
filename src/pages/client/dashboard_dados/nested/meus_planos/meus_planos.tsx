import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'; // Importa o CircularProgress do Material-UI
import styled from 'styled-components';
import { getContractByIdRequest, getPlanByIdRequest, getServicesRequest } from './api/meus_planos';

// Tipos para os dados do contrato e plano
type Contract = {
    plan: string;  // ID do plano
    client: string;  // Nome do cliente
    used: number;  // Quantidade de dados usados
};

type Plan = {
    speed: number;  // Velocidade (total de dados do plano)
};

export const UserServicesPage: React.FC = () => {
    const [services, setServices] = useState<string[]>([]); // Estado para armazenar os IDs dos serviços
    const [contracts, setContracts] = useState<Contract[]>([]); // Estado para armazenar os contratos
    const [plans, setPlans] = useState<Plan[]>([]); // Estado para armazenar os planos
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro

        // Função para converter string "X GB" para número
    const convertToNumber = (value: string) => {
          return parseFloat(value.replace(' GB', '').trim()); // Remove " GB" e converte para número
      };
    // Função para buscar os IDs dos serviços
    const fetchServices = async () => {
        try {
            const data = await getServicesRequest<{ client_data: { services: string[] } }>();
            if (data?.client_data?.services) {
                setServices(data.client_data.services);
            } else {
                setError("Nenhum serviço encontrado.");
            }
        } catch (err) {
            setError('Erro ao carregar os serviços.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Função para buscar os contratos
    const fetchContracts = async () => {
        if (services.length === 0) {
            setError("Nenhum serviço para buscar contratos.");
            return;
        }

        try {
            setLoading(true);
            const contractDetailsPromises = services.map((serviceId) =>
                getContractByIdRequest<Contract>(serviceId)
            );
            const contractDetails = await Promise.all(contractDetailsPromises);
            setContracts(contractDetails);
        } catch (err) {
            setError('Erro ao carregar os contratos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Função para buscar os planos
    const fetchPlans = async () => {
        try {
            const planDetailsPromises = contracts.map((contract) =>
                getPlanByIdRequest<Plan>(contract.plan)
            );
            const planDetails = await Promise.all(planDetailsPromises);
            setPlans(planDetails);
        } catch (err) {
            setError('Erro ao carregar os planos.');
            console.error(err);
        }
    };

    // Chama as funções para buscar os dados
    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (services.length > 0) {
            fetchContracts();
        }
    }, [services]);

    useEffect(() => {
        if (contracts.length > 0) {
            fetchPlans();
        }
    }, [contracts]);

    if (loading) {
        return <p>Carregando dados...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
      <Container>
          {/* Primeira div */}
          <FirstDiv>
              <h1> Olá </h1>
          </FirstDiv>

          {/* Segunda div */}
          <SecondDiv>
              <h3>Segunda Div com Borda</h3>
          </SecondDiv>
      </Container>
  );
};

// Styled components

const Container = styled.div`
display: flex;
flex-direction: column; /* Faz com que as divs fiquem empilhadas */
padding: 2rem;
width: 100%; /* Garante que o Container ocupa toda a largura da tela */
`;

const FirstDiv = styled.div`
background-color: #e3f2fd; /* Azul claro de fundo */
width: 100%; /* Ocupa toda a largura disponível */
padding: 1rem;
border-radius: 8px;
border: 4px solid #2196f3; /* Borda azul */
margin-bottom: 1rem; /* Espaçamento entre as divs */
`;

const SecondDiv = styled.div`
background-color: #e8f5e9; /* Verde claro de fundo */
width: 100%; /* Ocupa toda a largura disponível */
padding: 1rem;
border-radius: 8px;
border: 4px solid #4caf50; /* Borda verde */
`;

export default UserServicesPage;
