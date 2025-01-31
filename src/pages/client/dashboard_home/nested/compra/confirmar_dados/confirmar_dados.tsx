import React, { useState, useEffect } from 'react';
import { getClientData, postContract } from './api/confirmar_dados'; 
import { getPlanByIdRequest } from '../../planos/api/planos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definição do tipo para os dados do plano
type Plan = {
  type: string;
  speed: string;
  detail: string[];
  price: number;
  public: string;
  product: string[];
};

export const ConfirmCompra = () => {
  const [cartPlans, setCartPlans] = useState<Plan[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData();
        const cartData = data.cart || [];

        if (cartData.length > 0) {
          const plansData = await Promise.all(
            cartData.map(async (planId: string) => await getPlanByIdRequest(planId))
          );
          setCartPlans(plansData);
        }

        setClientId(data.client_id || null);
      } catch (err) {
        console.error('Erro ao carregar os dados do cliente', err);
      }
    };
    fetchData();
  }, []);

  const getFormattedDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleConfirm = async () => {
    const startDate = getFormattedDate();

    if (!clientId) {
      setError('Não foi possível obter o ID do cliente.');
      toast.error('Erro ao obter o ID do cliente!');
      return;
    }

    const contractData = {
      plan: cartPlans[0]?.type,
      start_date: startDate,
      client: clientId,
    };

    try {
      await postContract(contractData);
      toast.success('Contrato criado com sucesso!');
    } catch (err) {
      setError('Erro ao criar o contrato');
      console.error(err);
      toast.error('Erro ao criar o contrato!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-300 p-10">
        
        {/* 🔹 Seção de Dados do Cartão */}
        <div className="w-full lg:w-3/5 px-8 py-6 border-b lg:border-b-0 lg:border-r border-gray-300">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Dados do Cartão
          </h1>
          <div className="space-y-5">
            {[
              { label: 'Número do Cartão', value: '1234 5678 9012 3456' },
              { label: 'Nome do Titular', value: 'João Silva' },
              { label: 'Data de Validade', value: '12/25' },
              { label: 'CVV', value: '123' }
            ].map((item, index) => (
              <div key={index}>
                <label className="block text-gray-700 font-medium text-sm">{item.label}</label>
                <input
                  type="text"
                  value={item.value}
                  className="w-full px-4 py-3 border rounded-md mt-1 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Seção de Planos no Carrinho */}
        <div className="w-full lg:w-2/5 px-8 py-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Planos no Carrinho
            </h1>
            {cartPlans.length > 0 ? (
              cartPlans.map((plan, index) => (
                <div key={index} className="mb-6 p-6 border rounded-xl bg-gray-50 shadow-md">
                  <h2 className="text-lg font-bold text-gray-900">{plan.type}</h2>
                  <div className="mt-3 space-y-3 text-sm">
                    <p className="text-gray-700 flex justify-between">
                      <span className="font-medium">Velocidade:</span> 
                      <span>{plan.speed}</span>
                    </p>
                    <p className="text-gray-700 flex justify-between">
                      <span className="font-medium">Preço:</span> 
                      <span>R$ {plan.price.toFixed(2)}</span>
                    </p>
                    <p className="text-gray-600 flex justify-between">
                      <span className="font-medium">Detalhes:</span> 
                      <span>{plan.detail?.join(', ') || 'N/A'}</span>
                    </p>
                    <p className="text-gray-600 flex justify-between">
                      <span className="font-medium">Produtos:</span> 
                      <span>{plan.product?.join(', ') || 'N/A'}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum plano no carrinho.</p>
            )}
          </div>

          {/* 🔹 Botão de Compra dentro do Container */}
          <button
            onClick={handleConfirm}
            className="w-full mt-4 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Confirmar Compra
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmCompra;
