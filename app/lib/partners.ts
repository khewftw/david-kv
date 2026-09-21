export type PartnerItem = {
  id: string;
  name: string;
  src: string;
};

export const partnersCopy = {
  eyebrow: "Партнёры и поставщики",
  title: [
    { text: "Работаем с проверенными", accent: false },
    { text: "брендами и поставщиками", accent: true },
  ],
  subtitle:
    "Используем материалы, инженерные решения и комплектующие от брендов, которым доверяют в профессиональной строительной среде.",
  note: "И это только часть брендов, с которыми мы работаем на объектах.",
  cta: "Обсудить комплектацию",
  ctaHref: "#contacts",
} as const;

export const partners: PartnerItem[] = [
  { id: "knauf", name: "Knauf", src: "/partners/knauf.svg" },
  { id: "ceresit", name: "Ceresit", src: "/partners/ceresit.jpg" },
  { id: "tikkurila", name: "Tikkurila", src: "/partners/tikkurila.svg" },
  { id: "caparol", name: "Caparol", src: "/partners/caparol.jpg" },
  { id: "volma", name: "Волма", src: "/partners/volma.svg" },
  { id: "technonicol", name: "Технониколь", src: "/partners/technonicol.png" },
  { id: "grohe", name: "Grohe", src: "/partners/grohe.svg" },
  { id: "geberit", name: "Geberit", src: "/partners/geberit.svg" },
  { id: "rehau", name: "Rehau", src: "/partners/rehau.svg" },
  { id: "uponor", name: "Uponor", src: "/partners/uponor.svg" },
  { id: "valtec", name: "Valtec", src: "/partners/valtec.jpg" },
  { id: "bosch", name: "Bosch", src: "/partners/bosch.svg" },
  { id: "schneider", name: "Schneider Electric", src: "/partners/schneider-electric.svg" },
  { id: "legrand", name: "Legrand", src: "/partners/legrand.svg" },
  { id: "abb", name: "ABB", src: "/partners/abb.svg" },
];
