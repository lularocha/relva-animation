import { Link } from "react-router-dom";
import { Target, Eye, Leaf, ArrowLeft } from "lucide-react";

import relvaFullLogo from "../assets/logos/relva-app-symbol-woodmark.svg";

function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
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
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-4">
          <img
            src={relvaFullLogo}
            alt="Relva"
            className="h-60 md:h-96 mx-auto"
          />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="pt-4 pb-16 md:py-16 px-4 md:px-8 lg:px-16 bg-[#63c34a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Mission */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Target className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-xl font-bold mb-3 text-[#004d28]">Mission</h2>
              <p className="text-white mb-4">
                Advancing environmental science through innovative research and sustainable
                practices that benefit communities and ecosystems.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Vision */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Eye className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-xl font-bold mb-3 text-[#004d28]">Vision</h2>
              <p className="text-white mb-4">
                A world where environmental stewardship and technology create a sustainable
                future for many generations to come.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Values */}
            <div className="text-center p-8 rounded-lg bg-[#63c34a] hover:bg-[#56b33f] transition-colors">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-xl font-bold mb-3 text-[#004d28]">Values</h2>
              <p className="text-white mb-4">
                Integrity, collaboration, and a deep commitment to environmental
                responsibility guide everything we do at Instituto Relva.
              </p>
              <a
                href="#"
                className="text-[#004d28] hover:text-[#003d20] transition-colors inline-flex items-center gap-1 font-medium"
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
