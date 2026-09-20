export const site = {
  name: "Преемство",
  phone: "+7 495 120 40 50",
  phoneHref: "tel:+74951204050",
  nav: [
    { href: "#services", label: "Услуги" },
    { href: "#projects", label: "Проекты" },
    { href: "#about", label: "О компании" },
    { href: "#faq", label: "Вопросы" },
    { href: "#contacts", label: "Контакты" },
  ],
  hero: {
    eyebrow: "От проекта до готовой квартиры",
    titleLine1: "Ремонт",
    titleLine2: "Квартир под",
    titleLine3: "Ключ",
    titleAccent: "в Москве",
    headline: ["Смета до начала работ.", "Контроль на каждом этапе."],
    description:
      "Берём на себя весь ремонт квартиры — от подготовки и инженерии до чистовой отделки и финальной приёмки.",
    location: "Москва и Московская область",
    casesLabel: "Посмотреть кейсы",
    casesHref: "#projects",
    cta: ["Рассчитать", "стоимость"],
    ctaHref: "#contacts",
  },
} as const;
