import { Link } from "react-router-dom";
import { Target, Eye, Leaf, ArrowLeft } from "lucide-react";

import relvaFullLogo from "../assets/logos/relva-app-symbol-woodmark.svg";

function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundColor: "#1a0a28"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Link>

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-4 -mt-[120px] md:-mt-[50px]">
          <a
            href="#highlights"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer"
          >
            <img
              src={relvaFullLogo}
              alt="Relva"
              className="h-60 md:h-96 mx-auto hover:scale-105 transition-transform"
            />
          </a>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="pt-4 pb-16 md:py-16 px-4 md:px-8 lg:px-16 bg-[#63c34a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Missão */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Target className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#004d28]">Missão</h2>
              <p className="text-white mb-4">
                Avançar a ciência ambiental através de pesquisas inovadoras e práticas
                sustentáveis que beneficiam comunidades e ecossistemas.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Visão */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Eye className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#004d28]">Visão</h2>
              <p className="text-white mb-4">
                Um mundo onde a gestão ambiental, metodologia científica e tecnologia criam um futuro
                sustentável para muitas gerações que estão por vir.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Valores */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#004d28]">Valores</h2>
              <p className="text-white mb-4">
                Integridade, colaboração e um profundo compromisso com a responsabilidade
                ambiental guiam tudo o que fazemos no Instituto Relva.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#004d28]">História</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#004d28]">Metodologia</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#e8f5e3]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © Instituto Relva 2026 . Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
