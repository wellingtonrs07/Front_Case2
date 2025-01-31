import React, { useEffect, useState } from "react";
import { getPlansRequest } from "@/pages/client/dashboard_home/nested/planos/api/planos";
import { Link } from "react-router-dom";

type Plan = {
  _id: string;
  title: string;
  type: string;
  speed: string;
  details: string[];
  price: number;
  public: string;
};

export const PlansList: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getVisibleCount = () => (window.innerWidth >= 1024 ? 2 : 1);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  const [categoryIndexes, setCategoryIndexes] = useState({
    "Telefonia Fixa": 0,
    "Banda Larga": 0,
    "Telefonia Móvel": 0,
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const route = "/client/get-plan";
        const data: Plan[] = await getPlansRequest<Plan[]>(route);
        setPlans(data);
      } catch (err) {
        setError("Falha ao carregar planos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();

    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const categories = {
    "Telefonia Fixa": plans.filter((plan) => plan.type === "Telefonia Fixa"),
    "Banda Larga": plans.filter((plan) => plan.type === "Banda Larga"),
    "Telefonia Móvel": plans.filter(
      (plan) => plan.type === "movel-4G" || plan.type === "movel-5G"
    ),
  };

  const visiblePlans = (category: string, categoryPlans: Plan[]) =>
    categoryPlans.slice(categoryIndexes[category], categoryIndexes[category] + visibleCount);

  const handleScroll = (direction: "left" | "right", category: string, totalPlans: number) => {
    setCategoryIndexes((prevIndexes) => {
      let newIndex = prevIndexes[category];

      if (direction === "left") {
        newIndex = Math.max(0, prevIndexes[category] - visibleCount);
      } else {
        newIndex =
          prevIndexes[category] + visibleCount >= totalPlans
            ? prevIndexes[category]
            : prevIndexes[category] + visibleCount;
      }

      return { ...prevIndexes, [category]: newIndex };
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 bg-white py-12">
      <h1 className="text-4xl font-bold text-blue-800 mb-12 text-center">
        Nossos Planos e Ofertas
      </h1>

      {Object.entries(categories).map(([category, categoryPlans]) =>
        categoryPlans.length > 0 ? (
          <div key={category} className="w-full max-w-5xl mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b-2 pb-2">
              {category}
            </h3>

            {/* Carrossel fixo */}
            <div className="relative flex items-center justify-center w-full">
              {categoryPlans.length > visibleCount && (
                <button
                  onClick={() => handleScroll("left", category, categoryPlans.length)}
                  className={`absolute left-0 px-4 py-2 rounded-full shadow-md transition text-lg font-bold ${
                    categoryIndexes[category] > 0
                      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      : "bg-gray-200 text-gray-400 cursor-default"
                  }`}
                  disabled={categoryIndexes[category] === 0}
                >
                  ‹
                </button>
              )}

              <div className="w-full flex justify-center overflow-hidden">
                <div className="flex space-x-6 w-[900px]">
                  {visiblePlans(category, categoryPlans).map((plan) => (
                    <div
                      key={plan._id}
                      className="flex flex-col w-[420px] h-[500px] p-8 rounded-xl shadow-md border border-gray-300 transition-all transform"
                      style={{
                        background: "#f8f9fa",
                        color: "#333",
                      }}
                    >
                      {/* Título do Plano */}
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-semibold uppercase">{plan.title}</h4>
                      </div>

                      {/* Nome e Velocidade */}
                      <div className="text-center mb-6">
                        <h5 className="text-xl font-semibold uppercase">{plan.type}</h5>
                        <p className="text-4xl font-extrabold mt-3">{plan.speed}</p>
                        <p className="text-lg text-gray-600">Velocidade</p>
                      </div>

                      {/* Detalhes do plano */}
                      <ul className="text-md text-gray-700 space-y-2 mb-4">
                        {plan.details.map((detail, i) => (
                          <li key={i} className="font-medium">
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {/* Preço */}
                      <div className="text-center mb-4">
                        <p className="text-3xl font-extrabold">R$ {plan.price.toFixed(2)}</p>
                        <p className="text-md text-gray-600">/ mês</p>
                      </div>

                      {/* Botão de Contratar */}
                      <Link
                        to="/client/dashboard/compra/confirmar-dados"
                        className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all text-center"
                      >
                        Assinar Agora
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {categoryPlans.length > visibleCount && (
                <button
                  onClick={() => handleScroll("right", category, categoryPlans.length)}
                  className={`absolute right-0 px-4 py-2 rounded-full shadow-md transition text-lg font-bold ${
                    categoryIndexes[category] + visibleCount < categoryPlans.length
                      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      : "bg-gray-200 text-gray-400 cursor-default"
                  }`}
                  disabled={categoryIndexes[category] + visibleCount >= categoryPlans.length}
                >
                  ›
                </button>
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default PlansList;
