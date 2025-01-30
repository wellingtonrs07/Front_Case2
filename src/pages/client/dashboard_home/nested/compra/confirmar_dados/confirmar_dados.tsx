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

export const ConfirmCompra = () => {
  // Tipando o estado formData corretamente
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolder: '',
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
          cardNumber: '',
          expirationDate: '',
          cvv: '',
          cardHolder: '',
          cart: cartData, // Atualiza com os IDs dos planos
        });

        setCartPlans(plansData); // Atualiza com os planos detalhados
      } catch (err) {
        setError('Erro ao carregar os dados do cliente');
      }
    };

    fetchData();
  }, []); // Recarrega apenas uma vez quando o componente é montado

  // Função para lidar com a alteração dos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função de confirmação
  const handleConfirm = () => {
    // Lógica de confirmação aqui
    console.log('Compra Confirmada!');
  };

  return (
    <div className="w-full flex h-screen justify-between a border-4 border-blue-300">
      {/* Formulário para dados de cartão */}
      <div className='w-2/3 border-4 border-blue-300'>
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg mr-4 border-4 border-blue-300">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Dados do Cartão</h1>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-4 bg-red-500 text-white rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {/* Campo Número do Cartão */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Número do Cartão</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              />
            </div>

            {/* Campo Nome do Titular */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Nome do Titular</label>
              <input
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              />
            </div>

            {/* Campo Data de Validade */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm">Data de Validade</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
                placeholder="MM/AA"
              />
            </div>

            {/* Campo CVV */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              />
            </div>
          </div>
          <button
          onClick={handleConfirm}
          className="w-1/4 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar
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

      {/* Botão de Confirmar */}
    </div>
  );
};

export default ConfirmCompra;
