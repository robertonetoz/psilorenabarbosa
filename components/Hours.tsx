"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Tabela de horários com o dia de hoje destacado. */
export function Hours() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <dl className="mt-2 max-w-[22rem] text-[1rem]">
      {site.hours.map((row) => {
        const isToday = today !== null && row.days.includes(today);
        return (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-6 border-b border-argila/15 py-2.5 ${isToday ? "text-cafe" : "text-argila"}`}
          >
            <dt className={isToday ? "font-medium" : ""}>
              {row.label}
              {isToday && <span className="ml-2 text-[0.82rem] font-normal text-argila">hoje</span>}
            </dt>
            <dd className={isToday ? "font-medium" : ""}>{row.time}</dd>
          </div>
        );
      })}
    </dl>
  );
}
