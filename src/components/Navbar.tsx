import { useState, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const SECTION_IDS = ["home", "about", "projects", "contact"];

// Convierte "/about" (o "/about/") en "about"; devuelve null si no es una sección.
function sectionIdFromPath(pathname: string): string | null {
  const id = pathname.replace(/^\/+|\/+$/g, "");
  return SECTION_IDS.includes(id) ? id : null;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // URLs limpias (/about en vez de #about): sigue siendo una sola página con
  // scroll, pero la barra de direcciones muestra la ruta de la sección.
  useEffect(() => {
    const onPopState = () => {
      const id = sectionIdFromPath(window.location.pathname);
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo({ top: 0 });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Respeta abrir en pestaña nueva, clic con modificadores y clic central.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const id = sectionIdFromPath(href);
    const target = id ? document.getElementById(id) : null;
    if (!id || !target) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-700/50 bg-navy-800/70 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/home"
            onClick={(event) => handleNavClick(event, "/home")}
            className="text-2xl font-bold text-white"
          >
            Portfolio<span className="text-orange-500">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="text-slate-300 hover:text-gold-ink transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 border border-slate-700/50 hover:border-orange-500/50 transition-colors"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} />}
            </button>
            <a
              href="/contact"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="rounded-full bg-orange-500 px-6 py-2 text-ink-900 font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-full p-2 border border-slate-700/50"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl border border-slate-700/50 bg-navy-800/90 backdrop-blur-md p-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    handleNavClick(event, link.href);
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-300 hover:text-gold-ink transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={toggleTheme}
                  className="rounded-full p-2 border border-slate-700/50 hover:border-orange-500/50 transition-colors"
                  aria-label="Cambiar tema"
                >
                  {isDark ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} />}
                </button>
                <a
                  href="/contact"
                  onClick={(event) => {
                    handleNavClick(event, "/contact");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 text-center rounded-full bg-orange-500 px-6 py-2 text-ink-900 font-semibold hover:bg-orange-600 transition-colors duration-300"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
