import { site } from "@/lib/site";
import { Gallery, type Photo } from "./Gallery";
import { Hours } from "./Hours";
import { ClockIcon, PinIcon } from "./icons";
import { ThreadPoint } from "./Thread";
import lorenaNaRecepcao from "@/public/images/lorena-clinica.jpg";
import recepcao from "@/public/clinica/recepcao.jpg";
import jardimVertical from "@/public/clinica/jardim-vertical.jpg";
import cafe from "@/public/clinica/cafe.jpg";

// As fotos do carrossel, na ordem em que aparecem.
const photos: Photo[] = [
  {
    ...lorenaNaRecepcao,
    caption: "Lorena na recepção",
    alt: "Lorena Barbosa de braços cruzados, sorrindo, apoiada no balcão da recepção da Clínica Alemí",
  },
  {
    ...recepcao,
    caption: "Recepção e sala de espera",
    alt: "Recepção da Clínica Alemí: balcão iluminado, luminárias douradas em anéis, sofá bege e jardim vertical ao fundo",
  },
  {
    ...jardimVertical,
    caption: "Jardim vertical",
    alt: "Parede de plantas com o símbolo da Clínica Alemí iluminado, ao lado do sofá da sala de espera",
  },
  {
    ...cafe,
    caption: "Cantinho do café",
    alt: "Aparador com cafeteira, taças e um lírio-da-paz, sob o letreiro Alemì em um painel de madeira iluminado",
  },
].map(({ src, width, height, caption, alt }) => ({ src, width, height, caption, alt }));

export function Clinic() {
  const { clinic } = site;

  return (
    <section id="clinica" className="relative bg-papel py-20 lg:py-32">
      <ThreadPoint className="left-[34%] top-12 lg:left-[52%] lg:top-20" />
      <ThreadPoint kind="loop" className="hidden w-11 lg:left-[96.5%] lg:top-[11rem] lg:block" />
      <ThreadPoint className="bottom-[26%] left-[97%] lg:bottom-[30%] lg:left-[96.5%]" />
      <ThreadPoint className="bottom-12 left-[60%] lg:bottom-16 lg:left-[38%]" />

      <div className="wrap above-thread grid gap-x-16 gap-y-6 lg:grid-cols-12">
        <h2 className="font-serif text-title font-light text-cafe lg:col-span-6">
          {clinic.name}, no centro de Araguari.
        </h2>
        <p className="max-w-[30rem] self-end font-serif text-prose text-argila lg:col-span-5 lg:col-start-8">
          Os atendimentos presenciais acontecem em um ambiente acolhedor e reservado, pensado para que você se sinta à
          vontade desde a chegada.
        </p>
      </div>

      <div className="above-thread mt-12 lg:mt-16">
        <Gallery photos={photos} />
      </div>

      <div className="wrap above-thread mt-16 grid gap-x-16 gap-y-12 lg:mt-24 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <div className="flex gap-5">
            <PinIcon size={30} strokeWidth={1.05} className="mt-1 shrink-0 text-argila" />
            <div>
              <h3 className="font-serif text-[1.35rem] text-cafe">Endereço</h3>
              <address className="mt-2 text-[1rem] not-italic leading-relaxed text-argila">
                {clinic.street}
                <br />
                {clinic.district}, {clinic.zip}
                <br />
                {clinic.reference}
              </address>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-4 inline-block text-[0.975rem] font-medium text-cafe"
              >
                Abrir rota no Google Maps
              </a>
            </div>
          </div>

          <div className="flex gap-5">
            <ClockIcon size={30} strokeWidth={1.05} className="mt-1 shrink-0 text-argila" />
            <div className="flex-1">
              <h3 className="font-serif text-[1.35rem] text-cafe">Horários</h3>
              <Hours />
              <p className="mt-3 text-[0.9rem] text-argila">Atendimento com horário marcado.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-bruma sm:aspect-[16/10]">
            <iframe
              src={clinic.mapsEmbed}
              title={`Mapa: ${clinic.name}, ${clinic.street}, Araguari-MG`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_sepia(0.28)_contrast(0.94)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
