import { site } from "@/lib/site";
import { FingerprintIcon, HoldIcon, ListenIcon, LockIcon } from "./icons";
import { ThreadPoint } from "./Thread";

const principles = [
  {
    icon: HoldIcon,
    title: "Acolhimento",
    text: "Um espaço seguro e sem julgamentos, onde você pode se expressar livremente.",
  },
  {
    icon: ListenIcon,
    title: "Escuta empática",
    text: "Uma escuta sensível e um olhar humanizado para suas demandas emocionais.",
  },
  {
    icon: FingerprintIcon,
    title: "Respeito à singularidade",
    text: "Seu tempo e suas necessidades conduzem o processo. Nenhuma história é igual à outra.",
  },
  {
    icon: LockIcon,
    title: "Ética e sigilo",
    text: "Atendimento ético e sigiloso, tanto no presencial quanto no online.",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative py-20 lg:py-32">
      <ThreadPoint kind="loop" className="left-[7%] top-[5.5rem] w-14 lg:left-[20%] lg:top-[4.5rem] lg:w-20" />
      <ThreadPoint className="left-[3%] top-[46%] lg:left-[45.5%] lg:top-[38%]" />
      <ThreadPoint className="bottom-12 left-[55%] lg:bottom-16 lg:left-[45%]" />

      <div className="wrap above-thread grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-serif text-title font-light text-cafe lg:sticky lg:top-32">
            Sua história é respeitada, e cada passo acontece no seu ritmo.
          </h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="max-w-[36rem] space-y-6 font-serif text-prose text-argila">
            <p className="text-lead text-cafe">
              Meu atendimento é ético e sigiloso, respeitando seu tempo e suas necessidades.
            </p>
            <p>
              Trabalho com a Abordagem Humanista Centrada na Pessoa, que valoriza o acolhimento, a escuta empática e
              o respeito à singularidade de cada indivíduo.
            </p>
            <p>
              Ofereço um espaço seguro e acolhedor, onde sua história é respeitada e cada passo acontece no seu
              próprio ritmo, com uma escuta sensível e um olhar humanizado para suas demandas emocionais.
            </p>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }) => (
              <li key={title} className="max-w-[19rem]">
                <Icon size={34} strokeWidth={1.05} className="text-argila" />
                <h3 className="mt-4 font-serif text-[1.35rem] text-cafe">{title}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-argila">{text}</p>
              </li>
            ))}
          </ul>

          <p className="mt-14 border-t border-argila/20 pt-5 text-[0.9rem] text-argila">
            {site.name}, psicóloga. {site.crp}. {site.qualification}.
          </p>
        </div>
      </div>
    </section>
  );
}
