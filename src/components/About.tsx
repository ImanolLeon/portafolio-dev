import { ArrowRight } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Semester, Systems Engineering", value: "9no" },
    { label: "Years of experience", value: "3+" },
    { label: "Universidad Tecnológica del Perú", value: "UTP" },
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
           I enjoy owning the whole journey of a product: designing it, coding it, deploying it on my 
           own Linux servers with Docker, and automating the repetitive parts with n8n. en español </p>

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

          </div>
        </div>
      </div>
    </section>
  );
}
