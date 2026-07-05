import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero-block",
  labels: {
    singular: "Hero Block",
    plural: "Hero Blocks",
  },
  fields: [
    {
      name: "headline",
      label: "Main Headline Parts (Colored)",
      type: "group",
      localized: true,
      fields: [
        {
          name: "before",
          label: "Blue Text (Before)",
          type: "text",
          defaultValue: "شريكك التقني",
        },
        {
          name: "emphasis",
          label: "Orange Text (Emphasis)",
          type: "text",
          defaultValue: "لحلــــول رقميـــــة",
        },
        {
          name: "after",
          label: "Blue Text (After)",
          type: "text",
          defaultValue: "تدعم نمو أعمالك",
        },
      ],
    },
    {
      name: "subtitle",
      label: "Hero Subtitle",
      type: "textarea",
      localized: true,
      defaultValue:
        "نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.",
    },
    {
      name: "primaryCta",
      label: "Primary CTA Button",
      type: "group",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          defaultValue: "احصل على استشارة مجانية",
        },
        {
          name: "href",
          type: "text",
          defaultValue: "/contact",
        },
      ],
    },
    {
      name: "cards",
      label: "Hero Cards (3 Items)",
      type: "array",
      localized: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "title",
          label: "Card Title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Card Subtitle / Description",
          type: "textarea",
          required: true,
        },
        {
          name: "visual",
          label: "Card Visual Type",
          type: "select",
          defaultValue: "button",
          options: [
            { label: "Button Art (CTA Pill)", value: "button" },
            { label: "Process Art (Client Feedback)", value: "process" },
            { label: "Chart Art (Graph)", value: "chart" },
          ],
        },
      ],
      defaultValue: [
        {
          title: "نجعل الأمر أسهل",
          description: "من الفكرة إلى التنفيذ، بخطوات واضحة وعملية",
          visual: "button",
        },
        {
          title: "نستمع إليك لنفهم احتياجاتك",
          description: "فخورين بثقة أكثر من 250 مؤسسة ومنظمة",
          visual: "process",
        },
        {
          title: "نمنحك رؤية أوضح",
          description: "من خلال أدوات تساعدك على قياس النجاح",
          visual: "chart",
        },
      ],
    },
  ],
};
