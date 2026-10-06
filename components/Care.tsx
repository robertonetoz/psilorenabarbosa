import { site } from "@/lib/site";
import { ArmchairIcon, ScreenIcon, WhatsAppIcon } from "./icons";
import { ThreadPoint } from "./Thread";

export function Care() {
  return (
    <section id="atendimento" className="relative py-20 lg:py-32">
      <ThreadPoint className="left-[70%] top-[4.5rem] lg:left-[62%] lg:top-[7rem]" />
      <ThreadPoint className="left-[96%] top-[48%] lg:left-[50%] lg:top-[47%]" />
      <ThreadPoint className="bottom-16 left-[80%] lg:bottom-24 lg:left-[36%]" />

      <div className="wrap above-thread">
        <h2 className="max-w-[40rem] font-serif text-title font-light text-cafe">
          Presencial ou online, com o mesmo cuidado.
        </h2>

        <div className="mt-14 grid gap-y-12 lg:mt-20 lg:grid-cols-2 lg:gap-x-24">
          <article>
            <ArmchairIcon size={44} strokeWidth={0.95} className="text-argila" />
            <h3 className="mt-5 font-serif text-[1.75rem] text-cafe">Presencial, em Araguari-MG</h3>
            <p className="mt-4 max-w-[30rem] font-serif text-prose text-argila">
              Os atendimentos acontecem na {site.clinic.name}, no centro da cidade. Um ambiente acolhedor, reservado
              e voltado ao cuidado emocional.
            </p>
            <a href="#clinica" className="link mt-5 inline-block text-[0.975rem] font-medium text-cafe">
              Conhecer a clínica
            </a>
          </article>

          <article>
            <ScreenIcon size={44} strokeWidth={0.95} className="text-argila" />
            <h3 className="mt-5 font-serif text-[1.75rem] text-cafe">Online, para todo o Brasil</h3>
            <p className="mt-4 max-w-[30rem] font-serif text-prose text-argila">
              Por meio de plataforma segura, com a mesma qualidade, ética e sigilo profissional. Uma alternativa
              prática para quem prefere ou precisa dessa modalidade, em Araguari, na região ou em qualquer lugar do
              país.
            </p>
          </article>
        </div>

        <div className="mt-20 grid gap-x-16 gap-y-8 border-t border-argila/20 pt-12 lg:mt-28 lg:grid-cols-12 lg:pt-16">
          <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.25rem)] font-light leading-tight text-cafe lg:col-span-4">
            Como é a primeira sessão
          </h3>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-[36rem] space-y-5 font-serif text-prose text-argila">
              <p>
                O foco será te acolher e entender o que te trouxe até aqui. Será um espaço para você compartilhar
                suas preocupações, dores, expectativas e motivações em relação à terapia.
              </p>
              <p>
                Também aproveitarei para explicar como funciona o processo terapêutico, para que possamos alinhar
                juntos o caminho mais adequado para você. Por ser o nosso primeiro encontro, a sessão pode durar um
                pouco mais, para conversarmos com calma.
              </p>
            </div>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-9">
              <WhatsAppIcon size={20} />
              Agendar a primeira sessão
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
