import React from "react";
import fundo from "/images/fundo_sobrenos.jpg"; // Imagem de fundo  
import desenho1 from "/images/1.jpg";
import desenho2 from "/images/desenho2-removebg-preview.png";
import desenho3 from "/images/desenho3-removebg-preview.png";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] lg:h-[700px] mt-0 pt-0">
        <img 
          src={fundo} 
          alt="Fundo" 
          className="w-full h-full object-cover filter contrast-125 brightness-110" 
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          Conectando Pessoas, Empresas e o Futuro
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mt-4 drop-shadow-md">
          Somos mais do que uma operadora. Somos um ecossistema digital que transforma a conectividade 
          em experiências incríveis, aproximando pessoas e impulsionando negócios.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-12 py-16 space-y-16">
        {/* Qualidade da Conexão */}
        <Section 
          title="Excelência em Conectividade"
          description="Nossa infraestrutura é planejada para garantir estabilidade e alta velocidade, levando soluções eficientes de internet e telefonia para empresas e consumidores na região Sudeste."
          image={desenho1}
          reverse={false}
        />

        {/* Soluções e Serviços */}
        <Section 
          title="Soluções Sob Medida"
          description="Mais do que uma operadora, somos um parceiro estratégico. Oferecemos serviços de internet fibra, mobilidade, segurança digital e atendimento personalizado para atender às necessidades do seu dia a dia."
          image={desenho2}
          reverse={true}
        />

        {/* Cobertura e Tecnologia */}
        <Section 
          title="Cobertura Estratégica e Tecnologia de Última Geração"
          description={
            <ul className="list-disc pl-5 text-lg leading-relaxed text-gray-700">
              <li><span className="font-semibold text-gray-900">Atuação no Sudeste:</span> Cobertura focada nos principais centros urbanos e empresariais.</li>
              <li><span className="font-semibold text-gray-900">Infraestrutura de Alta Performance:</span> Conectividade estável para garantir eficiência e qualidade.</li>
              <li><span className="font-semibold text-gray-900">5G e Fibra Óptica:</span> O que há de mais avançado para velocidade, segurança e estabilidade.</li>
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
