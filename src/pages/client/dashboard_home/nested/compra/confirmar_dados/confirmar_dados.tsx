import React, { useState, useEffect } from 'react';
import { getClientData } from './api/confirmar_dados'; // Função para buscar dados do cliente
import { getPlanByIdRequest } from '../../planos/api/planos'; // Função para buscar planos pelo ID

// Definindo o tipo para os dados do plano
type Plan = {
  type: string;
  speed: string;
  detail: string[];
  price: number;
  public: string;
  product: string[];
};

export const EditClientAddress = () => {
  // Tipando o estado formData corretamente
  const [formData, setFormData] = useState({
    phone: '',
    city: '',
    cep: '',
    street_number: '',
    cart: [] as string[], // Inicialmente, cart é uma lista de IDs de planos (strings)
  });
  const [cartPlans, setCartPlans] = useState<Plan[]>([]); // Estado para armazenar os planos detalhados
  const [error, setError] = useState('');

  // Aqui, obtemos os dados do cliente ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData(); // Agora a função retorna os dados do cliente
        const cartData = data.client_data.cart || []; // Verifica se cart é uma lista válida

        // Para cada id no cart, busque os dados do plano correspondente
        const plansData = await Promise.all(
          cartData.map(async (planId: string) => {
            // Agora estamos buscando o plano por ID
            const plan = await getPlanByIdRequest(planId);
            return plan;
          })
        );

        // Atualiza o estado com as informações dos planos detalhados
        setFormData({
          phone: data.client_data.phone,
          city: data.client_data.city,
          cep: data.client_data.cep,
          street_number: data.client_data.street_number,
          cart: cartData, // Atualiza com os IDs dos planos
        });

        setCartPlans(plansData); // Atualiza com os planos detalhados
      } catch (err) {
        setError('Erro ao carregar os dados do cliente');
      }
    };

    fetchData();
  }, []); // Recarrega apenas uma vez quando o componente é montado

  return (
    <div className="w-full flex h-screen justify-between border-4 border-blue-300">
  {/* Div para dados do cliente */}
  <div className='w-2/3 border-4 border-blue-300'>
  <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg mr-4 border-4 border-blue-300">
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Dados de Endereço</h1>

    {/* Mensagem de erro */}
    {error && (
      <div className="mb-4 p-4 bg-red-500 text-white rounded-lg text-center">
        <p>{error}</p>
      </div>
    )}

    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Celular */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm">Celular</label>
          <div className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm">
            {formData.phone}
          </div>
        </div>

        {/* Campo Cidade */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm">Cidade</label>
          <div className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm">
            {formData.city}
          </div>
        </div>

        {/* Campo CEP */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm">CEP</label>
          <div className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm">
            {formData.cep}
          </div>
        </div>

        {/* Campo Número */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Número</label>
          <div className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm">
            {formData.street_number}
          </div>
        </div>
      </div>
    </div>
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
</div>

  );
};

export default EditClientAddress;
