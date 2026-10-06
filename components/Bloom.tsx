"use client";

import { motion, useReducedMotion } from "motion/react";
import { ThreadPoint } from "./Thread";

const strokes = [
  // haste
  "M100 300 C 94 250, 110 205, 100 150",
  // folhas
  "M99 245 C 68 240, 48 216, 46 192 C 72 198, 93 216, 99 245",
  "M103 212 C 130 204, 148 182, 150 160 C 126 166, 108 184, 103 212",
  // pétalas
  "M100 150 C 72 146, 54 118, 60 84 C 80 94, 95 118, 100 150",
  "M100 150 C 128 146, 146 118, 140 84 C 120 94, 105 118, 100 150",
  "M100 150 C 80 126, 82 86, 100 58 C 118 86, 120 126, 100 150",
  // estames
  "M100 58 C 99 46, 95 38, 89 31",
  "M100 58 C 101 45, 106 37, 113 32",
  "M100 58 C 100 44, 100 34, 101 24",
];

/** A flor em que o fio termina, no mesmo traço das flores da logo. */
export function Bloom({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 300" fill="none" aria-hidden="true" className="h-full w-full overflow-visible">
        {strokes.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="var(--color-areia)"
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, delay: 0.5 + i * 0.16, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
        {[
          [89, 31],
          [113, 32],
          [101, 24],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cy}
            r={2.2}
            fill="var(--color-areia)"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 2.2 + i * 0.12 }}
          />
        ))}
      </svg>
      {/* o fio da página chega pela base da haste */}
      <ThreadPoint className="-bottom-9 left-[86%] lg:-bottom-12 lg:left-[8%]" />
      <ThreadPoint className="bottom-0 left-1/2" />
    </div>
  );
}
