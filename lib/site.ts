// Todo o conteúdo do site fica aqui. Para alterar textos, contatos ou
// avaliações, edite este arquivo.

// Defina NEXT_PUBLIC_SITE_URL com o domínio definitivo. Sem ela, na Vercel vale o endereço do projeto.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const whatsappNumber = "5534988726779";
const whatsappMessage = "Olá, Lorena! Vim pelo seu site e gostaria de agendar uma sessão.";

export const site = {
  name: "Lorena Barbosa",
  role: "Psicóloga psicotraumatologista",
  crp: "CRP-MG 04/80586",
  qualification: "Especialização em Psicotraumatologia",
  url: siteUrl,

  whatsapp: `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`,
  phoneDisplay: "(34) 98872-6779",
  phoneHref: "tel:+5534988726779",
  email: "lorenabarbosa.psico@gmail.com",

  instagram: {
    handle: "@psicologa.lorenabarbosa",
    url: "https://www.instagram.com/psicologa.lorenabarbosa/",
  },

  clinic: {
    name: "Clínica Alemí",
    street: "Rua Rodolfo Paixão, 879",
    district: "Centro, Araguari-MG",
    zip: "38440-122",
    reference: "Próximo à UPA",
    mapsUrl: "https://share.google/rmwLATJguOMbqPA8Q",
    mapsEmbed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("ALEMI, R. Rodolfo Paixão, 879 - Centro, Araguari - MG") +
      "&z=17&output=embed",
  },

  // 0 = domingo ... 6 = sábado
  hours: [
    { days: [1, 2, 3, 4, 5], label: "Segunda a sexta", time: "8h às 18h30" },
    { days: [6], label: "Sábado", time: "8h30 às 13h30" },
    { days: [0], label: "Domingo", time: "Fechado" },
  ],

  google: {
    rating: "5,0",
    count: 98,
    url: "https://www.google.com/search?q=" + encodeURIComponent("Lorena Barbosa Psicóloga Psicotraumatologista Araguari"),
  },

  // Mude para false para ocultar a seção de avaliações do Google.
  showReviews: true,
};

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atendimento", label: "Atendimento" },
  { href: "#clinica", label: "Clínica" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export const experiences = [
  "Violência física, psicológica, sexual ou cibernética",
  "Acidentes",
  "Perdas",
  "Rejeições",
  "Negligência",
  "Abandono",
  "Bullying",
  "Relacionamentos abusivos",
  "Doenças graves",
  "Separações dolorosas",
  "Complicações na gestação, no parto ou no pós-parto",
];

// Avaliações públicas do perfil no Google, com o sobrenome abreviado.
export const reviews = [
  {
    name: "Nayara P.",
    text: "Excelente profissional, o atendimento e o carinho faz toda diferença, é mais que um atendimento, é uma forma de acolhimento.",
  },
  { name: "Hudson G.", text: "Nota 1.000 no atendimento! Excelência no conhecimento e super indico!" },
  { name: "Andhreia A.", text: "Excelente profissional. Muito dedicada e comprometida em ajudar." },
  { name: "Karol B.", text: "Local maravilhoso e profissional impecável." },
  { name: "Robson C.", text: "Atendimento perfeito, excelente profissional." },
];

// Publicações do Instagram destacadas no site.
export const posts = [
  {
    title: "Quando você se olha, o que enxerga?",
    excerpt: "Às vezes, você não enxerga quem é. Enxerga as marcas deixadas pelas experiências que viveu.",
    url: "https://www.instagram.com/psicologa.lorenabarbosa/p/DZVUh9aBgky/",
  },
  {
    title: "Por que ainda dói, se já passou?",
    excerpt: "",
    url: "https://www.instagram.com/psicologa.lorenabarbosa/reel/DW_shn9jYtQ/",
  },
  {
    title: "A forma como você se olha não surgiu do nada…",
    excerpt: "Esse olhar não nasceu com você. Não é o que te define: muitas vezes é o que você aprendeu a fazer para lidar com o que viveu.",
    url: "https://www.instagram.com/psicologa.lorenabarbosa/p/DXLCeNYDWC2/",
  },
];

export const faq = [
  {
    q: "Como é a primeira sessão?",
    a: [
      "Na nossa primeira sessão, o foco será te acolher e entender o que te trouxe até aqui. Será um espaço para você compartilhar suas preocupações, dores, expectativas e motivações em relação à terapia. Também aproveitarei para explicar como funciona o processo terapêutico, para que possamos alinhar juntos o caminho que será mais adequado para você.",
      "Por ser o nosso primeiro encontro, a sessão pode durar um pouco mais, para que possamos conversar com calma e explorar suas necessidades e objetivos de forma tranquila e cuidadosa.",
    ],
  },
  {
    q: "Atende online e presencialmente?",
    a: [
      "Sim. Os atendimentos são realizados presencialmente na Clínica Alemí, em Araguari-MG, e também de forma online, por meio de plataforma segura.",
      "O formato presencial oferece um ambiente acolhedor, reservado e voltado ao cuidado emocional. Já o atendimento online possibilita o acompanhamento em Araguari, região e em todo o Brasil, mantendo a mesma qualidade, ética e sigilo profissional, sendo uma alternativa prática para quem prefere ou necessita dessa modalidade.",
      "Em ambos os formatos, o objetivo é proporcionar um espaço seguro, acolhedor e respeitoso, onde você possa se sentir à vontade para iniciar ou dar continuidade ao seu processo terapêutico, independentemente de onde esteja.",
    ],
  },
  {
    q: "O que esperar do processo terapêutico?",
    a: [
      "Meu atendimento é ético e sigiloso, respeitando seu tempo e suas necessidades. Trabalho com a Abordagem Humanista Centrada na Pessoa, que valoriza o acolhimento, a escuta empática e o respeito à singularidade de cada indivíduo.",
      "Ofereço um espaço seguro e acolhedor, onde sua história é respeitada e cada passo acontece no seu próprio ritmo, com uma escuta sensível e um olhar humanizado para suas demandas emocionais.",
    ],
  },
  {
    q: "O que faz uma psicóloga psicotraumatologista?",
    a: [
      "Compreende e trata os impactos emocionais de experiências difíceis ou traumáticas. Essas vivências podem envolver violência física, psicológica, sexual ou cibernética; acidentes; perdas; rejeições; negligência; abandono; bullying; relacionamentos abusivos; doenças graves; separações dolorosas; complicações na gestação, no parto ou no pós-parto, entre outras situações marcantes.",
      "Muitas vezes, o trauma não está apenas em um grande acontecimento, mas em vivências que ultrapassaram a capacidade emocional da pessoa, deixando marcas profundas. Acolher o trauma é reconhecer que sobreviver foi o primeiro ato de coragem. Curar não é apagar o que aconteceu, é aprender a existir para além do que doeu.",
      "Você não está sozinho(a), estou aqui para caminhar com você nessa jornada.",
    ],
  },
  {
    q: "Terapia é para todas as pessoas?",
    a: [
      "Sim! O acompanhamento psicológico é para todas as pessoas que desejam se compreender melhor, fortalecer sua saúde mental e viver com mais autenticidade. Não é necessário estar em sofrimento intenso ou ter um diagnóstico para buscar esse cuidado. No entanto, o processo terapêutico exige envolvimento e dedicação para que os resultados sejam significativos.",
      "A psicoterapia é um espaço seguro, sem julgamentos, onde você pode se expressar livremente e encontrar novas formas de lidar com desafios.",
      "Cuidar da mente não é sinal de fraqueza, mas sim de coragem e compromisso consigo mesmo. O autoconhecimento, o autocuidado e o acolhimento emocional são valiosos para qualquer pessoa, em qualquer fase da vida.",
    ],
  },
  {
    q: "Quais são as formas de pagamento e pacotes disponíveis?",
    a: [
      "As formas de pagamento disponíveis são dinheiro, Pix, cartão de crédito e débito.",
      "O atendimento tem início com uma sessão individual, dedicada à escuta das demandas, à compreensão das necessidades e à definição, em conjunto, dos próximos passos do processo terapêutico.",
      "Após essa etapa inicial, caso haja o desejo de dar continuidade, podemos alinhar as possibilidades de acompanhamento, que incluem, se houver interesse, pacotes mensais e condições especiais voltadas à constância e ao aprofundamento do trabalho psicológico.",
      "Estou à disposição para esclarecer dúvidas e oferecer mais informações.",
    ],
  },
];
