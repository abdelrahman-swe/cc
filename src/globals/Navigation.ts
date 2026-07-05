import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "brand",
      type: "text",
      localized: true,
      defaultValue: "Code Clouders",
    },
    {
      name: "cta",
      type: "group",
      localized: true,
      fields: [
        { name: "label", type: "text", defaultValue: "طلب خدمة" },
        { name: "href", type: "text", defaultValue: "/contact" },
      ],
    },
    {
      name: "links",
      type: "array",
      localized: true,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", defaultValue: "#" },
      ],
      defaultValue: [
        { label: "الرئيسية", href: "/" },
        { label: "من نحن", href: "/about" },
        { label: "أعمالنا", href: "/featured-work" },
        { label: "الخدمات", href: "/services" },
        { label: "المدونة", href: "/blog" },
        { label: "تواصل معنا", href: "/contact" },
      ],
    },
  ],
};
