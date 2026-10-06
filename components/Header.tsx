"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import simbolo from "@/public/images/logo-simbolo.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled && !open ? "bg-linho/90 shadow-[0_1px_0_0_rgba(105,92,89,0.14)] backdrop-blur-md" : ""
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#inicio" className="relative z-[60] flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={simbolo} alt="" className="h-11 w-auto" priority unoptimized />
          <span className="leading-tight">
            <span className="block font-serif text-[1.3rem] text-cafe">{site.name}</span>
            <span className="block text-[0.74rem] tracking-[0.02em] text-argila">Psicóloga, {site.crp}</span>
          </span>
        </a>

        <nav aria-label="Seções do site" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[0.95rem] text-argila transition-colors hover:text-cafe">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid hidden !min-h-11 !px-5 !py-2 lg:inline-flex">
          <WhatsAppIcon size={19} />
          Agendar sessão
        </a>

        <button
          type="button"
          className="relative z-[60] -mr-2 flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-7">
            <span
              className={`absolute left-0 top-0 h-px w-7 bg-cafe transition-transform duration-500 ease-calm ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-7 bg-cafe transition-transform duration-500 ease-calm ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movel"
            className="fixed inset-0 z-[55] flex flex-col bg-linho px-[1.375rem] pb-10 pt-28 sm:px-9 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1] }}
          >
            <nav aria-label="Seções do site" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-argila/15 py-4 font-serif text-[2rem] font-light text-cafe"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-auto">
              <WhatsAppIcon size={20} />
              Agendar pelo WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
