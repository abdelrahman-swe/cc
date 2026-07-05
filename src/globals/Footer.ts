import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/payload/access";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "socialTitle",
      type: "text",
      localized: true,
      defaultValue: "تابعنا على وسائل التواصل",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Twitter / X", value: "twitter" },
            { label: "Snapchat", value: "snapchat" },
            { label: "TikTok", value: "tiktok" },
            { label: "Instagram", value: "instagram" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
      defaultValue: [
        { platform: "instagram", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "snapchat", url: "#" },
        { platform: "tiktok", url: "#" },
        { platform: "facebook", url: "#" },
      ],
    },
    {
      name: "locationTitle",
      type: "text",
      localized: true,
      defaultValue: "الموقع",
    },
    {
      name: "location",
      type: "text",
      localized: true,
      defaultValue: "الرياض، حي المهدية",
    },
    {
      name: "contactTitle",
      type: "text",
      localized: true,
      defaultValue: "تواصل معنا",
    },
    {
      name: "email",
      type: "email",
      defaultValue: "info@codeclouders.com",
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "0501479944",
    },
    {
      name: "linksTitle",
      type: "text",
      localized: true,
      defaultValue: "روابط سريعة",
    },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "url", type: "text", required: true },
      ],
      defaultValue: [
        { label: "الرئيسية", url: "/" },
        { label: "مشاريعنا", url: "/work" },
        { label: "خدماتنا", url: "/services" },
        { label: "لماذا حي المهدية", url: "#why-us" },
        { label: "تواصل معنا", url: "/contact" },
      ],
    },
    {
      name: "copyright",
      type: "text",
      localized: true,
      defaultValue: "جميع الحقوق محفوظة© 2026 - Code Clouders..",
    },
  ],
};
