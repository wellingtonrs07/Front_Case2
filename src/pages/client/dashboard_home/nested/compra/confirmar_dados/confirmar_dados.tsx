import React, { useState, useEffect } from 'react';
import { getClientData, updateClientContract, postContract } from './api/confirmar_dados';
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
    const contractData = {
      plan: cartPlans[0]?.type,
      start_date: startDate,
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
    <div className="flex justify-center items-center min-h-screen px-4 py-6 md:px-10 lg:px-20 bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-10">
        {/* Seção de Dados do Cartão */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">Dados do Cartão</h1>
          <div className="space-y-4">
            {[{ label: 'Número do Cartão', value: '1234 5678 9012 3456' },
              { label: 'Nome do Titular', value: 'João Silva' },
              { label: 'Data de Validade', value: '12/25' },
              { label: 'CVV', value: '123' }].map((item, index) => (
              <div key={index}>
                <label className="block text-gray-700 text-base">{item.label}</label>
                <input
                  type="text"
                  value={item.value}
                  className="w-full px-4 py-2 border rounded-md mt-1 text-lg bg-gray-100"
                  readOnly
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleConfirm}
            className="w-full py-3 mt-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Confirmar Compra
          </button>
        </div>

        {/* Seção de Planos no Carrinho */}
        <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg mt-6 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">Planos no Carrinho</h1>
          {cartPlans.length > 0 ? (
            cartPlans.map((plan, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md bg-gray-100">
                <p className="text-lg font-medium">{plan.type}</p>
                <p className="text-sm text-gray-600">Velocidade: {plan.speed}</p>
                <p className="text-sm text-gray-600">Preço: R$ {plan.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Detalhes: {plan.detail?.join(', ') || 'N/A'}</p>
                <p className="text-sm text-gray-600">Produtos: {plan.product?.join(', ') || 'N/A'}</p>
              </div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-600">Nenhum plano no carrinho.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmCompra;
