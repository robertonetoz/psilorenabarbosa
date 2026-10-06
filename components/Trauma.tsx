import { experiences } from "@/lib/site";
import { ThreadPoint } from "./Thread";
import { WordReveal } from "./WordReveal";

export function Trauma() {
  return (
    <section id="psicotraumatologia" className="on-dark relative bg-argila py-20 text-linho lg:py-32">
      <ThreadPoint className="left-[90%] top-12 lg:left-[46%] lg:top-24" />
      <ThreadPoint className="left-[97%] top-[30%] lg:left-[45.5%] lg:top-[45%]" />
      <ThreadPoint kind="loop" dir="ccw" className="hidden w-14 lg:left-[90%] lg:top-[66%] lg:block" />
      <ThreadPoint className="bottom-10 left-[96%] lg:bottom-16 lg:left-[94%]" />

      <div className="wrap above-thread">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <h2 className="font-serif text-title font-light lg:col-span-5">
            O que faz uma psicóloga psicotraumatologista?
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[34rem] font-serif text-lead">
              Compreende e trata os impactos emocionais de experiências difíceis ou traumáticas.
            </p>
            <p className="mt-10 text-[0.95rem] text-linho/75">Essas vivências podem envolver</p>
            <ul className="mt-3 border-t border-linho/25">
              {experiences.map((item) => (
                <li key={item} className="border-b border-linho/25 py-3.5 font-serif text-[1.3rem] leading-snug">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.95rem] text-linho/75">entre outras situações marcantes.</p>
          </div>
        </div>

        <div className="mt-24 lg:mt-36">
          <p className="max-w-[40rem] font-serif text-lead text-linho/85">
            Muitas vezes, o trauma não está apenas em um grande acontecimento, mas em vivências que ultrapassaram a
            capacidade emocional da pessoa, deixando marcas profundas.
          </p>
          <WordReveal
            className="mt-10 max-w-[60rem] font-serif text-statement font-light"
            text="Acolher o trauma é reconhecer que sobreviver foi o primeiro ato de coragem. Curar não é apagar o que aconteceu, é aprender a existir para além do que doeu."
          />
          <p className="mt-10 max-w-[34rem] font-serif text-lead text-linho/85">
            Você não está sozinho(a). Estou aqui para caminhar com você nessa jornada.
          </p>
        </div>
      </div>
    </section>
  );
}
