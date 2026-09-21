import { site } from "@/app/lib/site";

export const finalCopy = {
  eyebrow: "Финальный шаг",
  title: [
    { text: "Обсудим ваш ремонт", accent: false },
    { text: "и подберём оптимальное решение", accent: true },
  ],
  subtitle:
    "Расскажите, какой ремонт вам нужен — подскажем по формату работ, срокам и следующему шагу.",
  subtitleNote: "Оставьте заявку — свяжемся и обсудим задачу.",
  formLead: "Позвоните нам по номеру телефона или заполните короткую форму",
  phoneDisplay: "+7 (495) 120-40-50",
  phoneHref: site.phoneHref,
  nameLabel: "Имя",
  namePlaceholder: "Как к вам обращаться",
  phoneFieldLabel: "Телефон",
  phonePlaceholder: "+7 (900) 000-00-00",
  policy: "политикой в отношении обработки персональных данных",
  consent: "согласие на обработку персональных данных",
  submit: "Отправить заявку",
  successTitle: "Заявка отправлена",
  successText: "Мы свяжемся с вами в ближайшее время, уточним задачу и подскажем следующий шаг.",
} as const;

export const footerCopy = {
  about:
    "Ремонт квартир под ключ в Москве с вниманием к деталям, понятным процессом и контролем качества на каждом этапе.",
  copyright: "© 2026 Преемство",
  menuTitle: "Меню",
  contactsTitle: "Контакты",
  socialTitle: "Связаться",
  socialNote: "Ответим на вопросы, подскажем по формату ремонта и следующему шагу.",
  email: "info@preemstvo.ru",
  emailHref: "mailto:info@preemstvo.ru",
  office: "Адрес офиса: Москва",
  region: "Москва и Московская область",
  telegramHref: "https://t.me/preemstvo",
  whatsappHref: "https://wa.me/74951204050",
  developer: "Разработка сайта",
  toTop: "Наверх",
  legal: [
    { href: "#policy", id: "policy", label: "Политика конфиденциальности" },
    { href: "#consent", id: "consent", label: "Согласие на обработку персональных данных" },
  ],
} as const;
