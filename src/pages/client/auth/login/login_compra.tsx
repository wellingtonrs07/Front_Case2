import React, { useState } from 'react';
import { login } from './api/login'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { Envelope, Lock } from '@phosphor-icons/react'; // Importando ícones
import fundo from "/images/fundo_login.png";
import { Link } from 'react-router-dom'; 

export const ClientLoginCompra = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Estado para o erro
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpar qualquer erro anterior
    try {
      await login(credentials.email, credentials.password); 
      navigate('/client/dashboard/compra/confirmar-dados');

    } catch (error) {
      setError('Erro no login. Por favor, verifique suas credenciais.'); // Definir a mensagem de erro
      toast.error('Erro no login. Por favor, verifique suas credenciais.');
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Div da imagem com fundo */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${fundo})` }}></div>

      {/* Div do formulário */}
      <div className="w-full md:w-1/3 flex items-center justify-center min-w-0 border-l-4 md:border-l-0 border-blue-500">
        <div className="w-11/12 md:w-96 p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Olá Cliente!</h1>
          <p className="mb-8 text-lg">Bem vindo!</p>
          
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-4 bg-red-500 text-white rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div className="mb-4 flex items-center border-2 rounded-full p-2 focus-within:border-blue-500">
              <Envelope size={20} className="mr-2 text-gray-500" />
              <input 
                type="email" 
                id="email" 
                name="email"
                value={credentials.email} 
                onChange={handleChange} 
                required 
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Email"
              />
            </div>

            {/* Campo Senha */}
            <div className="mb-6 flex items-center border-2 rounded-full p-2 focus-within:border-blue-500">
              <Lock size={20} className="mr-2 text-gray-500" />
              <input 
                type="password" 
                id="password" 
                name="password"
                value={credentials.password} 
                onChange={handleChange} 
                required 
                className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Senha"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">Trocar Senha</a>
          </div>
          <div className="text-center mt-2">
            <Link to="/client/auth/register" className="text-sm text-blue-500 hover:underline">
                Não tem uma conta? Crie
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};
