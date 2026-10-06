"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { StarIcon, WhatsAppIcon } from "./icons";
import { ThreadPoint } from "./Thread";
import retrato from "@/public/images/lorena-retrato.jpg";
import assinatura from "@/public/images/logo-assinatura.png";

const calm = [0.22, 0.7, 0.2, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "108%" },
          animate: { y: 0 },
          transition: { duration: 1.1, delay, ease: calm },
        };
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: calm },
        };

  return (
    <section id="inicio" className="relative overflow-x-clip pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      {/* o fio nasce solto, embaraça ao lado da pergunta e segue para baixo */}
      <ThreadPoint className="right-[14%] top-[5.5rem] lg:left-[43%] lg:right-auto lg:top-[7.5rem]" />
      <ThreadPoint kind="knot" className="right-[1.25rem] top-[10.6rem] w-24 sm:right-[6rem] sm:top-[15rem] sm:w-32 lg:hidden" />
      <ThreadPoint className="right-[1.5%] top-[24rem] lg:hidden" />
      <ThreadPoint kind="knot" className="left-[49.5%] top-[57%] hidden w-52 lg:block xl:w-60" />
      <ThreadPoint className="bottom-[9.5rem] left-[12%] lg:bottom-[7.5rem] lg:left-[38%]" />

      <div className="wrap above-thread grid items-end gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:pb-10">
          <h1 className="font-serif text-[clamp(2rem,10.4vw,4.75rem)] font-light leading-none tracking-[-0.022em] text-cafe lg:text-[clamp(3.25rem,5.4vw,5rem)]">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span className="block" {...rise(0.15)}>
                Por que ainda dói,
              </motion.span>
            </span>
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span className="block" {...rise(0.3)}>
                se já passou?
              </motion.span>
            </span>
          </h1>

          <motion.p className="mt-8 max-w-[31rem] font-serif text-lead text-argila lg:mt-10" {...fade(0.75)}>
            Sou Lorena Barbosa, psicóloga com especialização em Psicotraumatologia. Ofereço um espaço seguro para
            compreender o que você viveu e seguir no seu ritmo, presencialmente em Araguari-MG ou online.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" {...fade(0.95)}>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              <WhatsAppIcon size={20} />
              Agendar pelo WhatsApp
            </a>
            <a href="#atendimento" className="link text-[0.975rem] font-medium text-cafe">
              Como funciona o atendimento
            </a>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-bruma"
            {...(reduce
              ? {}
              : {
                  initial: { clipPath: "inset(100% 0% 0% 0%)" },
                  animate: { clipPath: "inset(0% 0% 0% 0%)" },
                  transition: { duration: 1.5, delay: 0.35, ease: calm },
                })}
          >
            <motion.div
              className="absolute inset-0"
              {...(reduce
                ? {}
                : { initial: { scale: 1.14 }, animate: { scale: 1 }, transition: { duration: 2.2, delay: 0.35, ease: calm } })}
            >
              <Image
                src={retrato}
                alt="Lorena Barbosa sorrindo em seu consultório, sentada à mesa diante de uma parede de plantas"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_18%]"
              />
            </motion.div>
          </motion.div>

          <motion.div className="mt-5 flex items-end justify-between gap-6" {...fade(1.5)}>
            <Image src={assinatura} alt="Lorena Barbosa" className="h-auto w-[13.5rem] sm:w-[15.5rem]" unoptimized />
            <p className="pb-1 text-right text-[0.82rem] leading-snug text-argila">
              Psicóloga
              <br />
              {site.crp}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.dl
        className="wrap above-thread mt-16 grid gap-y-5 text-[0.95rem] sm:grid-cols-3 sm:gap-x-10 lg:mt-24"
        {...fade(1.2)}
      >
        <div className="border-t border-argila/25 pt-4">
          <dt className="text-argila">Registro profissional</dt>
          <dd className="mt-1 font-serif text-[1.3rem] text-cafe">{site.crp}</dd>
        </div>
        <div className="border-t border-argila/25 pt-4">
          <dt className="text-argila">Avaliações no Google</dt>
          <dd className="mt-1 flex items-center gap-2.5 font-serif text-[1.3rem] text-cafe">
            {site.google.rating}
            <span className="flex gap-0.5 text-argila" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} size={14} />
              ))}
            </span>
            <span className="font-sans text-[0.9rem] text-argila">em {site.google.count} avaliações</span>
          </dd>
        </div>
        <div className="border-t border-argila/25 pt-4">
          <dt className="text-argila">Atendimento</dt>
          <dd className="mt-1 font-serif text-[1.3rem] text-cafe">Presencial e online</dd>
        </div>
      </motion.dl>
    </section>
  );
}
