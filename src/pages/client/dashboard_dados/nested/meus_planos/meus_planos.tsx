import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { getContractByIdRequest, getPlanByIdRequest, getServicesRequest } from './api/meus_planos';

// Tipos para os dados do contrato e plano
type Contract = {
    plan: string;
    used: string;
};

type Plan = {
    type: string;
    speed: string;
};

const removeGB = (value: string) => {
    return parseFloat(value.replace(/GB/i, '').trim());
};

export const UserServicesPage: React.FC = () => {
    const [services, setServices] = useState<string[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
        fetchServices();
    }, []);

    useEffect(() => {
        if (services.length > 0) {
            const fetchContracts = async () => {
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
            fetchContracts();
        }
    }, [services]);

    useEffect(() => {
        if (contracts.length > 0) {
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
            fetchPlans();
        }
    }, [contracts]);

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
            {services.length > 0 ? (
                <ul className="space-y-8 w-full flex flex-col items-center">
                    {services.map((serviceId, index) => {
                        if (!contracts[index] || !plans[index]) {
                            return <p key={index} className="text-center text-gray-700 text-lg sm:text-xl">Plano ou contrato não encontrados.</p>;
                        }

                        const usedGB = removeGB(contracts[index].used);
                        const totalGB = removeGB(plans[index].speed);
                        const usedPercentage = Math.round((usedGB / totalGB) * 100);
                        const remainingPercentage = 100 - usedPercentage;

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
                                            value={usedPercentage}
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
                                        <p className="text-lg sm:text-xl">Disponível: <span className="font-semibold">{remainingPercentage} GB</span></p>
                                        <p className="text-md text-gray-500 mt-2">Renova 20/01</p>
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
