"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { ArrowIcon, CloseIcon } from "./icons";

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export function Gallery({ photos }: { photos: Photo[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [active, setActive] = useState<number | null>(null);
  // foto pela qual a ampliação foi aberta: só ela faz a transição a partir da miniatura
  const [origin, setOrigin] = useState<string | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [mounted, setMounted] = useState(false);
  const { scrollXProgress } = useScroll({ container: scroller });


  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    setMounted(true);
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  };

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);

  const move = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active === null, close, move]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = active === null ? null : photos[active];

  return (
    <div>
      <motion.div
        ref={scroller}
        layoutScroll
        onScroll={updateEdges}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !scroller.current) return;
          drag.current = { active: true, moved: false, startX: e.clientX, startLeft: scroller.current.scrollLeft };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.active || !scroller.current) return;
          const dx = e.clientX - d.startX;
          if (Math.abs(dx) > 5) d.moved = true;
          if (d.moved) scroller.current.scrollLeft = d.startLeft - dx;
        }}
        onPointerUp={() => (drag.current.active = false)}
        onPointerLeave={() => (drag.current.active = false)}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-[1.375rem] active:cursor-grabbing sm:gap-5 sm:px-9 lg:px-[max(3.5rem,calc((100vw-78rem)/2+3.5rem))]"
        tabIndex={0}
        role="group"
        aria-label="Fotos da clínica. Use as setas para percorrer."
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {photos.map((photo, index) => {
          const ratio = photo.width / photo.height;
          return (
            <button
              key={photo.src}
              type="button"
              style={{ aspectRatio: ratio }}
              className="group relative h-[21rem] shrink-0 cursor-[inherit] sm:h-[27rem] lg:h-[32rem]"
              aria-label={`Ampliar foto: ${photo.caption}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOrigin(photo.src);
                setActive(index);
              }}
            >
              <motion.span
                layoutId={photo.src}
                className="absolute inset-0 block overflow-hidden rounded-[3px] bg-bruma"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 34rem, 80vw"
                  className="object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.035]"
                />
              </motion.span>
            </button>
          );
        })}
        <span className="w-px shrink-0" aria-hidden="true" />
      </motion.div>

      <div className="wrap mt-7 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-argila/20" aria-hidden="true">
          <motion.div className="absolute inset-0 origin-left bg-argila" style={{ scaleX: scrollXProgress }} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Fotos anteriores"
            className="flex size-11 items-center justify-center rounded-full border border-argila/35 text-cafe transition-colors hover:border-argila hover:bg-argila/[0.07] disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ArrowIcon direction="left" size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Próximas fotos"
            className="flex size-11 items-center justify-center rounded-full border border-argila/35 text-cafe transition-colors hover:border-argila hover:bg-argila/[0.07] disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ArrowIcon size={20} />
          </button>
        </div>
      </div>

      {/* fora do <main>, para ficar acima do cabeçalho e do botão do WhatsApp */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {current && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={current.caption}
                className="on-dark fixed inset-0 z-[80] flex flex-col items-center justify-center text-linho"
                initial={{ backgroundColor: "rgba(58,48,46,0)" }}
                animate={{ backgroundColor: "rgba(58,48,46,0.96)" }}
                exit={{ backgroundColor: "rgba(58,48,46,0)" }}
                transition={{ duration: 0.45 }}
                onClick={close}
              >
                <motion.div
                  key={current.src}
                  layoutId={current.src === origin ? current.src : undefined}
                  initial={current.src === origin ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden rounded-[3px]"
                  style={{
                    aspectRatio: current.width / current.height,
                    width: `min(92vw, calc(78vh * ${(current.width / current.height).toFixed(4)}))`,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-cover" />
                </motion.div>

                <motion.div
                  className="mt-5 flex w-[min(92vw,56rem)] items-center justify-between gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="font-serif text-[1.1rem]">
                    {current.caption}
                    <span className="ml-3 font-sans text-[0.85rem] text-linho/65">
                      {active! + 1} de {photos.length}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    {photos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => move(-1)}
                          aria-label="Foto anterior"
                          className="flex size-11 items-center justify-center rounded-full border border-linho/35 transition-colors hover:border-linho"
                        >
                          <ArrowIcon direction="left" size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(1)}
                          aria-label="Próxima foto"
                          className="flex size-11 items-center justify-center rounded-full border border-linho/35 transition-colors hover:border-linho"
                        >
                          <ArrowIcon size={20} />
                        </button>
                      </>
                    )}
                    <button
                      ref={closeButton}
                      type="button"
                      onClick={close}
                      aria-label="Fechar foto"
                      className="flex size-11 items-center justify-center rounded-full border border-linho/35 transition-colors hover:border-linho"
                    >
                      <CloseIcon size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
