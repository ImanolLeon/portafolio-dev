import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "./icons";

export default function Footer() {
  const socialLinks = [
    { icon: GithubIcon, href: "https://github.com/ImanolLeon", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/imanolleoncordova", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://www.instagram.com/imanolleonalonso/", label: "Instagram" },
  ];

  return (
    <footer className="border-t border-slate-700/50 bg-navy-800/30 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8">
          <div className="text-3xl font-bold text-white">
            Portfolio<span className="text-orange-500">.</span>
          </div>

          <p className="text-slate-400 text-lg">Full Stack Developer</p>

          <div className="flex gap-4">
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

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>by Imanol León</span>
          </div>

          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Portfolio. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
