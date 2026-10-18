import { motion, MotionConfig } from "framer-motion";
import { Mail, Download, Leaf, Container, Triangle, Braces, Workflow, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "./icons";

export default function Hero() {
  const socialLinks = [
    { icon: GithubIcon, href: "https://github.com/ImanolLeon", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/imanolleoncordova", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://www.instagram.com/imanolleonalonso/", label: "Instagram" },
  ];

  const floatIcons = [
    { name: "TypeScript", icon: Braces, className: "left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2", delay: 0 },
    { name: "Next.js", icon: Triangle, className: "left-[83%] top-[30%] -translate-x-1/2 -translate-y-1/2", delay: 0.15 },
    { name: "Docker", icon: Container, className: "left-[83%] top-[70%] -translate-x-1/2 -translate-y-1/2", delay: 0.3 },
    { name: "n8n", icon: Workflow, className: "left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2", delay: 0.45 },
    { name: "Linux", icon: Terminal, className: "left-[17%] top-[70%] -translate-x-1/2 -translate-y-1/2", delay: 0.6 },
    { name: "Spring", icon: Leaf, className: "left-[17%] top-[30%] -translate-x-1/2 -translate-y-1/2", delay: 0.75 },
  ];

  return (
    <MotionConfig reducedMotion="user">
    <section id="home" className="min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-4 mb-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-700/50 p-3 hover:border-orange-500/50 hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} className="text-slate-300 hover:text-gold-ink" />
                </a>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Hi, I'm Imanol León
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Systems Engineer specialized in full-stack development with Java, Spring Boot, React and Next.js.
              I build scalable microservices and automate workflows with n8n.
            </p>

            <div className="flex flex-wrap gap-4">
             <a
                  href="/documents/Curriculun.pdf"
                  download="Imanol-Leon-Curriculum.pdf"
                  className="flex w-fit items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-ink-900 font-semibold hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <Download size={20} />
                  Download CV
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=imanolleonalonso@gmail.com&su=Tengo una consulta muy importante"
                className="flex items-center gap-2 rounded-full border-2 border-orange-500 px-6 py-3 text-gold-ink font-semibold hover:bg-orange-500 hover:text-ink-900 hover:-translate-y-1 transition-all duration-300"
              >
                <Mail size={20} />
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Right Column - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
              {/* Anillo fino de latón en vez de un halo/degradado decorativo */}
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-orange-500/60 p-px">
                <div className="w-full h-full rounded-full bg-navy-800 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/perfil.webp"
                    alt="Foto de perfil de Imanol León"
                    width={1122}
                    height={1402}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-[center_top] scale-[1.12] translate-x-[5%]"
                  />
                </div>
              </div>

              {/* Floating Icons */}
              {floatIcons.map(({ name, icon: Icon, className, delay }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + delay, ease: "easeOut" }}
                  className={`absolute ${className} flex items-center gap-2 rounded-full bg-navy-800/80 backdrop-blur-sm border border-slate-700/50 px-4 py-2 text-sm font-semibold text-gold-ink shadow-lg`}
                >
                  <Icon size={16} />
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
