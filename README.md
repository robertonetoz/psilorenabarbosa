# Site Lorena Barbosa, psicóloga psicotraumatologista

Next.js 16 (App Router), React 19, Tailwind CSS 4 e Motion.

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para publicar: `npm run build` e `npm start`, ou envie o projeto para a Vercel.

## Onde mexer

| O quê | Onde |
| --- | --- |
| Textos, contatos, horários, avaliações, FAQ, posts do Instagram | `lib/site.ts` |
| Fotos do carrossel da clínica | lista `photos` em `components/Clinic.tsx` (arquivos em `public/clinica/`) |
| Cores e tipografia | `app/globals.css` (bloco `@theme`) |
| Seções da página | `components/` (uma por arquivo), montadas em `app/page.tsx` |
| Ocultar as avaliações do Google | `showReviews: false` em `lib/site.ts` |
| Domínio definitivo | variável de ambiente `NEXT_PUBLIC_SITE_URL` (ex.: `https://www.seudominio.com.br`) |
| Prévia do link (WhatsApp, redes sociais) | `app/opengraph-image.jpg`, gerada pelo script abaixo |

## Imagens

Os originais (`logolb.png`, `lorena.jpg`, `lorena2.jpg`, `clinica1.jpg` a `clinica3.jpg`) ficam na raiz. Ao trocar
algum deles, rode `node scripts/prepare-assets.mjs` para gerar de novo os recortes da logo, o ícone do site, a
prévia do link e as fotos otimizadas.

## O fio

A linha que atravessa a página é desenhada por `components/Thread.tsx`. Ela passa por todos os
`<ThreadPoint />` espalhados pelas seções, na ordem em que aparecem. Para mudar o caminho, mova
esses pontos com classes de posição (`left-[..] top-[..]`).
