export type FAQItemData = {
  id: number;
  question: {
    fa: string;
    en: string;
  };
  answer: {
    fa: string;
    en: string;
  };
};

export const faqItems: FAQItemData[] = [
  {
    id: 1,
    question: {
      fa: "آتی صنعت در چه زمینه‌ای فعالیت می‌کند؟",
      en: "What does ATI Sanat specialize in?",
    },
    answer: {
      fa: "آتی صنعت در زمینه ماشین‌کاری دقیق، تولید قطعات صنعتی با تلرانس بالا و اجرای پروژه‌های تخصصی CNC فعالیت می‌کند.",
      en: "ATI Sanat specializes in precision machining, manufacturing high-tolerance industrial components, and specialized CNC projects.",
    },
  },
  {
    id: 2,
    question: {
      fa: "چه خدمات ماشین‌کاری CNC ارائه می‌دهید؟",
      en: "What CNC machining services do you provide?",
    },
    answer: {
      fa: "خدمات مجموعه شامل فرزکاری سه محور، سه و نیم محور، چهار محور CNC و تراشکاری CNC محور C برای تولید قطعات دقیق و پیچیده است.",
      en: "Our services include 3-axis, 3.5-axis and 4-axis CNC milling, along with C-axis CNC turning for precise and complex components.",
    },
  },
  {
    id: 3,
    question: {
      fa: "آیا امکان تولید قطعات با تلرانس‌های دقیق وجود دارد؟",
      en: "Can you manufacture components with tight tolerances?",
    },
    answer: {
      fa: "بله. تمرکز اصلی آتی صنعت بر تولید قطعات دقیق و حساس برای پروژه‌هایی است که کنترل ابعادی و تلرانس‌های سخت‌گیرانه اهمیت بالایی دارند.",
      en: "Yes. ATI Sanat focuses on precision components for projects where strict dimensional control and tight tolerances are essential.",
    },
  },
  {
    id: 4,
    question: {
      fa: "آتی صنعت با چه صنایعی همکاری می‌کند؟",
      en: "Which industries does ATI Sanat work with?",
    },
    answer: {
      fa: "زمینه‌های همکاری شامل صنایع نفت و گاز، خودرو، فولاد، انرژی و سایر مجموعه‌هایی است که به تولید قطعات دقیق و تخصصی نیاز دارند.",
      en: "We work with industries such as oil and gas, automotive, steel, energy, and other sectors requiring precise and specialized components.",
    },
  },
  {
    id: 5,
    question: {
      fa: "آیا قبل از شروع تولید نقشه فنی قطعه بررسی می‌شود؟",
      en: "Are technical drawings reviewed before production?",
    },
    answer: {
      fa: "بله. نقشه، مشخصات فنی، تلرانس‌ها و شرایط پروژه پیش از شروع تولید بررسی می‌شوند تا فرآیند ماشین‌کاری مناسب مشخص شود.",
      en: "Yes. Technical drawings, specifications, tolerances, and project requirements are reviewed before production to determine the appropriate machining process.",
    },
  },
  {
    id: 6,
    question: {
      fa: "چگونه می‌توان برای تولید یک قطعه استعلام قیمت گرفت؟",
      en: "How can I request a quotation for a component?",
    },
    answer: {
      fa: "برای دریافت استعلام می‌توانید نقشه، مشخصات فنی و تعداد موردنیاز قطعه را از طریق صفحه تماس با ما برای مجموعه ارسال کنید.",
      en: "To request a quotation, you can send the technical drawing, specifications, and required quantity through our Contact Us page.",
    },
  },
];
