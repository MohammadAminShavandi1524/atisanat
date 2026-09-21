export type ChallengeLocale = "fa" | "en";

export interface MachiningChallengeSection {
  id: number;

  title: {
    fa: string;
    en: string;
  };

  description: {
    fa: string;
    en: string;
  };

  image?: string;
}

export interface MachiningChallenge {
  id: number;

  slug: string;

  image: string;

  readTime: number;

  category: {
    fa: string;
    en: string;
  };

  title: {
    fa: string;
    en: string;
  };

  description: {
    fa: string;
    en: string;
  };

  tags: {
    fa: string[];
    en: string[];
  };

  sections: MachiningChallengeSection[];
}

export const machiningChallenges: MachiningChallenge[] = [
  {
    id: 1,

    slug: "controlling-chatter-in-milling",

    image: "/home/machining-challenges/chatter.png",

    readTime: 6,

    category: {
      fa: "فرزکاری",
      en: "Milling",
    },

    title: {
      fa: "کنترل لرزش و Chatter در فرزکاری",
      en: "Controlling Chatter in Milling",
    },

    description: {
      fa: "لرزش در فرآیند فرزکاری می‌تواند کیفیت سطح، دقت ابعادی و عمر ابزار را کاهش دهد. انتخاب صحیح پارامترهای برش، ابزار و شرایط نگهداری قطعه نقش مهمی در کنترل این پدیده دارد.",
      en: "Machining vibration can reduce surface quality, dimensional accuracy, and tool life. Proper cutting parameters, tooling, and workholding play a major role in controlling chatter.",
    },

    tags: {
      fa: ["فرزکاری", "Chatter", "لرزش", "ابزار برشی"],
      en: ["Milling", "Chatter", "Vibration", "Cutting Tools"],
    },

    sections: [
      {
        id: 1,

        title: {
          fa: "Chatter چیست و چرا در فرزکاری ایجاد می‌شود؟",
          en: "What Is Chatter and Why Does It Occur in Milling?",
        },

        description: {
          fa: "Chatter نوعی لرزش ناپایدار و خودتحریک‌شونده در فرآیند ماشین‌کاری است که معمولاً میان ابزار، قطعه و ساختار ماشین ایجاد می‌شود. هنگامی که صلبیت سیستم کافی نباشد یا پارامترهای برش با شرایط واقعی فرآیند هماهنگ نباشند، ارتعاش ایجادشده می‌تواند در هر دور ابزار تشدید شود. نتیجه این شرایط معمولاً به شکل صدای غیرعادی، خطوط موج‌دار روی سطح قطعه و کاهش محسوس کیفیت ماشین‌کاری دیده می‌شود.",
          en: "Chatter is an unstable, self-excited vibration that develops between the cutting tool, workpiece, and machine structure. When system rigidity is insufficient or cutting parameters are not properly matched to actual machining conditions, vibration can amplify with each tool revolution. The result is often excessive noise, visible wave patterns on the machined surface, and a noticeable reduction in machining quality.",
        },
      },

      {
        id: 2,

        title: {
          fa: "تأثیر صلبیت ابزار و نگهداری قطعه",
          en: "The Role of Tool Rigidity and Workholding",
        },

        description: {
          fa: "یکی از مهم‌ترین عوامل کنترل Chatter افزایش صلبیت مجموعه ماشین‌کاری است. بیرون‌زدگی زیاد ابزار، فیکسچر نامناسب، قطعه‌ای با مهار ضعیف یا Tool Holder نامناسب می‌تواند دامنه لرزش را افزایش دهد. کاهش طول آزاد ابزار، استفاده از نگهدارنده مناسب و تثبیت صحیح قطعه باعث می‌شود نیروی برش با پایداری بیشتری به ساختار ماشین منتقل شود و احتمال ایجاد ارتعاش کاهش یابد.",
          en: "One of the most important factors in chatter control is increasing the rigidity of the machining system. Excessive tool overhang, inadequate fixtures, weak workpiece support, or an unsuitable tool holder can significantly increase vibration amplitude. Reducing unsupported tool length, selecting a rigid holder, and securing the workpiece correctly allow cutting forces to be transferred more consistently through the machine structure.",
        },
      },

      {
        id: 3,

        title: {
          fa: "تنظیم پارامترهای برش برای کاهش لرزش",
          en: "Optimizing Cutting Parameters to Reduce Vibration",
        },

        description: {
          fa: "سرعت اسپیندل، نرخ پیشروی، عمق برش و عرض درگیری ابزار مستقیماً بر رفتار دینامیکی فرآیند اثر دارند. کاهش یا افزایش کنترل‌شده سرعت دورانی می‌تواند سیستم را از محدوده فرکانسی ناپایدار خارج کند. همچنین کاهش عمق برش، تنظیم Feed مناسب و انتخاب ابزار با هندسه صحیح می‌تواند نیروی برش و تحریک ارتعاشی را کاهش دهد. هدف اصلی رسیدن به ترکیبی از پارامترهاست که هم نرخ تولید مناسب را حفظ کند و هم فرآیند را در محدوده پایدار نگه دارد.",
          en: "Spindle speed, feed rate, depth of cut, and radial engagement directly influence machining dynamics. A controlled increase or decrease in spindle speed can move the system away from an unstable frequency range. Reducing cutting depth, adjusting feed, and selecting the correct tool geometry can also lower cutting forces and vibration excitation. The goal is to find a parameter combination that maintains productivity while keeping the process within a stable operating region.",
        },
      },

      {
        id: 4,

        title: {
          fa: "نشانه‌های یک فرآیند فرزکاری پایدار",
          en: "Indicators of a Stable Milling Process",
        },

        description: {
          fa: "در یک فرآیند پایدار، صدای برش یکنواخت است، سطح قطعه الگوی موجی غیرعادی ندارد و سایش ابزار نیز قابل پیش‌بینی‌تر خواهد بود. کنترل Chatter علاوه بر بهبود کیفیت سطح، می‌تواند دقت ابعادی، طول عمر ابزار و قابلیت تکرار فرآیند تولید را افزایش دهد.",
          en: "In a stable milling process, cutting sound remains consistent, the machined surface is free from abnormal wave patterns, and tool wear becomes more predictable. Controlling chatter improves not only surface finish but also dimensional accuracy, tool life, and overall process repeatability.",
        },
      },
    ],
  },

  {
    id: 2,

    slug: "reducing-tool-wear-and-extending-tool-life",

    image: "/home/machining-challenges/tool-wear2.png",

    readTime: 7,

    category: {
      fa: "عمر ابزار",
      en: "Tool Life",
    },

    title: {
      fa: "کاهش سایش ابزار و افزایش عمر Tool",
      en: "Reducing Tool Wear and Extending Tool Life",
    },

    description: {
      fa: "کنترل سرعت برش، نرخ پیشروی، شرایط خنک‌کاری و انتخاب ابزار می‌تواند از سایش زودهنگام جلوگیری کرده، پایداری فرآیند ماشین‌کاری را بهبود دهد و عملکرد کلی ابزار را افزایش دهد.",
      en: "Controlling cutting speed, feed rate, cooling conditions, and tool selection can reduce premature wear, improve machining process stability, and enhance overall tool performance.",
    },

    tags: {
      fa: ["سایش ابزار", "Tool Life", "اینسرت", "پارامترهای برش"],
      en: ["Tool Wear", "Tool Life", "Insert", "Cutting Parameters"],
    },

    sections: [
      {
        id: 1,

        title: {
          fa: "سایش ابزار چگونه شکل می‌گیرد؟",
          en: "How Does Cutting Tool Wear Develop?",
        },

        description: {
          fa: "ابزار برشی هنگام ماشین‌کاری به طور هم‌زمان تحت فشار مکانیکی، حرارت و اصطکاک قرار دارد. تماس مداوم لبه برنده با قطعه و براده باعث می‌شود به مرور هندسه اولیه ابزار تغییر کند. مقداری از سایش در هر فرآیند ماشین‌کاری طبیعی است، اما زمانی که این سایش سریع یا غیرقابل کنترل شود، کیفیت قطعه، پایداری فرآیند و هزینه تولید تحت تأثیر قرار می‌گیرد.",
          en: "During machining, a cutting tool is simultaneously exposed to mechanical load, heat, and friction. Continuous contact between the cutting edge, workpiece, and chips gradually changes the original tool geometry. A certain level of wear is normal in any machining process, but rapid or uncontrolled wear can negatively affect component quality, process stability, and production cost.",
        },
      },

      {
        id: 2,

        title: {
          fa: "نقش سرعت برش و نرخ پیشروی",
          en: "The Effect of Cutting Speed and Feed Rate",
        },

        description: {
          fa: "افزایش بیش از حد سرعت برش معمولاً دمای ناحیه برش را افزایش داده و می‌تواند باعث تسریع سایش لبه ابزار شود. از طرف دیگر Feed بسیار کم ممکن است به جای برش مؤثر، اصطکاک بیشتری ایجاد کند. پارامترهای ماشین‌کاری باید بر اساس جنس قطعه، نوع ابزار، پوشش اینسرت و شرایط ماشین انتخاب شوند تا بار وارد بر لبه برنده در محدوده مناسبی باقی بماند.",
          en: "Excessive cutting speed typically increases temperature in the cutting zone and can accelerate edge wear. On the other hand, an excessively low feed rate may increase rubbing instead of producing an efficient cut. Machining parameters should be selected based on workpiece material, tool type, insert coating, and machine conditions so that loading on the cutting edge remains within an appropriate range.",
        },
      },

      {
        id: 3,

        title: {
          fa: "خنک‌کاری و کنترل حرارت",
          en: "Cooling and Thermal Control",
        },

        description: {
          fa: "حرارت یکی از عوامل اصلی کاهش عمر ابزار است. استفاده صحیح از سیال خنک‌کننده می‌تواند دمای منطقه برش را کنترل کرده، خروج براده را بهبود دهد و اصطکاک میان ابزار و قطعه را کاهش دهد. با این حال روش خنک‌کاری باید با نوع عملیات و جنس ابزار هماهنگ باشد؛ زیرا خنک‌کاری نامناسب یا متناوب در برخی شرایط می‌تواند تنش حرارتی ایجاد کند.",
          en: "Heat is one of the main factors that reduces cutting tool life. Correct coolant application can control cutting-zone temperature, improve chip evacuation, and reduce friction between the tool and workpiece. However, the cooling method must match the machining operation and tool material, since unsuitable or intermittent cooling can introduce thermal stress under certain conditions.",
        },
      },

      {
        id: 4,

        title: {
          fa: "انتخاب ابزار و بررسی الگوی سایش",
          en: "Tool Selection and Wear Pattern Monitoring",
        },

        description: {
          fa: "هندسه ابزار، گرید اینسرت و نوع پوشش باید متناسب با جنس قطعه و شرایط برش انتخاب شود. بررسی دوره‌ای لبه ابزار نیز اطلاعات مهمی درباره وضعیت فرآیند ارائه می‌دهد. سایش یکنواخت Flank معمولاً قابل مدیریت است، اما لب‌پریدگی، شکست ناگهانی یا سایش موضعی می‌تواند نشان‌دهنده انتخاب نامناسب پارامتر، لرزش، خنک‌کاری ضعیف یا شرایط نامناسب نگهداری قطعه باشد.",
          en: "Tool geometry, insert grade, and coating should be selected according to workpiece material and cutting conditions. Regular inspection of the cutting edge also provides valuable information about process health. Uniform flank wear is generally manageable, while chipping, sudden fracture, or localized wear may indicate unsuitable parameters, vibration, poor coolant application, or inadequate workholding.",
        },
      },

      {
        id: 5,

        title: {
          fa: "افزایش عمر ابزار بدون کاهش بهره‌وری",
          en: "Extending Tool Life Without Sacrificing Productivity",
        },

        description: {
          fa: "هدف افزایش عمر ابزار صرفاً کاهش سرعت ماشین‌کاری نیست. یک فرآیند بهینه باید میان سرعت تولید، کیفیت قطعه و عمر ابزار تعادل برقرار کند. ثبت عمر واقعی ابزار، بررسی الگوی سایش و اصلاح تدریجی پارامترهای برش می‌تواند به ایجاد یک فرآیند پایدار و اقتصادی منجر شود.",
          en: "Extending tool life does not simply mean reducing machining speed. An optimized process must balance production rate, part quality, and tool durability. Tracking actual tool life, inspecting wear patterns, and progressively refining cutting parameters can help establish a stable and cost-effective machining process.",
        },
      },
    ],
  },

  {
    id: 3,

    slug: "improving-surface-finish-and-tolerance-control",

    image: "/home/machining-challenges/surface-finish.png",

    readTime: 6,

    category: {
      fa: "کیفیت سطح",
      en: "Surface Finish",
    },

    title: {
      fa: "بهبود کیفیت سطح و کنترل تلرانس",
      en: "Improving Surface Finish and Tolerance Control",
    },

    description: {
      fa: "دستیابی به سطح دقیق و تلرانس کنترل‌شده نیازمند هماهنگی میان ماشین، ابزار، پارامترهای برش و روش صحیح نگهداری و تثبیت قطعه در طول فرآیند است.",
      en: "Achieving a precise surface and controlled tolerance requires coordination between the machine, cutting tool, machining parameters, and proper workholding.",
    },

    tags: {
      fa: ["کیفیت سطح", "تلرانس", "دقت ابعادی", "ماشین‌کاری دقیق"],
      en: [
        "Surface Finish",
        "Tolerance",
        "Dimensional Accuracy",
        "Precision Machining",
      ],
    },

    sections: [
      {
        id: 1,

        title: {
          fa: "کیفیت سطح فقط به ابزار وابسته نیست",
          en: "Surface Finish Depends on More Than the Cutting Tool",
        },

        description: {
          fa: "کیفیت نهایی سطح نتیجه عملکرد هم‌زمان ماشین، ابزار، قطعه، فیکسچر و پارامترهای برش است. حتی یک ابزار سالم و باکیفیت نیز در صورت وجود لرزش، Runout، فیکسچر نامناسب یا تنظیم اشتباه پارامترهای ماشین‌کاری نمی‌تواند سطح مطلوبی ایجاد کند. به همین دلیل بررسی کیفیت سطح باید با نگاه به کل سیستم ماشین‌کاری انجام شود.",
          en: "Final surface quality is the result of the combined performance of the machine, cutting tool, workpiece, fixture, and machining parameters. Even a high-quality tool cannot produce an acceptable finish when vibration, runout, inadequate workholding, or incorrect parameters are present. Surface finish should therefore be evaluated as a property of the complete machining system.",
        },
      },

      {
        id: 2,

        title: {
          fa: "پارامترهای برش و اثر آن‌ها بر سطح",
          en: "How Cutting Parameters Affect Surface Quality",
        },

        description: {
          fa: "Feed Rate یکی از مهم‌ترین عوامل مؤثر بر زبری سطح است. افزایش بیش از حد نرخ پیشروی می‌تواند رد ابزار را روی سطح افزایش دهد، در حالی که Feed بسیار پایین نیز همیشه به معنی سطح بهتر نیست و ممکن است اصطکاک و حرارت را افزایش دهد. سرعت برش، عمق برش و هندسه ابزار نیز باید به صورت هماهنگ تنظیم شوند تا کیفیت سطح مناسب بدون کاهش غیرضروری نرخ تولید حاصل شود.",
          en: "Feed rate is one of the most influential factors affecting surface roughness. Excessive feed can increase visible tool marks, while an extremely low feed does not always improve finish and may increase rubbing and heat. Cutting speed, depth of cut, and tool geometry must also be coordinated to achieve the desired surface quality without unnecessarily reducing productivity.",
        },
      },

      {
        id: 3,

        title: {
          fa: "کنترل تلرانس در طول فرآیند",
          en: "Maintaining Tolerance Throughout the Process",
        },

        description: {
          fa: "کنترل تلرانس فقط با اندازه‌گیری نهایی قطعه انجام نمی‌شود. تغییرات حرارتی ماشین و قطعه، سایش ابزار، Runout، تغییر نیروی برش و حتی نحوه مهار قطعه می‌توانند در طول فرآیند روی ابعاد اثر بگذارند. برای قطعات حساس باید اندازه‌گیری و اصلاح فرآیند در مراحل مناسب انجام شود تا انحراف ابعادی پیش از خروج از محدوده مجاز شناسایی شود.",
          en: "Tolerance control is not limited to final part inspection. Thermal variation in the machine and workpiece, tool wear, runout, changing cutting forces, and workholding conditions can all influence dimensions during machining. For critical components, measurement and process correction should be performed at appropriate stages so that dimensional drift is detected before exceeding the permitted tolerance.",
        },
      },

      {
        id: 4,

        title: {
          fa: "اهمیت فیکسچر و تثبیت صحیح قطعه",
          en: "The Importance of Proper Workholding",
        },

        description: {
          fa: "اعمال نیروی بیش از حد توسط فیکسچر ممکن است قطعه را هنگام ماشین‌کاری تغییر شکل دهد و پس از آزاد شدن، ابعاد نهایی از محدوده موردنظر خارج شود. از طرف دیگر مهار ناکافی می‌تواند باعث جابه‌جایی یا لرزش شود. فیکسچر باید قطعه را با حداقل تغییر شکل و در عین حال با صلبیت کافی نگه دارد.",
          en: "Excessive clamping force can deform a workpiece during machining and cause final dimensions to shift after the part is released. Inadequate clamping, on the other hand, can allow movement or vibration. Workholding should provide sufficient rigidity while introducing the minimum possible deformation.",
        },
      },

      {
        id: 5,

        title: {
          fa: "پایداری فرآیند؛ کلید تکرارپذیری",
          en: "Process Stability as the Key to Repeatability",
        },

        description: {
          fa: "در تولید دقیق، رسیدن یک‌باره به ابعاد صحیح کافی نیست. فرآیند باید بتواند همان کیفیت سطح و دقت ابعادی را برای قطعات بعدی نیز تکرار کند. کنترل شرایط ابزار، پارامترها، خنک‌کاری و اندازه‌گیری مستمر باعث می‌شود تغییرات فرآیند کاهش یافته و قابلیت تکرار تولید افزایش یابد.",
          en: "In precision manufacturing, achieving the correct dimensions once is not enough. The process must reproduce the same surface quality and dimensional accuracy across subsequent parts. Controlling tooling conditions, parameters, coolant application, and measurement practices helps reduce process variation and improve production repeatability.",
        },
      },
    ],
  },
];

export const getMachiningChallengeBySlug = (slug: string) =>
  machiningChallenges.find((challenge) => challenge.slug === slug);

export const getRelatedMachiningChallenges = (slug: string, limit = 2) =>
  machiningChallenges
    .filter((challenge) => challenge.slug !== slug)
    .slice(0, limit);
