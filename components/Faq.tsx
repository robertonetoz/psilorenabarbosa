"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq, site } from "@/lib/site";
import { ThreadPoint } from "./Thread";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative py-20 lg:py-32">
      <ThreadPoint className="left-[92%] top-12 lg:left-[38.5%] lg:top-20" />
      <ThreadPoint className="left-[97%] top-[55%] lg:left-[37%] lg:top-[62%]" />
      <ThreadPoint className="bottom-8 left-[70%] lg:bottom-10 lg:left-[38%]" />

      <div className="wrap above-thread grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-serif text-title font-light text-cafe">Dúvidas frequentes</h2>
            <p className="mt-5 max-w-[22rem] text-[1rem] leading-relaxed text-argila">
              Não encontrou o que procurava?{" "}
              <a href={site.whatsappQuestion} target="_blank" rel="noopener noreferrer" className="link font-medium text-cafe">
                Pergunte pelo WhatsApp
              </a>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-argila/25 lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-argila/25">
                <h3>
                  <button
                    type="button"
                    id={`duvida-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`resposta-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-[1.4rem] leading-snug text-cafe sm:text-[1.55rem]">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="relative size-10 shrink-0 rounded-full border border-argila/35 transition-colors duration-300 group-hover:border-argila"
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-cafe" />
                      <span
                        className={`absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-cafe transition-transform duration-500 ease-calm ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`resposta-${i}`}
                      role="region"
                      aria-labelledby={`duvida-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[38rem] space-y-4 pb-8 font-serif text-prose text-argila">
                        {item.a.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
