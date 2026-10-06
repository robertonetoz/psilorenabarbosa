"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Atalho fixo para o WhatsApp. Some no topo e na seção de contato, onde já há um botão igual. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contato");
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.75 : false;
      setVisible(pastHero && !atContact);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-cafe text-linho shadow-[0_10px_30px_-10px_rgba(58,48,46,0.55)] transition-colors hover:bg-argila sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
        >
          <WhatsAppIcon size={27} strokeWidth={1.15} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
