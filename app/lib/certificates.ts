export type CertificateItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export const certificatesCopy = {
  eyebrow: "Документы и гарантии",
  title: [
    { text: "Подтверждаем качество", accent: false },
    { text: "не словами, а документами", accent: true },
  ],
  subtitle:
    "Показываем сертификаты и подтверждающие документы, которые отражают системный подход к качеству работ и используемым материалам.",
} as const;

const image = "/certificates/certificate-1.jpg";

export const certificates: CertificateItem[] = [
  {
    id: "compliance",
    title: "Сертификат соответствия",
    caption: "Система менеджмента качества",
    image,
  },
  {
    id: "standards",
    title: "Подтверждение стандартов качества",
    caption: "Контроль процессов на объекте",
    image,
  },
  {
    id: "materials",
    title: "Документ о соответствии материалов",
    caption: "Проверенные поставки и комплектация",
    image,
  },
  {
    id: "quality",
    title: "Сертификат качества",
    caption: "Приёмка скрытых и чистовых работ",
    image,
  },
  {
    id: "warranty",
    title: "Гарантийное обязательство",
    caption: "Ответственность по договору",
    image,
  },
  {
    id: "safety",
    title: "Подтверждение безопасных работ",
    caption: "Инженерия и электромонтаж",
    image,
  },
];
