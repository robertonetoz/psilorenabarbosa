// Prepara os arquivos de imagem do site a partir dos originais na raiz do projeto.
// Rodar com: node scripts/prepare-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const LINHO = { r: 238, g: 233, b: 227 };

await mkdir("public/images", { recursive: true });
await mkdir("public/clinica", { recursive: true });

// ---------- Logo: separa o símbolo e a assinatura ----------
const logo = sharp("logolb.png").ensureAlpha();
const { data, info } = await logo.raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const isInk = (x, y) => {
  const i = (y * W + x) * 4;
  return data[i + 3] > 20 && Math.min(data[i], data[i + 1], data[i + 2]) < 236;
};

// faixas horizontais com tinta (símbolo, assinatura, linhas de texto)
const bands = [];
let start = -1;
for (let y = 0; y < H; y++) {
  let ink = false;
  for (let x = 0; x < W; x++) if (isInk(x, y)) { ink = true; break; }
  if (ink && start < 0) start = y;
  if (!ink && start >= 0) { bands.push([start, y - 1]); start = -1; }
}
if (start >= 0) bands.push([start, H - 1]);
// une faixas separadas por menos de 6px (acentos, pingos)
const merged = [];
for (const b of bands) {
  const last = merged[merged.length - 1];
  if (last && b[0] - last[1] < 6) last[1] = b[1];
  else merged.push([...b]);
}
console.log("faixas da logo:", merged);

const bbox = (y0, y1) => {
  let x0 = W, x1 = 0;
  for (let y = y0; y <= y1; y++)
    for (let x = 0; x < W; x++) if (isInk(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
  const pad = 6;
  return {
    left: Math.max(x0 - pad, 0),
    top: Math.max(y0 - pad, 0),
    width: Math.min(x1 + pad, W - 1) - Math.max(x0 - pad, 0) + 1,
    height: Math.min(y1 + pad, H - 1) - Math.max(y0 - pad, 0) + 1,
  };
};

// Recorta um trecho da logo (que já tem fundo transparente). `mask` gera uma versão
// só-alfa (branca), usada com CSS mask para pintar a logo em qualquer cor: o traço
// rosado do cérebro fica mais leve que o marrom das letras, como no original.
async function cut(region, name) {
  const { left, top, width, height } = region;
  const color = Buffer.alloc(width * height * 4);
  const mask = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const s = ((top + y) * W + (left + x)) * 4;
      const d = (y * width + x) * 4;
      const r = data[s], g = data[s + 1], b = data[s + 2], a = data[s + 3];
      color[d] = r; color[d + 1] = g; color[d + 2] = b; color[d + 3] = a;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const weight = Math.max(0.42, Math.min(1, (255 - lum) / 160));
      mask[d] = 255; mask[d + 1] = 255; mask[d + 2] = 255; mask[d + 3] = Math.round(a * weight);
    }
  }
  const raw = { raw: { width, height, channels: 4 } };
  await sharp(color, raw).png().toFile(`public/images/${name}.png`);
  await sharp(mask, raw).png().toFile(`public/images/${name}-mask.png`);
  console.log(name, `${width}x${height}`);
}

const [mark, signature] = merged;
await cut(bbox(mark[0], mark[1]), "logo-simbolo");
await cut(bbox(signature[0], signature[1]), "logo-assinatura");
await cut(bbox(merged[0][0], merged[merged.length - 1][1]), "logo-completa");

// ---------- Ícone do site e imagem de compartilhamento ----------
const markPng = await sharp("public/images/logo-simbolo.png").resize({ height: 380 }).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: { ...LINHO, alpha: 1 } } })
  .composite([{ input: markPng, gravity: "center" }])
  .png()
  .toFile("app/icon.png");

// Prévia do link (WhatsApp, Instagram, Google): logo à esquerda, retrato à direita.
const OG = { width: 1200, height: 630, photo: 470 };
const ogLogo = await sharp("public/images/logo-completa.png").resize({ height: 400 }).toBuffer();
const ogPhoto = await sharp("lorena.jpg")
  .resize({ width: OG.photo, height: OG.height, fit: "cover", position: "top" })
  .toBuffer();
const ogLogoWidth = (await sharp(ogLogo).metadata()).width;
await sharp({ create: { width: OG.width, height: OG.height, channels: 4, background: { ...LINHO, alpha: 1 } } })
  .composite([
    { input: ogPhoto, left: OG.width - OG.photo, top: 0 },
    { input: ogLogo, left: Math.round((OG.width - OG.photo - ogLogoWidth) / 2), top: Math.round((OG.height - 400) / 2) },
  ])
  .flatten({ background: LINHO })
  .jpeg({ quality: 86, mozjpeg: true }) // leve, para o WhatsApp exibir a prévia
  .toFile("app/opengraph-image.jpg");

// ---------- Fotos ----------
await sharp("lorena.jpg").resize({ width: 1800 }).jpeg({ quality: 86, mozjpeg: true }).toFile("public/images/lorena-retrato.jpg");
await sharp("lorena2.jpg").jpeg({ quality: 88, mozjpeg: true }).toFile("public/images/lorena-clinica.jpg");

// Galeria da clínica
const clinic = { "clinica1.jpg": "recepcao", "clinica2.jpg": "jardim-vertical", "clinica3.jpg": "cafe" };
for (const [source, name] of Object.entries(clinic)) {
  await sharp(source)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`public/clinica/${name}.jpg`);
}

console.log("ok");
