import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-cafe py-14 text-linho/80">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-10">
          <div>
            <span
              role="img"
              aria-label="Lorena Barbosa, psicóloga psicotraumatologista"
              className="logo-mask h-[9.5rem] w-[11.85rem] text-linho"
              style={{
                maskImage: "url(/images/logo-completa-mask.png)",
                WebkitMaskImage: "url(/images/logo-completa-mask.png)",
              }}
            />
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-14 gap-y-2.5 text-[0.95rem]">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-linho">
                {item.label}
              </a>
            ))}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-linho">
              Instagram
            </a>
          </nav>

          <p className="max-w-[24rem] text-[0.9rem] leading-relaxed">
            Este site não oferece atendimento de urgência. Em uma crise, ligue 188 (CVV, 24 horas, gratuito) ou 192
            (SAMU).
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-x-10 gap-y-2 border-t border-linho/15 pt-6 text-[0.85rem] text-linho/60">
          <p>
            © {new Date().getFullYear()} {site.name}. Psicóloga, {site.crp}.
          </p>
          <p>
            {site.clinic.street}, {site.clinic.district}
          </p>
        </div>
      </div>
    </footer>
  );
}
