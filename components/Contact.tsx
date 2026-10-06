import { site } from "@/lib/site";
import { Bloom } from "./Bloom";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { ThreadPoint } from "./Thread";

export function Contact() {
  const { clinic } = site;
  const channels = [
    { icon: PhoneIcon, label: "Telefone e WhatsApp", value: site.phoneDisplay, href: site.phoneHref },
    { icon: MailIcon, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: InstagramIcon, label: "Instagram", value: site.instagram.handle, href: site.instagram.url, external: true },
    {
      icon: PinIcon,
      label: "Endereço",
      value: `${clinic.name}, ${clinic.street}, ${clinic.district}`,
      href: clinic.mapsUrl,
      external: true,
    },
  ];

  return (
    <section id="contato" className="on-dark relative overflow-hidden bg-argila py-20 text-linho lg:py-32">
      <ThreadPoint className="left-[95%] top-10 lg:left-[70%] lg:top-16" />
      <ThreadPoint className="left-[97%] top-[45%] lg:left-[63%] lg:top-[52%]" />

      <div className="wrap above-thread grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="max-w-[38rem] font-serif text-[clamp(2.3rem,5vw,4.25rem)] font-light leading-[1.04] tracking-[-0.02em]">
            O primeiro passo pode ser uma mensagem.
          </h2>
          <p className="mt-7 max-w-[30rem] font-serif text-lead text-linho/85">
            Escreva para tirar dúvidas ou agendar sua primeira sessão, presencial ou online.
          </p>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-10">
            <WhatsAppIcon size={20} />
            Agendar pelo WhatsApp
          </a>

          <ul className="mt-16 grid gap-x-12 border-t border-linho/25 sm:grid-cols-2">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="border-b border-linho/25">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex gap-4 py-5"
                >
                  <Icon size={26} strokeWidth={1.05} className="mt-0.5 shrink-0 text-areia" />
                  <span>
                    <span className="block text-[0.85rem] text-linho/70">{label}</span>
                    <span className="link mt-0.5 inline font-serif text-[1.15rem] leading-snug [background-size:0%_1px] group-hover:[background-size:100%_1px]">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none flex items-end justify-center lg:col-span-4 lg:col-start-9 lg:justify-end">
          <Bloom className="h-[15rem] w-[10rem] lg:h-[24rem] lg:w-[16rem]" />
        </div>
      </div>
    </section>
  );
}
