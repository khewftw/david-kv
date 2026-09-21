export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  project: string;
  size: string;
};

export const galleryCopy = {
  eyebrow: "Реализованные интерьеры",
  title: [
    { text: "Ремонт заканчивается.", accent: false },
    { text: "Эстетика остаётся.", accent: true },
  ],
  subtitle:
    "Без рендеров и обещаний — показываем готовые интерьеры, детали и реальные объекты после сдачи.",
  allProjects: "Смотреть все проекты",
  allProjectsHref: "#projects",
} as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "headliner",
    src: "/cases/case2-living.jpeg",
    alt: "Дизайнерский интерьер после ремонта в ЖК Headliner",
    project: "ЖК Headliner",
    size: "91 м²",
  },
  {
    id: "scandinavia",
    src: "/cases/case3-living.jpeg",
    alt: "Квартира после ремонта под ключ в ЖК Скандинавия",
    project: "ЖК Скандинавия",
    size: "63 м²",
  },
  {
    id: "simvol",
    src: "/cases/case1-living.jpeg",
    alt: "Гостиная после капитального ремонта в ЖК Символ",
    project: "ЖК Символ",
    size: "74 м²",
  },
  {
    id: "paveletskaya",
    src: "/cases/renovated.jpeg",
    alt: "Современный интерьер после капитального ремонта в ЖК Павелецкая City",
    project: "ЖК Павелецкая City",
    size: "82 м²",
  },
  {
    id: "ostrov",
    src: "/cases/case3-apartment.jpeg",
    alt: "Просторная квартира после дизайнерского ремонта в ЖК Остров",
    project: "ЖК Остров",
    size: "108 м²",
  },
  {
    id: "kitchen",
    src: "/cases/case1-kitchen.jpeg",
    alt: "Кухня-гостиная после чистовой отделки",
    project: "ЖК Символ",
    size: "74 м²",
  },
  {
    id: "bedroom",
    src: "/cases/case2-bedroom.jpeg",
    alt: "Спальня после дизайнерского ремонта",
    project: "ЖК Headliner",
    size: "91 м²",
  },
  {
    id: "bathroom",
    src: "/cases/case3-bathroom.jpeg",
    alt: "Готовый санузел после чистовой отделки",
    project: "ЖК Скандинавия",
    size: "63 м²",
  },
];
