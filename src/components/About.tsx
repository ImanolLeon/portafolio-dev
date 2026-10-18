import { ArrowRight } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years of Education", value: "4+" },
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "15+" },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Monograma estructural: anillos finos + iniciales en latón */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-slate-700/60" />
              <div className="absolute inset-6 rounded-full border border-slate-700/40" />
              <span className="font-extrabold tracking-tight text-orange-500 text-7xl lg:text-8xl select-none">
                IL
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6">
              About me
            </h2>

            <p className="text-slate-400 mb-8 leading-relaxed">
              Soy un Ingeniero de Sistemas especializado en desarrollo full-stack con Java, Spring Boot,
              React y Next.js. Me apasiona construir microservicios escalables, automatizar flujos de
              trabajo con n8n y crear soluciones eficientes que resuelvan problemas reales.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-700/50 bg-navy-800/50 p-6 text-center hover:border-orange-500/50 transition-colors duration-300"
                >
                  <div className="text-2xl font-extrabold text-gold-ink mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 rounded-full border-2 border-orange-500 px-6 py-3 text-gold-ink font-semibold hover:bg-orange-500 hover:text-ink-900 hover:-translate-y-1 transition-all duration-300">
              Learn More
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
