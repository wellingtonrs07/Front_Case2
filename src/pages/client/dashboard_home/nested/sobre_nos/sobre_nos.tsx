import React from 'react';
import fundo from "/images/fundo_sobre_nos.jpeg";
import desenho1 from "/images/desenho1.jpeg";
import desenho2 from "/images/desenho2.jpeg";
import desenho3 from "/images/desenho3.jpeg";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Fundo da página com slogans sobre ele */}
      <div className="relative">
        <img src={fundo} alt="Fundo" className="w-full h-[600px] object-cover" /> {/* Imagem maior */}
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Sobreposição escura */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
          <h1 className="text-5xl font-bold">Transformando o futuro da tecnologia</h1> {/* Slogan maior */}
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Inovação e qualidade ao seu alcance. Nós impulsionamos o sucesso da sua empresa com soluções
            tecnológicas avançadas.
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Missão */}
        <section className="mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">Missão</h2>
            <p className="text-lg">
              Nossa missão é fornecer aos nossos clientes as melhores soluções, mantendo o foco na inovação e
              na sustentabilidade. Estamos empenhados em melhorar a vida das pessoas e das empresas com soluções
              práticas e acessíveis.
            </p>
          </div>
          <div className="flex-1">
            <img src={desenho1} alt="Desenho 1" className="w-50 h-50 object-cover mb-4" />
          </div>
        </section>

        {/* Visão */}
        <section className="mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">Visão</h2>
            <p className="text-lg">
              Ser reconhecido como líder no setor de soluções tecnológicas, oferecendo um portfólio de produtos
              e serviços que atendam às necessidades do mercado global, sempre com foco na qualidade e no atendimento
              excepcional ao cliente.
            </p>
          </div>
          <div className="flex-1">
            <img src={desenho2} alt="Desenho 2" className="w-50 h-50 object-cover mb-4" />
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">Valores</h2>
            <ul className="list-disc pl-6 text-lg">
              <li>Inovação constante.</li>
              <li>Comprometimento com a qualidade.</li>
              <li>Transparência e ética em todos os negócios.</li>
              <li>Respeito ao meio ambiente e à sustentabilidade.</li>
              <li>Valorização de nossa equipe e de nossos clientes.</li>
            </ul>
          </div>
          <div className="flex-1">
            <img src={desenho3} alt="Desenho 3" className="w-50 h-50 object-cover mb-4" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
