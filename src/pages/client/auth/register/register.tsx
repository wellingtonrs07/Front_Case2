import React, { useState } from 'react';
import { registerRequest } from './api/register';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { Envelope, Lock } from '@phosphor-icons/react'; // Importando ícones
import fundo from "/images/fundo_login.png";
import { Link } from 'react-router-dom'; 

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '', // Adicionando cpf ao estado
    phone: '',
    birth_date: '',
    city: '',
    cep: '',
    street_number: '',
  });

  const [error, setError] = useState(''); // Estado para o erro
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setError(''); // Limpar qualquer erro anterior

    try {
      await registerRequest({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,  // Incluindo cpf na requisição
        phone: formData.phone,
        birth_date: formData.birth_date,
        city: formData.city,
        cep: formData.cep,
        street_number: formData.street_number,
      });

      toast.success('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/client/dashboard'), 2000); 
    } catch (error) {
      setError('Erro ao realizar o cadastro. Tente novamente.');
      toast.error('Erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-1/2 md:h-full bg-gradient-to-b from-blue-500 via-blue-300 to-blue-700"></div>

      {/* Formulário */}
      <div className="w-full md:w-2/3 ">
        <div className="mx-auto  mt-20 max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Registre-se</h1>
    
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
          {/* Campo Nome Completo */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Nome Completo</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Nome Completo"
            />
          </div>

          {/* Campo E-mail */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="E-mail"
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Senha"
            />
          </div>

          {/* Campo Celular */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Celular</label>
            <input 
              type="text" 
              id="phone" 
              name="phone"
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Celular"
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Confirmar Senha"
            />
          </div>

          {/* Campo CPF */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">CPF</label>
            <input 
              type="text" 
              id="cpf" 
              name="cpf"
              value={formData.cpf} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="CPF"
            />
          </div>

          {/* Campo Data de Nascimento */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Data de Nascimento</label>
            <input 
              type="date" 
              id="birth_date" 
              name="birth_date"
              value={formData.birth_date} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
            />
          </div>

          {/* Campo Cidade */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">Cidade</label>
            <input 
              type="text" 
              id="city" 
              name="city"
              value={formData.city} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Cidade"
            />
          </div>

          {/* Campo CEP */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm">CEP</label>
            <input 
              type="text" 
              id="cep" 
              name="cep"
              value={formData.cep} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="CEP"
            />
          </div>

          {/* Campo Número */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm">Número</label>
            <input 
              type="text" 
              id="street_number" 
              name="street_number"
              value={formData.street_number} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mt-2 text-sm"
              placeholder="Número"
            />
          </div>
        </div>

        <button 
            type="submit" 
            className="w-1/2 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition mx-auto block"
            >
            Salvar
            </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/client/auth/login" className="text-sm text-blue-500 hover:underline">
            Já tem conta? Faça login
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};
