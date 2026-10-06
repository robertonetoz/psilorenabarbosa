import { reviews, site } from "@/lib/site";
import { StarIcon } from "./icons";
import { ThreadPoint } from "./Thread";

export function Reviews() {
  const [featured, ...others] = reviews;

  return (
    <section id="avaliacoes" className="relative py-20 lg:py-32">
      <ThreadPoint className="left-[8%] top-10 lg:left-[40%] lg:top-24" />
      <ThreadPoint className="left-[3%] top-[42%] lg:left-[36.5%] lg:top-[52%]" />
      <ThreadPoint className="bottom-10 left-[5%] lg:bottom-16 lg:left-[30%]" />

      <div className="wrap above-thread grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-title font-light text-cafe">O que dizem no Google</h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-serif text-[3.5rem] font-light leading-none text-cafe">{site.google.rating}</span>
            <div>
              <span className="flex gap-1 text-argila" role="img" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} size={17} />
                ))}
              </span>
              <p className="mt-1.5 text-[0.95rem] text-argila">{site.google.count} avaliações</p>
            </div>
          </div>
          <a
            href={site.google.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-8 inline-block text-[0.975rem] font-medium text-cafe"
          >
            Ver todas as avaliações no Google
          </a>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <figure>
            <blockquote className="font-serif text-statement font-light text-cafe">
              <p>“{featured.text}”</p>
            </blockquote>
            <figcaption className="mt-5 text-[0.95rem] text-argila">{featured.name}</figcaption>
          </figure>

          <ul className="mt-14 grid gap-x-12 sm:grid-cols-2">
            {others.map((review) => (
              <li key={review.name} className="border-t border-argila/20 py-6">
                <figure>
                  <blockquote className="font-serif text-[1.2rem] leading-snug text-cafe">
                    <p>“{review.text}”</p>
                  </blockquote>
                  <figcaption className="mt-3 text-[0.9rem] text-argila">{review.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
