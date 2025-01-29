import React, { useEffect, useState } from "react";
import { getPromotionsRequest } from "@/pages/client/dashboard_home/nested/promocoes/api/promocoes";
import fundo from "/images/fundo_novo.png"; // Imagem de fundo
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Promotion = {
  description: string;
  plan: string[];
  price: number;
  discount: string;
  image?: string;
};

export const PromotionsList: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const route = "/client/get-promotion";
        const data: Promotion[] = await getPromotionsRequest<Promotion[]>(route);
        setPromotions(data);
      } catch (err) {
        setError("Falha ao carregar promoções.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading)
    return (
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-[400px] rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Título dentro da imagem de fundo */}
      <h2 className="absolute top-10 text-5xl font-bold text-white text-center drop-shadow-lg">
        Nossas Promoções
      </h2>

      {/* Seção de Promoções */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto mt-20">
        {[0, 1, 2].map((index) => (
          <Card
            key={index}
            className={`relative w-full h-[400px] flex flex-col justify-between rounded-2xl shadow-lg p-8 text-white transition-transform ${
              index === 1
                ? "scale-105 hover:scale-[1.1] shadow-3xl bg-gradient-to-r from-blue-500 to-blue-700"
                : "scale-100 hover:scale-105 shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Indicador de Desconto */}
            <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-bl-2xl">
              10% OFF
            </div>

            {/* Nome do Plano */}
            <h3 className="text-2xl font-bold uppercase text-center">Para Toda Família</h3>

            {/* Preço Destacado */}
            <p className="text-4xl font-bold text-center">
              R$100.99
              <span className="text-lg font-medium"> /mês</span>
            </p>

            {/* Benefícios */}
            <ul className="text-lg mt-2 space-y-1 text-center">
              <li className="flex justify-center items-center gap-2">✔ Internet Ilimitada</li>
              <li className="flex justify-center items-center gap-2">✔ Suporte Premium</li>
              <li className="flex justify-center items-center gap-2">✔ Instalação Grátis</li>
            </ul>

            {/* Botão de Contratação */}
            <Button className="mt-6 w-full py-3 bg-white text-blue-700 text-lg font-bold rounded-lg hover:bg-gray-200 transition">
              Contratar Agora
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromotionsList;
