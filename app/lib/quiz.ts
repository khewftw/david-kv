export const quizCopy = {
  eyebrow: "Калькулятор стоимости ремонта",
  title: "Рассчитайте стоимость ремонта за 2 минуты",
  subtitle:
    "Ответьте на 7 вопросов — и мы подготовим ориентировочный расчёт, сроки и персональное предложение под ваш объект.",
  badges: ["7 вопросов", "2 минуты", "4 подарка"],
  stepLabel: "Шаг",
  ofLabel: "из",
  timeHint: "Заполнение займёт меньше 2 минут",
  back: "Назад",
  next: "Далее",
  submit: "Получить расчёт и подарок",
  formTitle: "Осталось куда отправить расчёт",
  formSubtitle:
    "Подготовим ориентировочную стоимость ремонта, сроки и закрепим за вами выбранный подарок.",
  successTitle: "Спасибо! Заявка отправлена",
  successText:
    "Мы свяжемся с вами в ближайшее время и отправим расчёт стоимости ремонта вместе с выбранным подарком.",
  areaHint: "Перетащите ползунок или выберите готовый диапазон",
} as const;

export type QuizLayout = "image-cards" | "range" | "vertical-options" | "gift-options";

export type QuizOption = {
  id: string;
  title: string;
  hint?: string;
  icon: QuizIconName;
  image?: string;
};

export type QuizStep = {
  id: string;
  type: QuizLayout;
  question: string;
  options: QuizOption[];
};

export type QuizIconName =
  | "newbuild"
  | "secondary"
  | "house"
  | "commercial"
  | "design"
  | "capital"
  | "cosmetic"
  | "undecided"
  | "area-s"
  | "area-m"
  | "area-l"
  | "area-xl"
  | "project-full"
  | "project-part"
  | "project-none"
  | "project-consult"
  | "clock"
  | "calendar"
  | "keys"
  | "plan"
  | "gift"
  | "discount"
  | "materials"
  | "tile"
  | "telegram"
  | "max"
  | "phone"
  | "whatsapp";

export const AREA_MIN = 20;
export const AREA_MAX = 250;
export const AREA_STEP = 5;
export const AREA_DEFAULT = 75;

export const areaPresets = [
  { id: "s", title: "До 50 м²", value: 45 },
  { id: "m", title: "50–100 м²", value: 75 },
  { id: "l", title: "100–200 м²", value: 150 },
  { id: "xl", title: "Более 200 м²", value: 220 },
] as const;

export function formatArea(value: number) {
  if (value >= AREA_MAX) return `${AREA_MAX}+ м²`;
  return `${value} м²`;
}

export function areaPresetId(value: number) {
  if (value <= 50) return "s";
  if (value <= 100) return "m";
  if (value <= 200) return "l";
  return "xl";
}

export const quizSteps: QuizStep[] = [
  {
    id: "object",
    type: "image-cards",
    question: "Где вы планируете делать ремонт?",
    options: [
      {
        id: "newbuild",
        title: "Квартира в новостройке",
        hint: "Черновая или предчистовая отделка",
        icon: "newbuild",
        image: "/quiz/object-newbuild.png",
      },
      {
        id: "secondary",
        title: "Вторичное жильё",
        hint: "Нужно обновить уже жилую квартиру",
        icon: "secondary",
        image: "/quiz/object-secondary.png",
      },
      {
        id: "house",
        title: "Дом / коттедж",
        hint: "Частный дом или таунхаус",
        icon: "house",
        image: "/quiz/object-house.png",
      },
      {
        id: "commercial",
        title: "Коммерческое помещение",
        hint: "Офис, магазин или другое пространство",
        icon: "commercial",
        image: "/quiz/object-commercial.png",
      },
    ],
  },
  {
    id: "type",
    type: "image-cards",
    question: "Какой тип ремонта вас интересует?",
    options: [
      {
        id: "design",
        title: "Дизайнерский",
        hint: "Сложные узлы, свет и материалы",
        icon: "design",
        image: "/quiz/type-design.png",
      },
      {
        id: "capital",
        title: "Капитальный",
        hint: "Инженерия, отделка и сдача под ключ",
        icon: "capital",
        image: "/quiz/type-capital.png",
      },
      {
        id: "cosmetic",
        title: "Косметический",
        hint: "Обновление без полной переделки",
        icon: "cosmetic",
        image: "/quiz/type-cosmetic.png",
      },
      {
        id: "undecided",
        title: "Пока не определились / нужен совет",
        hint: "Поможем выбрать формат под бюджет",
        icon: "undecided",
        image: "/quiz/type-undecided.png",
      },
    ],
  },
  {
    id: "area",
    type: "range",
    question: "Какая площадь объекта?",
    options: areaPresets.map((preset) => ({
      id: preset.id,
      title: preset.title,
      icon: (`area-${preset.id === "s" ? "s" : preset.id === "m" ? "m" : preset.id === "l" ? "l" : "xl"}`) as QuizIconName,
    })),
  },
  {
    id: "project",
    type: "vertical-options",
    question: "Требуется ли дизайн-проект?",
    options: [
      {
        id: "full",
        title: "Да, нужен полный дизайн-проект",
        hint: "Планировка, материалы и визуализации",
        icon: "project-full",
      },
      {
        id: "part",
        title: "Нужна только планировка / частичная помощь",
        hint: "Чертежи и консультации без полного проекта",
        icon: "project-part",
      },
      {
        id: "none",
        title: "Нет, ремонт без дизайн-проекта",
        hint: "Работаем по согласованному объёму",
        icon: "project-none",
      },
      {
        id: "consult",
        title: "Нужна консультация, пока не решили",
        hint: "Разберём, что реально нужно на объекте",
        icon: "project-consult",
      },
    ],
  },
  {
    id: "timing",
    type: "vertical-options",
    question: "Когда планируете начать ремонт?",
    options: [
      {
        id: "asap",
        title: "Чем раньше, тем лучше",
        hint: "Можно стартовать сразу после замера",
        icon: "clock",
      },
      {
        id: "3m",
        title: "В ближайшие 3 месяца",
        hint: "Успеем подготовить смету и график",
        icon: "calendar",
      },
      {
        id: "6m",
        title: "В течение полугода",
        hint: "Спланируем загрузку и материалы заранее",
        icon: "plan",
      },
      {
        id: "keys",
        title: "Ещё не получили ключи / пока планируем",
        hint: "Посчитаем заранее, до старта работ",
        icon: "keys",
      },
    ],
  },
  {
    id: "gift",
    type: "gift-options",
    question: "Выберите подарок после расчёта",
    options: [
      {
        id: "project",
        title: "Бесплатный проект стоимостью до 400 000 ₽",
        hint: "Дизайн-проект закрепим после заявки",
        icon: "gift",
        image: "/quiz/gift-project.png",
      },
      {
        id: "repair15",
        title: "Скидка на комплексный ремонт до 15%",
        hint: "На работы под ключ",
        icon: "discount",
        image: "/quiz/gift-repair15.png",
      },
      {
        id: "rough10",
        title: "Скидка 10% на черновые материалы",
        hint: "На согласованный объём закупки",
        icon: "materials",
        image: "/quiz/gift-materials.png",
      },
      {
        id: "tile15",
        title: "Скидка 15% на плитку Kerama Marazzi",
        hint: "При заказе через нас",
        icon: "tile",
        image: "/quiz/gift-tile.png",
      },
    ],
  },
  {
    id: "contact",
    type: "vertical-options",
    question: "Куда отправить результат расчёта и выбранный подарок?",
    options: [
      { id: "telegram", title: "Telegram", hint: "Пришлём расчёт в мессенджер", icon: "telegram" },
      { id: "max", title: "Max", hint: "Напишем в Max", icon: "max" },
      { id: "whatsapp", title: "WhatsApp", hint: "Отправим расчёт в чат", icon: "whatsapp" },
      { id: "call", title: "Перезвонить", hint: "Свяжемся по телефону", icon: "phone" },
    ],
  },
];
