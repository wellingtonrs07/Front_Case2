import React, { useState, useEffect } from 'react';
import { getClientData } from './api/confirmar_dados'; // Função para buscar dados do cliente

export const EditClientAddress = () => {
  const [formData, setFormData] = useState({
    phone: '',
    city: '',
    cep: '',
    street_number: '',
  });
  const [error, setError] = useState('');

  // Aqui, obtemos os dados do cliente ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData(); // Agora a função retorna os dados do cliente
        setFormData({
          phone: data.client_data.phone,
          city: data.client_data.city,
          cep: data.client_data.cep,
          street_number: data.client_data.street_number,
        });
      } catch (err) {
        setError('Erro ao carregar os dados do cliente');
      }
    };

    fetchData();
  }, []); // Recarrega apenas uma vez quando o componente é montado

  return (
    <div className="w-full md:w-2/3">
      <div className="mx-auto mt-20 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
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
  );
};

export default EditClientAddress;

