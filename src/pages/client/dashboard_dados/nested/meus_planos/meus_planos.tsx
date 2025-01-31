import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { getContractByIdRequest, getPlanByIdRequest, getServicesRequest, getClientData, getClientContractsByIdRequest } from './api/meus_planos';

// Tipos para os dados do contrato e plano
type Contract = {
    plan: string;
    client: string;
    start_date: string;
    used: string;
};

type Plan = {
    title: string;
    type: string;
    speed: string;
};

// Função para remover o "GB" de valores em GB e convertê-los para número
const removeGB = (value: string) => {
    return parseFloat(value.replace(/GB/i, '').trim());
};

// Função para calcular a data de renovação
const getRenewalDate = (startDate: string): string => {
    const renewalDate = new Date(startDate);
    renewalDate.setMonth(renewalDate.getMonth() + 1); // Aumenta 1 mês para simular renovação mensal
    return renewalDate.toLocaleDateString('pt-BR'); // Formato brasileiro de data (dd/mm/yyyy)
};

export const UserServicesPage: React.FC = () => {
    const [clientId, setClientId] = useState<string | null>(null); // Para armazenar o ID do cliente
    const [clientContracts, setClientContracts] = useState<Contract[]>([]); // Para armazenar os contratos do cliente
    const [plans, setPlans] = useState<Plan[]>([]); // Para armazenar os planos
    const [loading, setLoading] = useState<boolean>(true); // Para controlar o estado de carregamento
    const [error, setError] = useState<string | null>(null); // Para armazenar possíveis erros

    // Obtendo os dados do cliente
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const data = await getClientData(); // Chamando a função getClientData para obter o id do cliente e o cart
                console.log(data.client_id)
                if (data.client_id) {
                    setClientId(data.client_id); // Armazenando o id do cliente
                } else {
                    setError('Cliente não encontrado.');
                    setLoading(false);
                }
            } catch (err) {
                setError('Erro ao carregar os dados do cliente.');
                console.error(err);
                setLoading(false);
            }
        };

        fetchClientData();
    }, []); // Chama essa função apenas uma vez ao carregar o componente

    // Obtendo os contratos do cliente com o id
    useEffect(() => {
        if (clientId) {
            const fetchContracts = async () => {
                try {
                    const contractsData = await getClientContractsByIdRequest<any[]>(clientId); // Buscando contratos com o client_id
                    setClientContracts(contractsData); // Atualizando os contratos do cliente
                    console.log(contractsData)
                } catch (err) {
                    setError('Erro ao carregar os contratos.');
                    console.error(err);
                }
            };

            fetchContracts();
        }
    }, [clientId]); // Chama essa função toda vez que o clientId mudar

    // Obtendo os planos baseados nos contratos, mas somente uma vez após os contratos estarem carregados
    useEffect(() => {
        if (clientContracts.length > 0) {
            const fetchPlans = async () => {
                try {
                    console.log(clientContracts)
                    const planDetailsPromises = clientContracts.map((contract) =>
                        getPlanByIdRequest<Plan>(contract.plan)
                    );
                    const planDetails = await Promise.all(planDetailsPromises);
                    setPlans(planDetails); // Atualizando os planos
                    setLoading(false); // Definindo loading como falso após carregar os planos
                } catch (err) {
                    setError('Erro ao carregar os planos.');
                    console.error(err);
                    setLoading(false); // Caso haja erro, definimos loading como false
                }
            };
            fetchPlans();
        }
    }, [clientContracts]); // Chama essa função quando os contratos mudam, mas evita loop infinito

    // Exibição de carregamento ou erro
    if (loading) return <p className="text-center text-lg text-gray-700">Carregando dados...</p>;
    if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

    return (
        <div className="p-6 sm:p-10 max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-center text-3xl sm:text-4xl font-medium text-blue-600 mb-6">Meus Serviços</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
                <button className="border border-gray-700 px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-gray-100 transition">
                    Central de Faturas
                </button>
                <button className="border border-gray-700 px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-gray-100 transition">
                    Fazer Recarga
                </button>
                <button className="border border-gray-700 px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-gray-100 transition">
                    Melhorar Meu Plano
                </button>
            </div>
            <hr className="border-gray-300 mb-8 w-full" />
            {clientContracts.length > 0 ? (
                <ul className="space-y-8 w-full flex flex-col items-center">
                    {clientContracts.map((contract, index) => {
                        if (!plans[index]) {
                            return <p key={index} className="text-center text-gray-700 text-lg sm:text-xl">Plano ou contrato não encontrados.</p>;
                        }

                        const usedGB = removeGB(contract.used);
                        const totalGB = removeGB(plans[index].speed);
                        const usedPercentage = (usedGB / totalGB) * 100; // Percentual de uso
                        const remainingPercentage = 100 - usedPercentage; // Percentual restante
                        const disp = totalGB - usedGB;
                        const renewalDate = getRenewalDate(contract.start_date); // Calculando a data de renovação

                        return (
                            <li key={index} className="bg-gray-100 shadow-md rounded-xl p-8 sm:p-12 border border-gray-300 flex flex-col items-center w-full max-w-5xl">
                                <div className="flex flex-col sm:flex-row items-center sm:space-x-16 text-center sm:text-left">
                                    <div className="relative flex items-center justify-center w-56 sm:w-80 h-56 sm:h-80">
                                        <CircularProgress
                                            variant="determinate"
                                            value={100}
                                            size={220}
                                            thickness={6}
                                            sx={{ color: '#BBDEFB' }}
                                        />
                                        <CircularProgress
                                            variant="determinate"
                                            value={usedPercentage} // Percentual de uso no gráfico
                                            size={220}
                                            thickness={6}
                                            sx={{ position: 'absolute', color: '#1E88E5' }}
                                        />
                                        <div className="absolute text-blue-700 text-center text-lg sm:text-xl font-medium">
                                            <p className="text-sm sm:text-lg">Consumiu:</p>
                                            <h1 className="text-xl sm:text-2xl font-semibold">{usedGB} GB</h1>
                                            <p className="text-sm sm:text-lg"> de {totalGB} GB</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-lg sm:text-xl space-y-2 sm:space-y-4 mt-4 sm:mt-0">
                                        <h3 className="text-xl sm:text-3xl font-medium text-blue-700">{plans[index].type}</h3>
                                        <p className="text-lg sm:text-xl">Meu consumo: <span className="font-semibold">{usedGB} GB</span></p>
                                        <p className="text-lg sm:text-xl">Disponível: <span className="font-semibold">{disp} GB</span></p>
                                        <p className="text-md text-gray-500 mt-2">Renova em: <span className="font-semibold">{renewalDate}</span></p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-center text-gray-700 text-lg sm:text-xl">Nenhum serviço encontrado.</p>
            )}
        </div>
    );
};

export default UserServicesPage;
