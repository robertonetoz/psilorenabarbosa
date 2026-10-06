"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * O fio que atravessa a página. Começa embaraçado ao lado da pergunta do topo,
 * vai se soltando a cada seção e termina na flor do contato.
 *
 * O traçado passa, na ordem do documento, por todo elemento com `data-thread`:
 *   data-thread          ponto de passagem
 *   data-thread="knot"   emaranhado (o raio é metade da largura do elemento)
 *   data-thread="loop"   uma volta (data-dir="ccw" inverte o sentido)
 */

type Point = { x: number; y: number };

const SAMPLES = 900;

function tangle(c: Point, r: number): Point[] {
  const pts: Point[] = [];
  const n = 150;
  const span = Math.PI * 2 * 1.3;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * span;
    pts.push({
      x: c.x + r * (0.58 * Math.sin(2.9 * t + 0.3) + 0.42 * Math.sin(6.7 * t + 1.9)),
      y: c.y + r * 0.84 * (0.6 * Math.cos(2.1 * t + 0.8) + 0.4 * Math.cos(5.3 * t)),
    });
  }
  return pts;
}

// Uma volta que o fio dá sem perder o rumo: entra tangente à direção de chegada.
function loop(c: Point, r: number, dir: 1 | -1, from: Point): Point[] {
  const len = Math.hypot(c.x - from.x, c.y - from.y) || 1;
  const u = { x: (c.x - from.x) / len, y: (c.y - from.y) / len };
  const start = Math.atan2(-u.x * dir, u.y * dir);
  const pts: Point[] = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const a = start + dir * (i / n) * Math.PI * 2;
    const drift = (i / n - 0.5) * r * 1.5;
    pts.push({ x: c.x + r * Math.cos(a) + u.x * drift, y: c.y + r * Math.sin(a) + u.y * drift });
  }
  return pts;
}

// Trechos longos ganham uma barriga leve, alternando o lado, para o fio não correr em linha reta.
function relax(p: Point[], maxBend: number): Point[] {
  const out: Point[] = [p[0]];
  let side = 1;
  for (let i = 1; i < p.length; i++) {
    const a = p[i - 1];
    const b = p[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len > 380) {
      const bend = Math.min(len * 0.085, maxBend) * side;
      out.push({ x: (a.x + b.x) / 2 - ((b.y - a.y) / len) * bend, y: (a.y + b.y) / 2 + ((b.x - a.x) / len) * bend });
      side = -side;
    }
    out.push(b);
  }
  return out;
}

function toPath(p: Point[]): string {
  if (p.length < 2) return "";
  const unit = (a: Point, b: Point) => {
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
  };
  // a tangente em cada ponto é a bissetriz das direções de chegada e de saída
  const dir = p.map((_, i) => {
    const before = unit(p[Math.max(i - 1, 0)], p[i]);
    const after = unit(p[i], p[Math.min(i + 1, p.length - 1)]);
    if (i === 0) return after;
    if (i === p.length - 1) return before;
    const len = Math.hypot(before.x + after.x, before.y + after.y) || 1;
    return { x: (before.x + after.x) / len, y: (before.y + after.y) / len };
  });
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(p[0].x)} ${f(p[0].y)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i];
    const b = p[i + 1];
    const k = Math.hypot(b.x - a.x, b.y - a.y) * 0.36;
    d += `C${f(a.x + dir[i].x * k)} ${f(a.y + dir[i].y * k)} ${f(b.x - dir[i + 1].x * k)} ${f(b.y - dir[i + 1].y * k)} ${f(b.x)} ${f(b.y)}`;
  }
  return d;
}

export function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geom, setGeom] = useState({ w: 0, h: 0, d: "" });
  const [length, setLength] = useState(0);
  const reduce = useReducedMotion();

  const total = useRef(0);
  const depth = useRef<Float32Array | null>(null);
  const intro = useRef<"pending" | "running" | "done">("pending");

  const target = useMotionValue(0);
  const drawn = useSpring(target, { stiffness: 55, damping: 20, mass: 0.7 });
  const dashoffset = useTransform(drawn, (v) => Math.max(total.current - v, 0));

  const measure = useCallback(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const box = host.getBoundingClientRect();
    const pts: Point[] = [];
    host.querySelectorAll<HTMLElement>("[data-thread]").forEach((el) => {
      if (el.offsetParent === null) return;
      const r = el.getBoundingClientRect();
      const c = { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      const kind = el.dataset.thread;
      if (kind === "knot") pts.push(...tangle(c, r.width / 2));
      else if (kind === "loop")
        pts.push(...loop(c, r.width / 2, el.dataset.dir === "ccw" ? -1 : 1, pts[pts.length - 1] ?? { x: c.x, y: c.y - 1 }));
      else pts.push(c);
    });
    const d = pts.length > 1 ? toPath(relax(pts, Math.min(70, box.width * 0.055))) : "";
    setGeom((g) => (g.d === d && g.w === box.width && g.h === box.height ? g : { w: box.width, h: box.height, d }));
  }, []);

  // Quanto do fio deve estar desenhado para a posição atual da rolagem.
  const lengthForScroll = useCallback(() => {
    const host = svgRef.current?.parentElement;
    const ys = depth.current;
    if (!host || !ys) return 0;
    const reach = -host.getBoundingClientRect().top + window.innerHeight * 0.72;
    if (reach >= ys[SAMPLES]) return total.current;
    let lo = 0;
    let hi = SAMPLES;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (ys[mid] < reach) lo = mid + 1;
      else hi = mid;
    }
    return (lo / SAMPLES) * total.current;
  }, []);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    // espera o layout assentar (fontes, sanfona do FAQ) antes de refazer o traçado
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 140);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(host);
    document.fonts?.ready.then(schedule);
    measure();
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [measure]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geom.d) return;
    const full = path.getTotalLength();
    const ys = new Float32Array(SAMPLES + 1);
    let max = -Infinity;
    for (let i = 0; i <= SAMPLES; i++) {
      max = Math.max(max, path.getPointAtLength((full * i) / SAMPLES).y);
      ys[i] = max;
    }
    total.current = full;
    depth.current = ys;
    setLength(full);

    if (reduce) {
      target.jump(full);
      drawn.jump(full);
      return;
    }
    if (intro.current === "pending") {
      intro.current = "running";
      const controls = animate(target, lengthForScroll(), {
        duration: 3.2,
        delay: 0.5,
        ease: [0.6, 0, 0.3, 1],
        onComplete: () => {
          intro.current = "done";
        },
      });
      return () => controls.stop();
    }
    const now = lengthForScroll();
    target.jump(now);
    drawn.jump(now);
  }, [geom.d, reduce, target, drawn, lengthForScroll]);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      if (!depth.current) return;
      if (intro.current === "running") {
        target.stop();
        intro.current = "done";
      }
      target.set(lengthForScroll());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce, target, lengthForScroll]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox={geom.w ? `0 0 ${geom.w} ${geom.h}` : undefined}
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        ref={pathRef}
        d={geom.d || undefined}
        stroke="var(--color-areia)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={length || undefined}
        visibility={length ? "visible" : "hidden"}
        style={{ strokeDashoffset: dashoffset }}
      />
    </svg>
  );
}

/** Ponto por onde o fio passa. Posicione com classes utilitárias. */
export function ThreadPoint({
  kind,
  dir,
  className = "",
}: {
  kind?: "knot" | "loop";
  dir?: "cw" | "ccw";
  className?: string;
}) {
  return <i aria-hidden="true" data-thread={kind ?? ""} data-dir={dir} className={`pointer-events-none absolute block ${className}`} />;
}
