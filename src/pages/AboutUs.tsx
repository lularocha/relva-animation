import { Link } from "react-router-dom";
import { Target, Eye, Leaf, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import relvaFullLogo from "../assets/logos/relva-app-symbol-woodmark.svg";

function AboutUs() {
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setHeroAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#002d18" }}
      >
        {/* Background image with slide-down animation */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
            heroAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
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
        <div className="relative z-10 text-center text-white px-4 -mt-[190px] md:-mt-[50px]">
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

        {/* Scroll down arrow */}
        <a
          href="#highlights"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-[170px] md:bottom-[70px] left-1/2 -translate-x-1/2 z-10 cursor-pointer hover:scale-110 transition-transform"
        >
          <ArrowDown className="w-10 h-10 text-[#1da348]" />
        </a>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="pt-4 pb-16 md:py-16 px-4 md:px-8 lg:px-16 bg-[#151530]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Missão */}
            <div className="text-center p-8 rounded-lg bg-[#151530] hover:bg-[#1e1e40] transition-colors">
              <Target className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#63c34a]">Missão</h2>
              <p className="text-white mb-4">
                Avançar a ciência ambiental através de pesquisas inovadoras e práticas
                sustentáveis que beneficiam comunidades e ecossistemas.
              </p>
              <a
                href="#"
                className="text-[#63c34a] hover:text-[#7ed95f] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Visão */}
            <div className="text-center p-8 rounded-lg bg-[#151530] hover:bg-[#1e1e40] transition-colors">
              <Eye className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#63c34a]">Visão</h2>
              <p className="text-white mb-4">
                Um mundo onde a gestão ambiental, metodologia científica e tecnologia criam um futuro
                sustentável para muitas gerações que estão por vir.
              </p>
              <a
                href="#"
                className="text-[#63c34a] hover:text-[#7ed95f] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Valores */}
            <div className="text-center p-8 rounded-lg bg-[#151530] hover:bg-[#1e1e40] transition-colors">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-3 text-[#63c34a]">Valores</h2>
              <p className="text-white mb-4">
                Integridade, colaboração e um profundo compromisso com a responsabilidade
                ambiental guiam tudo o que fazemos no Instituto Relva.
              </p>
              <a
                href="#"
                className="text-[#63c34a] hover:text-[#7ed95f] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Saiba mais
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias Recentes Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#e8f5e3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-[#004d28] text-left">Notícias Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="group text-left overflow-hidden hover:bg-white transition-colors cursor-pointer">
              <img
                src="/images/news3.jpg"
                alt="Notícia 1"
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="py-4 pl-0 group-hover:pl-[20px] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-[#004d28]">Título da Notícia 1</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
                <a
                  href="#"
                  className="text-[#1da348] hover:text-[#63c34a] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  Saiba mais
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="group text-left overflow-hidden hover:bg-white transition-colors cursor-pointer">
              <img
                src="/images/news4.jpg"
                alt="Notícia 2"
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="py-4 pl-0 group-hover:pl-[20px] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-[#004d28]">Título da Notícia 2</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
                <a
                  href="#"
                  className="text-[#1da348] hover:text-[#63c34a] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  Saiba mais
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="group text-left overflow-hidden hover:bg-white transition-colors cursor-pointer">
              <img
                src="/images/news5.jpg"
                alt="Notícia 3"
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="py-4 pl-0 group-hover:pl-[20px] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-[#004d28]">Título da Notícia 3</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
                <a
                  href="#"
                  className="text-[#1da348] hover:text-[#63c34a] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  Saiba mais
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
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

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#1da348] hover:bg-[#0f7838] flex items-center justify-center transition-all duration-300 cursor-pointer z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}

export default AboutUs;
