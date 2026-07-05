import type { Block } from "payload";

export const AboutHeroBlock: Block = {
  slug: "about-hero-block",
  labels: {
    singular: "About Hero Block",
    plural: "About Hero Blocks",
  },
  fields: [
    {
      name: "sectionTag",
      type: "text",
      localized: true,
      defaultValue: "عن كود",
    },
    {
      name: "title",
      type: "text",
      localized: true,
      defaultValue: "رحلة بدأت بفكرة... وتستمر بصناعة حلول رقمية ناجحة",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      defaultValue:
        "نؤمن أن التقنية ليست مجرد أدوات، بل وسيلة لخلق قيمة حقيقية. لذلك نطور حلولًا رقمية تساعد الشركات على النمو، وتحسين الكفاءة، وتقديم تجارب استثنائية لعملائها.",
    },
    {
      name: "cta",
      type: "group",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          defaultValue: "احصل علي استشارة مجانية",
        },
        {
          name: "href",
          type: "text",
          defaultValue: "/contact",
        },
      ],
    },
  ],
};
