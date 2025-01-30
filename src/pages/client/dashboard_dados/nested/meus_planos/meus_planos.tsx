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
        <div className="flex justify-center items-center p-8">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-center text-2xl font-semibold mb-6 text-blue-600">Meus Serviços</h2>
                {services.length > 0 ? (
                    <ul>
                        {services.map((serviceId, index) => (
                            <li key={index} className="mb-6">
                                <div className="text-center">
                                    {contracts[index] ? (
                                        <div>

                                            {/* Exibindo gráfico de consumo */}
                                            {plans[index] ? (
                                               <div className="relative flex items-center">
                                               {/* Circulo de fundo (total) com azul claro */}
                                               <CircularProgress
                                                   variant="determinate"
                                                   value={100} // O valor 100 significa que o círculo está completo
                                                   size={100}
                                                   thickness={4}
                                                   sx={{
                                                       color: '#B3E5FC', // Azul claro para o fundo (parte não preenchida)
                                                   }}
                                               />
                                               {/* Circulo para mostrar o consumo com azul */}
                                               <CircularProgress
                                                   variant="determinate"
                                                   value={(convertToNumber(contracts[index].used) / convertToNumber(plans[index].speed)) * 100}
                                                   size={100}
                                                   thickness={4}
                                                   className="absolute"
                                                   sx={{
                                                       color: '#1976D2', // Azul para a parte usada
                                                   }}
                                               />
                                               <div className="ml-4">
                                                   <p><strong>Consumido:</strong> {contracts[index].used} GB</p>
                                                   <p><strong>Disponível:</strong> {convertToNumber(plans[index].speed) - convertToNumber(contracts[index].used)} GB</p>
                                               </div>
                                           </div>
                                            ) : (
                                                <p>Plano não encontrado para este contrato.</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p>Contrato não encontrado para este serviço.</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum serviço encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default UserServicesPage;
