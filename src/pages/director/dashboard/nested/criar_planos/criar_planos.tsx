import { postRequest } from './api/criar_planos';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Toaster, toast } from 'react-hot-toast'; // Importando o react-hot-toast

// Definindo o tipo para os dados do plano
type Plan = {
  _id: string;
  title: string;
  type: string;
  speed: string;
  details: string[];
  price: number;
  public: string;
};

export const CreatePlanForm: React.FC = () => {
  const [planData, setPlanData] = useState({
    title: '',  // Adicionando o campo 'title'
    type: 'Telefonia Fixa',
    speed: '',
    details: '',
    price: 0,
    public: 'B2B',
    products: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converte o campo de 'details' para lista
    const detailsList = planData.details.split(',').map((detail) => detail.trim());

    try {
      const response = await postRequest('/director/create-plan', 'POST', {
        title: planData.title, // Incluindo o 'title' no envio
        type: planData.type,
        speed: planData.speed,
        details: detailsList,
        price: planData.price,
        public: planData.public,
        products: planData.products,
      });
      
      console.log('Plano criado com sucesso:', response);
      
      // Exibe um toast de sucesso
      toast.success('Plano criado com sucesso!', {
        position: 'top-right',
        duration: 4000,
        style: {
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontWeight: 'bold',
        },
      });

      // Resetar os campos após a criação
      setPlanData({
        title: '',
        type: 'Telfonia Fixa',
        speed: '',
        details: '',
        price: 0,
        public: 'B2B',
        products: [],
      });
    } catch (error) {
      console.error('Erro ao criar plano:', error);

      // Exibe um toast de erro
      toast.error('Erro ao criar plano!', {
        position: 'top-right',
        duration: 4000,
        style: {
          backgroundColor: '#f44336',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <FormWrapper>
      <h2 className="text-center text-2xl font-semibold mb-6">Criar Novo Plano</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Plano</label>
        <InputField
          type="text"
          id="title"
          name="title"
          value={planData.title}
          onChange={handleChange}
          placeholder="Exemplo: Plano Super 100Mbps"
          required
        />

        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Plano</label>
        <SelectField
          id="type"
          name="type"
          value={planData.type}
          onChange={handleChange}
          className="mb-4"
        >
          <option value="Telefonia Fixa">Telefonia Fixa</option>
          <option value="Banda Larga">Banda Larga</option>
          <option value="movel-5G">Móvel 5G</option>
          <option value="movel-4G">Móvel 4G</option>
        </SelectField>

        <label htmlFor="speed" className="block text-sm font-medium text-gray-700">Velocidade</label>
        <InputField
          type="text"
          id="speed"
          name="speed"
          value={planData.speed}
          onChange={handleChange}
          placeholder="Exemplo: 100 Mbps"
          required
        />

        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detalhes</label>
        <TextAreaField
          id="details"
          name="details"
          value={planData.details}
          onChange={handleChange}
          placeholder="Exemplo: Internet ilimitada, Wi-Fi"
          required
        />

        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
        <InputField
          type="number"
          id="price"
          name="price"
          value={planData.price}
          onChange={handleChange}
          placeholder="Exemplo: 199.99"
          required
        />

        <label htmlFor="public" className="block text-sm font-medium text-gray-700">Público</label>
        <SelectField
          id="public"
          name="public"
          value={planData.public}
          onChange={handleChange}
        >
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </SelectField>

        <Button type="submit" className="mt-4 w-full">Criar Plano</Button>
      </form>
      <Toaster /> {/* Exibe o ToastContainer para as mensagens de toast */}
    </FormWrapper>
  );
};

// Styled components abaixo

const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    border-color: #4A90E2;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4A90E2;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #357ABD;
  }
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
`;

export default CreatePlanForm;
