import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "../data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

/** Una competencia: la tecnología y qué se hizo con ella (uno o varios puntos). */
interface Competency {
  tech: string;
  details: string[];
}

export default function ProjectModal({ project, onClose }: Props) {
  // Competencia seleccionada: abre el sub-modal lateral.
  const [activeComp, setActiveComp] = useState<Competency | null>(null);

  // Cerrar con Escape (primero el sub-modal, luego el modal) y bloquear el scroll del body.
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeComp) setActiveComp(null);
      else onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose, activeComp]);

  // Si cambia de proyecto, limpia la competencia abierta.
  useEffect(() => {
    setActiveComp(null);
  }, [project?.id]);

  return (
    <MotionConfig reducedMotion="user">
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-navy-800 shadow-2xl"
          >
            {/* Header con imagen */}
            <div className="relative h-44 shrink-0 overflow-hidden bg-navy-700 sm:h-52">
              <img
                src={project.image}
                alt={`Captura del proyecto ${project.title}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/40 to-transparent" />

              <button
                onClick={onClose}
                aria-label="Cerrar detalle del proyecto"
                className="absolute right-4 top-4 rounded-full border border-slate-700/50 bg-navy-900/70 p-2 text-slate-300 backdrop-blur-sm transition-colors hover:border-orange-500/50 hover:text-gold-ink"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <h3
                  id={`project-modal-title-${project.id}`}
                  className="text-2xl font-bold text-white md:text-3xl"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Contenido scrollable */}
            <div className="space-y-8 overflow-y-auto p-6 md:p-8">
              {/* Descripción ampliada */}
              <div>
                <h4 className="text-sm font-semibold text-gold-ink">
                  Sobre el proyecto
                </h4>
                <p className="leading-relaxed text-slate-300">{project.longDescription}</p>
              </div>
              {/* Competencias por tecnología: contenedores que abren un sub-modal lateral */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gold-ink">
                  Qué hice y qué competencias apliqué
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.competencies.map((comp) => (
                    <button
                      key={comp.tech}
                      type="button"
                      onClick={() => setActiveComp(comp)}
                      aria-haspopup="dialog"
                      aria-label={`Ver competencias de ${comp.tech}`}
                      className="group flex items-center gap-2 rounded-xl border border-slate-700/50 bg-navy-900/40 px-4 py-3 text-left transition-colors duration-200 hover:border-orange-500/60 hover:bg-navy-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      <span className="font-mono text-sm font-semibold text-white">
                        {comp.tech}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-gold-ink opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-px group-hover:translate-x-px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Destacados */}
              {project.highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gold-ink">
                    Destacados
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Acciones Code / Demo */}
              <div className="flex flex-col gap-3 border-t border-slate-700/50 pt-6 sm:flex-row sm:justify-center">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-full border-2 border-slate-600 px-6 py-3 font-medium text-slate-300 transition-colors duration-300 hover:border-orange-500 hover:text-gold-ink ${
                      project.demo ? "sm:flex-1" : ""
                    }`}
                  >
                    <GithubIcon size={18} />
                    Ver código
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-ink-900 transition-colors duration-300 hover:bg-orange-600 ${
                      project.github ? "sm:flex-1" : ""
                    }`}
                  >
                    <ExternalLink size={18} />
                    Ver demo
                  </a>
                )}
              </div>
            </div>

            {/* Sub-modal lateral: competencias de la tecnología seleccionada */}
            <AnimatePresence>
              {activeComp && (
                <>
                  {/* Atenuado del contenido tras el sub-modal */}
                  <motion.div
                    key="sub-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setActiveComp(null)}
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-navy-900/60 backdrop-blur-[2px]"
                  />

                  {/* Panel lateral que entra desde la derecha */}
                  <motion.div
                    key="sub-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Competencias de ${activeComp.tech}`}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-y-0 right-0 z-20 flex w-full max-w-sm flex-col border-l border-slate-700/50 bg-navy-800 shadow-2xl"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-700/50 px-5 py-4">
                      <span className="font-mono text-sm font-semibold text-gold-ink">
                        {activeComp.tech}
                      </span>
                      <button
                        onClick={() => setActiveComp(null)}
                        aria-label={`Cerrar detalle de ${activeComp.tech}`}
                        className="rounded-full border border-slate-700/50 p-1.5 text-slate-300 transition-colors hover:border-orange-500/50 hover:text-gold-ink"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5">
                      <h5 className="mb-3 text-sm font-semibold text-gold-ink">
                        Qué hice y qué competencias apliqué
                      </h5>
                      <ul className="space-y-3">
                        {activeComp.details.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-gold-ink" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </MotionConfig>
  );
}
