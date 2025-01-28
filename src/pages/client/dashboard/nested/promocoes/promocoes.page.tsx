import React, { useEffect, useState } from 'react';
import { getPromotionsRequest } from '@/pages/client/dashboard/nested/promocoes/api/promocoes'; // Função para pegar as promoções
import fundo from "/images/fundo_sobre_nos.jpeg"; // Imagem de fundo para a seção

// Define o tipo da promoção
type Promotion = {
    description: string;
    plan: string[]; // Lista de planos como strings
    price: number; // Preço como número (float)
};

export const PromotionsList: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]); // Estado com o tipo Promotion[]
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const route = '/client/get-promotion'; // Rota para pegar as promoções
                const data: Promotion[] = await getPromotionsRequest<Promotion[]>(route); // Tipagem explícita
                setPromotions(data); // Atualiza o estado com as promoções
            } catch (err) {
                setError('Failed to load promotions.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {/* Imagem de fundo para a seção inteira, agora com w-full */}
            <div
                className="relative w-full h-[600px] bg-cover bg-center mt-12"
                style={{ backgroundImage: `url(${fundo})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Sobreposição escura */}

                {/* Conteúdo das promoções agora ocupa toda a largura com w-full */}
                <div className="absolute w-full mx-auto px-4 py-8 relative z-10">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {promotions.map((promotion, index) => (
                            <div
                                key={index}
                                className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 max-w-xs w-full"
                            >
                                {/* Cartão com fundo azul */}
                                <div className="relative z-10 text-white">
                                    <h2 className="text-xl font-semibold mb-4">{promotion.description}</h2>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold">Planos:</h3>
                                        <p>{promotion.plan.join(', ')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Preço:</h3>
                                        <p className="text-2xl font-bold">R${promotion.price.toFixed(2)}/mês</p>
                                    </div>
                                    <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                                        Adquirir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionsList;
