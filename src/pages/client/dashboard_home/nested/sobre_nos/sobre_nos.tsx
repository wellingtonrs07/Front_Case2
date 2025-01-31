import React from "react";
import fundo from "/images/fundo_sobre_nos.png";  // Imagem de fundo  
import desenho1 from "/images/Imagem_1-removebg-preview.png";
import desenho2 from "/images/desenho2-removebg-preview.png";
import desenho3 from "/images/desenho3-removebg-preview.png";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="py-0 relative w-full h-[600px] lg:h-[700px]">
        <img 
          src={fundo} 
          alt="Fundo" 
          className="w-full h-full object-cover filter contrast-125 brightness-110" 
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Conectando o futuro com inovação
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mt-4 drop-shadow-md">
            Implementamos tecnologia de ponta para revolucionar as telecomunicações, com atendimento humanizado e soluções 5G MVNO.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-12 py-16 space-y-16">
        {/* Missão */}
        <Section 
          title="Nossa Missão"
          description="Facilitar a conectividade por meio de soluções inovadoras, promovendo um acesso eficiente, acessível e de alta qualidade à tecnologia 5G para empresas e consumidores."
          image={desenho1}
          reverse={false}
        />

        {/* Visão */}
        <Section 
          title="Nossa Visão"
          description="Ser a principal referência no mercado de telecomunicações como uma operadora digital MVNO de alta performance, conectando pessoas e negócios com agilidade e confiabilidade."
          image={desenho2}
          reverse={true}
        />

        {/* Valores */}
        <Section 
          title="Nossos Valores"
          description={
            <ul className="list-disc pl-5 text-lg leading-relaxed text-gray-700">
              <li><span className="font-semibold text-gray-900">Inovação Contínua:</span> Buscamos sempre novas tecnologias para entregar o melhor serviço.</li>
              <li><span className="font-semibold text-gray-900">Excelência no Atendimento:</span> Nosso compromisso é garantir suporte humanizado e próximo aos clientes.</li>
              <li><span className="font-semibold text-gray-900">Conectividade Acessível:</span> Democratizamos o acesso à internet de alta velocidade para todos.</li>
              <li><span className="font-semibold text-gray-900">Transparência e Ética:</span> Construímos relações de confiança com nossos parceiros e clientes.</li>
              <li><span className="font-semibold text-gray-900">Sustentabilidade e Impacto Social:</span> Utilizamos tecnologia de forma consciente, promovendo inclusão digital e redução de impactos ambientais.</li>
            </ul>
          }
          image={desenho3}
          reverse={false}
        />
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  description: React.ReactNode;
  image: string;
  reverse: boolean;
}

const Section: React.FC<SectionProps> = ({ title, description, image, reverse }) => {
  return (
    <section className={`flex ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center w-full h-[480px] md:h-[550px] gap-12 md:gap-20 p-6`}> 
      <div className="w-[48%] text-left">
        <h2 className="text-5xl font-semibold text-gray-900 mb-6">{title}</h2>
        <p className="text-xl leading-relaxed text-gray-700">{description}</p>
      </div>
      <div className="w-[48%] h-[90%]">
        <img src={image} alt={title} className="w-full h-full object-cover bg-transparent" />
      </div>
    </section>
  );
};

export default AboutUs;