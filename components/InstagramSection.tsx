import { posts, site } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { ThreadPoint } from "./Thread";

export function InstagramSection() {
  return (
    <section id="instagram" className="relative bg-bruma/55 py-20 lg:py-28">
      <ThreadPoint className="left-[72%] top-10 lg:left-[60%] lg:top-14" />
      <ThreadPoint className="bottom-8 left-[90%] lg:bottom-12 lg:left-[97%]" />

      <div className="wrap above-thread">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div className="max-w-[38rem]">
            <h2 className="font-serif text-title font-light text-cafe">Reflexões e dicas no Instagram</h2>
            <p className="mt-5 font-serif text-prose text-argila">
              Em {site.instagram.handle}, compartilho conteúdos sobre trauma, emoções e a forma como nos enxergamos.
              Seguir o perfil é um jeito de continuar esse cuidado no dia a dia.
            </p>
          </div>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <InstagramIcon size={20} />
            Seguir no Instagram
          </a>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {posts.map((post) => (
            <li key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[15rem] flex-col justify-between gap-10 rounded-[3px] bg-linho p-7 transition-colors duration-500 hover:bg-argila sm:p-8 md:aspect-[5/6] lg:aspect-square"
              >
                <p className="font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] font-light leading-[1.14] text-cafe transition-colors duration-500 group-hover:text-linho">
                  {post.title}
                </p>
                <div>
                  {post.excerpt && (
                    <p className="max-w-[20rem] text-[0.95rem] leading-relaxed text-argila transition-colors duration-500 group-hover:text-linho/85">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="mt-5 flex items-center gap-2 text-[0.9rem] font-medium text-cafe transition-colors duration-500 group-hover:text-linho">
                    <InstagramIcon size={17} />
                    Ver publicação
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
