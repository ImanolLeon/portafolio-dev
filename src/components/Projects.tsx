import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            My projects
          </h2>
          <p className="text-slate-400">Click on a project to see the details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Ver detalle del proyecto ${project.title}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className="group cursor-pointer rounded-2xl border border-slate-700/50 bg-navy-800/50 overflow-hidden hover:border-orange-500/60 transition-colors duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {/* Imagen del proyecto */}
              <div className="relative h-48 bg-navy-800 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Captura del proyecto ${project.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                 {project.inProduction && (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-[#0E1314]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-emerald-400">
    <span className="relative flex h-2 w-2">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    En producción
  </div>
)}

{project.inDesarrollo && (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-[#0E1314]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-amber-400">
    <span className="relative flex h-2 w-2">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
    </span>
    En desarrollo
  </div>
)}

{project.inCompletado && (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-[#0E1314]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-blue-400">
    <span className="relative flex h-2 w-2">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    </span>
    Completado
  </div>
)}

                {/* Sugerencia de "Ver detalles" al pasar el cursor */}
                <div className="absolute inset-0 flex items-center justify-center bg-navy-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-ink-900">
                    <Eye size={16} />
                    Ver detalles
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-gold-ink font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={`flex items-center gap-2 justify-center rounded-full border-2 border-slate-600 px-4 py-2 text-slate-300 font-medium hover:border-orange-500 hover:text-gold-ink transition-colors duration-300 ${
                      project.demo ? "flex-1" : ""
                    }`}
                  >
                    <GithubIcon size={18} />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className={`flex items-center gap-2 justify-center rounded-full bg-orange-500 px-4 py-2 text-ink-900 font-semibold hover:bg-orange-600 transition-colors duration-300 ${
                        project.github ? "flex-1" : ""
                      }`}
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
