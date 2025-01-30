import React, { useState, useEffect } from 'react';
import { getClientData, updateClientContract } from './api/confirmar_dados'; // Função para buscar e atualizar dados do cliente
import { getPlanByIdRequest } from '../../planos/api/planos'; // Função para buscar planos pelo ID
import { postContract } from './api/confirmar_dados'; // Função para enviar o contrato
import { toast, ToastContainer } from 'react-toastify'; // Importando o toast e ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importando os estilos do toast


// Definindo o tipo para os dados do plano
type Plan = {
  type: string;
  speed: string;
  detail: string[];
  price: number;
  public: string;
  product: string[];
};

export const ConfirmCompra = () => {
  // Estado para armazenar os planos detalhados
  const [cartPlans, setCartPlans] = useState<Plan[]>([]); // Estado para armazenar os planos detalhados
  const [error, setError] = useState('');

  // Aqui, obtemos os dados do cliente ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Obtém os dados do cliente, agora com cart contendo IDs dos planos
            const data = await getClientData();
            const cartData = data.cart || []; // Acessa diretamente o cart do cliente

            if (cartData.length > 0) {
                // Para cada id no cart, busque os dados do plano correspondente
                const plansData = await Promise.all(
                    cartData.map(async (planId: string) => {
                        const plan = await getPlanByIdRequest(planId); // Busca os dados do plano
                        return plan;
                    })
                );

                // Atualiza o estado com as informações dos planos detalhados
                setCartPlans(plansData); // Atualiza o estado com os dados dos planos
            } else {
                console.log("Carrinho vazio.");
            }
        } catch (err) {
            console.error('Erro ao carregar os dados do cliente', err);
        }
    };

    fetchData();
}, []); // Recarrega apenas uma vez quando o componente é montado


  // Função para gerar a data no formato "YYYY-MM-DD"
  const getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adiciona o zero à esquerda se o mês for de 1 a 9
    const day = String(today.getDate()).padStart(2, '0'); // Adiciona o zero à esquerda se o dia for de 1 a 9
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = async () => {
    const startDate = getFormattedDate(); // Obtém a data no formato correto
  
    const contractData = {
      plan: cartPlans[0]?.type, // Passa o ID do plano selecionado
      start_date: startDate, // Data de início formatada
    };
  
    let newContract;
  
    // Primeiro try-catch: Criação do contrato
    try {
      // Envia os dados para criar o contrato
      newContract = await postContract(contractData);
      console.log('Contrato criado:', newContract);
      // Exibe a notificação de sucesso usando o toast
      toast.success('Contrato criado com sucesso!');
    } catch (err) {
      setError('Erro ao criar o contrato');
      console.error(err);
      toast.error('Erro ao criar o contrato!');
      return; // Interrompe a execução se houver erro na criação do contrato
    }
  };

  return (
    <div className="w-full flex h-screen justify-between a border-4 border-blue-300">
      {/* Formulário para dados de cartão */}
      <div className='w-2/3 border-4 border-blue-300'>
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg mr-4 border-4 border-blue-300">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Dados do Cartão</h1>

          <div className="grid grid-cols-1 gap-4">
            {/* Campo Número do Cartão */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Número do Cartão</label>
              <input
                type="text"
                value="1234 5678 9012 3456" // Exemplo de valor
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
                readOnly
              />
            </div>

            {/* Campo Nome do Titular */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Nome do Titular</label>
              <input
                type="text"
                value="João Silva" // Exemplo de valor
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
                readOnly
              />
            </div>

            {/* Campo Data de Validade */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Data de Validade</label>
              <input
                type="text"
                value="12/25" // Exemplo de valor
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
                readOnly
              />
            </div>

            {/* Campo CVV */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm">CVV</label>
              <input
                type="text"
                value="123" // Exemplo de valor
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
                readOnly
              />
            </div>
          </div>

          {/* Botão de confirmação */}
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Confirmar Compra
          </button>
        </div>
      </div>

      {/* Div para planos */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg border-5 border-blue-300 h-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Planos no Carrinho</h1>
        {cartPlans.length > 0 ? (
          cartPlans.map((plan: Plan, index: number) => (
            <div key={index} className="mb-4 p-4 border-2 border-gray-300 rounded-md">
              <p><strong>Tipo:</strong> {plan.type}</p>
              <p><strong>Velocidade:</strong> {plan.speed}</p>
              <p><strong>Preço:</strong> R$ {plan.price}</p>
              <p><strong>Detalhes:</strong> {Array.isArray(plan.detail) ? plan.detail.join(', ') : 'N/A'}</p>
              <p><strong>Produtos:</strong> {Array.isArray(plan.product) ? plan.product.join(', ') : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>Nenhum plano no carrinho.</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ConfirmCompra;
