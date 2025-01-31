import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import { getPlanByIdRequest, getContractRequest } from './api/ver_graficos';
import { format } from 'date-fns'; // Para formatar as datas de forma legível

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

interface Contract {
  client: string;
  plan: string;
  used: string;
  started_date: string; // Assumindo que a data vem como string ISO
}

interface Plan {
  _id: string;
  title: string;
  type: string;
  speed: string;
  details: string[];
  price: number;
  public: string;
}

// Corrigindo o styled-components para utilizar crase
const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
`;

export const PlanDistributionChart: React.FC = () => {
  const [clientContracts, setClientContracts] = useState<Contract[]>([]); // Lista de contratos
  const [plans, setPlans] = useState<Plan[]>([]); // Lista de planos carregados
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [revenueChartData, setRevenueChartData] = useState<any>(null); // Dados do gráfico de receita

  // Função para pegar todos os contratos
  const fetchContracts = async () => {
    try {
      const contracts = await getContractRequest<Contract[]>(); // Função para pegar todos os contratos
      setClientContracts(contracts); // Atualiza os contratos
    } catch (err) {
      setError('Erro ao carregar os contratos.');
      console.error(err);
    }
  };

  // Função para pegar os planos relacionados aos contratos
  useEffect(() => {
    fetchContracts();
  }, []);

  // Função para pegar os planos com base nos contratos
  useEffect(() => {
    if (clientContracts.length > 0) {
      const fetchPlans = async () => {
        try {
          const planDetailsPromises = clientContracts.map((contract) =>
            getPlanByIdRequest<Plan>(contract.plan) // Função já fornecida
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

  // Geração de dados para o gráfico de pizza
  useEffect(() => {
    if (plans.length > 0) {
      const planTypesCount: Record<string, number> = {};

      // Contabiliza os tipos de plano
      plans.forEach((plan) => {
        const planType = plan.type;

        if (planTypesCount[planType]) {
          planTypesCount[planType] += 1;
        } else {
          planTypesCount[planType] = 1;
        }
      });

      const chartData = {
        labels: Object.keys(planTypesCount),
        datasets: [
          {
            data: Object.values(planTypesCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverOffset: 4,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [plans]); // Atualiza o gráfico sempre que os planos mudam

  // Geração de dados para o gráfico de linha (Receita)
  useEffect(() => {
    if (plans.length > 0 && clientContracts.length > 0) {
      const revenueByDate: Record<string, number> = {};

      // Percorrer todos os contratos e acumular a receita por data
      clientContracts.forEach((contract) => {
        const plan = plans.find((p) => p._id === contract.plan);
        if (plan) {
          const date = new Date(contract.started_date);
          // Verificar se a data é válida
          if (!isNaN(date.getTime())) {
            const formattedDate = format(date, 'yyyy-MM-dd'); // Formata a data como yyyy-MM-dd
            const planPrice = plan.price;

            // Acumula a receita para cada data
            if (revenueByDate[formattedDate]) {
              revenueByDate[formattedDate] += planPrice;
            } else {
              revenueByDate[formattedDate] = planPrice;
            }
          }
        }
      });

      // Organiza as datas e valores para o gráfico
      const labels = Object.keys(revenueByDate).sort();
      const data = labels.map((date) => revenueByDate[date]);

      const revenueChartData = {
        labels: labels, // As datas
        datasets: [
          {
            label: 'Receita Total (R$)',
            data: data,
            fill: false,
            borderColor: '#4BC0C0',
            tension: 0.1,
          },
        ],
      };

      setRevenueChartData(revenueChartData);
    }
  }, [plans, clientContracts]); // Atualiza o gráfico sempre que os planos ou contratos mudam

  return (
    <ChartWrapper>
      {/* Gráfico de Distribuição de Planos */}
      <ChartContainer className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-4">Distribuição de Planos por Tipo</h2>
        {loading ? (
          <div className="text-center text-gray-500">Carregando dados...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : chartData ? (
          <div className="w-full" style={{ maxWidth: '350px', margin: '0 auto' }}> {/* Tamanho do gráfico de pizza ajustado */}
            <Doughnut data={chartData} />
          </div>
        ) : (
          <div className="text-center text-gray-500">Sem dados para exibir.</div>
        )}
      </ChartContainer>

      {/* Gráfico de Receita por Data */}
      <ChartContainer className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-4 mt-12">Receita por Data</h2>
        {loading ? (
          <div className="text-center text-gray-500">Carregando dados...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : revenueChartData ? (
          <Line data={revenueChartData} />
        ) : (
          <div className="text-center text-gray-500">Sem dados para exibir.</div>
        )}
      </ChartContainer>
    </ChartWrapper>
  );
};

export default PlanDistributionChart;


// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import styled from 'styled-components';
// import 'tailwindcss/tailwind.css';
// import { getPlanByIdRequest, getContractRequest } from './api/ver_graficos';

// ChartJS.register(ArcElement, Tooltip, Legend);

// interface Contract {
//   client: string;
//   plan: string;
//   used: string;
// }

// interface Plan {
//   title: string;
//   type: string; // Tipo do plano, como "Telefonia Fixa", "Banda Larga", etc.
//   speed: string;
//   details: string[];
//   price: number;
//   public: string;
// }

// // Corrigindo o styled-components para utilizar crase
// const ContractChartWrapper = styled.div`
//   width: 80%;
//   height: 400px;
//   margin: 0 auto;
// `;

// export const PlanDistributionChart: React.FC = () => {
//   const [clientContracts, setClientContracts] = useState<Contract[]>([]); // Lista de contratos
//   const [plans, setPlans] = useState<Plan[]>([]); // Lista de planos carregados
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [chartData, setChartData] = useState<any>(null);

//   // Função para pegar todos os contratos
//   const fetchContracts = async () => {
//     try {
//       const contracts = await getContractRequest<Contract[]>(); // Função para pegar todos os contratos
//       setClientContracts(contracts); // Atualiza os contratos
//     } catch (err) {
//       setError('Erro ao carregar os contratos.');
//       console.error(err);
//     }
//   };

//   // Função para pegar os planos relacionados aos contratos
//   useEffect(() => {
//     fetchContracts();
//   }, []);

//   // Função para pegar os planos com base nos contratos
//   useEffect(() => {
//     if (clientContracts.length > 0) {
//       const fetchPlans = async () => {
//         try {
//           const planDetailsPromises = clientContracts.map((contract) =>
//             getPlanByIdRequest<Plan>(contract.plan) // Função já fornecida
//           );
//           const planDetails = await Promise.all(planDetailsPromises);
//           setPlans(planDetails); // Atualizando os planos
//           setLoading(false); // Definindo loading como falso após carregar os planos
//         } catch (err) {
//           setError('Erro ao carregar os planos.');
//           console.error(err);
//           setLoading(false); // Caso haja erro, definimos loading como false
//         }
//       };
//       fetchPlans();
//     }
//   }, [clientContracts]); // Chama essa função quando os contratos mudam, mas evita loop infinito

//   // Geração de dados para o gráfico de pizza
//   useEffect(() => {
//     if (plans.length > 0) {
//       const planTypesCount: Record<string, number> = {};

//       // Contabiliza os tipos de plano
//       plans.forEach((plan) => {
//         const planType = plan.type;

//         if (planTypesCount[planType]) {
//           planTypesCount[planType] += 1;
//         } else {
//           planTypesCount[planType] = 1;
//         }
//       });

//       const chartData = {
//         labels: Object.keys(planTypesCount),
//         datasets: [
//           {
//             data: Object.values(planTypesCount),
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//             hoverOffset: 4,
//           },
//         ],
//       };

//       setChartData(chartData);
//     }
//   }, [plans]); // Atualiza o gráfico sempre que os planos mudam

//   return (
//     <ContractChartWrapper className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-center text-xl font-bold mb-4">Distribuição de Planos por Tipo</h2>
//       {loading ? (
//         <div className="text-center text-gray-500">Carregando dados...</div>
//       ) : error ? (
//         <div className="text-center text-red-500">{error}</div>
//       ) : chartData ? (
//         <Doughnut data={chartData} />
//       ) : (
//         <div className="text-center text-gray-500">Sem dados para exibir.</div>
//       )}
//     </ContractChartWrapper>
//   );
// };

// export default PlanDistributionChart;
