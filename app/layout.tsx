import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const title = "Lorena Barbosa | Psicóloga psicotraumatologista em Araguari-MG";
const description =
  "Psicóloga com especialização em Psicotraumatologia (CRP-MG 04/80586). Atendimento presencial na Clínica Alemí, em Araguari-MG, e online para todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Lorena Barbosa, psicóloga",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#eee9e3",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: "Lorena Barbosa | Psicóloga psicotraumatologista",
  description,
  url: site.url,
  telephone: "+55 34 98872-6779",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Rodolfo Paixão, 879 - Centro",
    addressLocality: "Araguari",
    addressRegion: "MG",
    postalCode: site.clinic.zip,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:30",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:30", closes: "13:30" },
  ],
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cafe focus:px-5 focus:py-3 focus:text-linho"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
