import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  /** Campo trampa (honeypot) para frenar bots. Debe quedar vacío. */
  botcheck: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/** Clave de Web3Forms inyectada desde .env (prefijo PUBLIC_ para el cliente). */
const WEB3FORMS_KEY: string = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Ocultar el banner de éxito a los pocos segundos.
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = async (data: ContactFormData) => {
    if (!WEB3FORMS_KEY) {
      setErrorMessage(
        "Falta configurar la clave de Web3Forms (PUBLIC_WEB3FORMS_KEY en .env)."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo mensaje de contacto de ${data.firstName} ${data.lastName}`,
          from_name: "Portafolio Imanol León",
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone ?? "",
          message: data.message,
          botcheck: data.botcheck ?? "",
        }),
      });

      const json = (await res.json()) as {
        success: boolean;
        message?: string;
      };

      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(
          json.message ?? "No se pudo enviar el mensaje. Inténtalo de nuevo."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Revisa tu internet e inténtalo de nuevo.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-navy-800/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Get in touch
          </h2>
          <p className="text-slate-400 text-lg">Let's discuss your project</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: identidad + estado, sin ilustración genérica */}
          <div className="relative flex flex-col items-center gap-8 text-center">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-slate-700/60" />
              <div className="absolute inset-5 rounded-full border border-slate-700/40" />
              <span className="font-extrabold tracking-tight text-orange-500 text-6xl lg:text-7xl select-none">
                IL
              </span>
            </div>

            {/* Indicador de disponibilidad */}
            <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-navy-800/50 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="font-mono text-sm text-slate-400">Available for full-time roles</span>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="rounded-2xl border border-slate-700/50 bg-navy-800/50 p-8">
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot anti-spam: oculto para los usuarios, los bots suelen rellenarlo */}
              <input
                type="text"
                {...register("botcheck")}
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    className="w-full rounded-xl border border-slate-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    className="w-full rounded-xl border border-slate-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-slate-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-xl border border-slate-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="+51 900 000 000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full rounded-xl border border-slate-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 text-ink-900 font-semibold hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {/* Mensajes de éxito / error */}
              {status === "success" && (
                <p className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  <CheckCircle2 size={18} className="shrink-0" />
                  ¡Mensaje enviado! Te responderé pronto.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={18} className="shrink-0" />
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
