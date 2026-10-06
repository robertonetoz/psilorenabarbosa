/**
 * Trava a rolagem da página (foto ampliada, menu aberto) sem mudar a largura do conteúdo:
 * o espaço que a barra de rolagem ocupava é devolvido como padding. Retorna a função que destrava.
 */
export function lockScroll() {
  const { body, documentElement: root } = document;
  const before = root.clientWidth;
  body.style.overflow = "hidden";
  const gap = root.clientWidth - before;
  if (gap > 0) body.style.paddingRight = `${gap}px`;
  return () => {
    body.style.overflow = "";
    body.style.paddingRight = "";
  };
}
