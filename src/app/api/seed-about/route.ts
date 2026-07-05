import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    // Check if About page already exists
    const res = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "about" },
      },
      depth: 0,
      limit: 1,
    });

    const aboutPageExists = res.docs && res.docs.length > 0;
    const pageId = aboutPageExists ? res.docs[0].id : null;

    // Block content for Arabic
    const arLayout = [
      {
        blockType: "about-hero-block",
        sectionTag: "عن كود",
        title: "رحلة بدأت بفكرة... وتستمر بصناعة حلول رقمية ناجحة",
        description:
          "نؤمن أن التقنية ليست مجرد أدوات، بل وسيلة لخلق قيمة حقيقية. لذلك نطور حلولًا رقمية تساعد الشركات على النمو، وتحسين الكفاءة، وتقديم تجارب استثنائية لعملائها.",
        cta: {
          label: "احصل علي استشارة مجانية",
          href: "/contact",
        },
      },
      {
        blockType: "about-story-block",
        sectionTag: "قصتنا",
        title: "رحلة بدأت بالشغف... وتستمر بالابتكار",
        description:
          "منذ عام 2017، نساعد الشركات على قيادة التحول الرقمي من خلال حلول برمجية تجمع بين الابتكار، الجودة، وسهولة الاستخدام.\n\nنبدأ بفهم احتياجات أعمالك، ثم نحولها إلى أنظمة رقمية آمنة، مرنة، وقابلة للتوسع، تدعم نموك وتواكب تطلعاتك المستقبلية.\n\nفي كود، لسنا مجرد شركة تطوير برمجيات، بل شريك تقني يعمل معك لبناء حلول تحقق قيمة حقيقية وتساعد أعمالك على النجاح.",
      },
      {
        blockType: "about-values-block",
        cards: [
          {
            title: "رؤيتنا",
            description:
              "أن نكون المرجع الأول للحلول البرمجية الذكية في المنطقة، ونقود شركاءنا نحو مستقبل رقمي يتسم بالابتكار والاستدامة",
            bgType: "navy",
            icon: "eye",
          },
          {
            title: "رسالتنا",
            description:
              "نوظف أحدث تقنيات البرمجيات والذكاء الاصطناعي لتقديم حلول مخصصة تجمع بين الجودة، الأمان، والمرونة",
            bgType: "lavender",
            icon: "target",
          },
          {
            title: "ما نقدمه",
            description:
              "نطور حلولاً رقمية ذكية تساعد الشركات على رفع الكفاءة، واتخاذ قرارات أفضل، وتحقيق نمو مستدام",
            bgType: "light-orange",
            icon: "layer",
          },
          {
            title: "ما يميزنا",
            description:
              "شريكك في التحول الرقمي • حلول رقمية ذكية • أنظمة قابلة للتوسع • خبرات تقنية متخصصة",
            bgType: "orange",
            icon: "medal",
          },
        ],
      },
      {
        blockType: "solutions-block",
        sectionTag: "ماذا نقدم",
        title: "حلول متكاملة مصممة خصيصًا لاحتياجات أعمالك",
        items: [
          { name: "تصميم المنتجات وتجربة المستخدم" },
          { name: "هندسة البرمجيات والذكاء الإصطناعي" },
          { name: "التحول الرقمي والذكاء الاصطناعي" },
          { name: "تعهيد الكفاءات والفرق التقنية" },
          { name: "بناء منتجات SaaS" },
        ],
      },
      {
        blockType: "sectors-block",
        sectionTag: "المجالات",
        title: "خبراتنا في قطاعات متنوعة",
        sectors: [
          { name: "الرعاية الصحية" },
          { name: "القطاع الحكومي" },
          { name: "التجزئة والتجارة الإلكترونية" },
          { name: "الخدمات المالية" },
          { name: "العقارات" },
          { name: "الخدمات اللوجستية" },
        ],
      },
    ];

    // Block content for English
    const enLayout = [
      {
        blockType: "about-hero-block",
        sectionTag: "About Code",
        title:
          "A journey that started with an idea... and continues with building successful digital solutions",
        description:
          "We believe technology is not just tools, but a way to create real value. Therefore, we develop digital solutions that help companies grow, improve efficiency, and deliver exceptional experiences to their clients.",
        cta: {
          label: "Get Free Consultation",
          href: "/contact",
        },
      },
      {
        blockType: "about-story-block",
        sectionTag: "Our Story",
        title:
          "A journey that started with passion... and continues with innovation",
        description:
          "Since 2017, we help companies lead digital transformation through software solutions combining innovation, quality, and ease of use.\n\nWe start by understanding your business needs, then transform them into secure, flexible, and scalable digital systems that support your growth.\n\nAt Code, we are not just a software development company, but a tech partner that works with you to build solutions that achieve real value.",
      },
      {
        blockType: "about-values-block",
        cards: [
          {
            title: "Our Vision",
            description:
              "To be the primary reference for intelligent software solutions in the region, leading our partners towards an innovative and sustainable digital future.",
            bgType: "navy",
            icon: "eye",
          },
          {
            title: "Our Mission",
            description:
              "We deploy the latest software and AI technologies to deliver custom solutions combining quality, security, and flexibility.",
            bgType: "lavender",
            icon: "target",
          },
          {
            title: "What We Offer",
            description:
              "We develop intelligent digital solutions that help companies improve efficiency, make better decisions, and achieve sustainable growth.",
            bgType: "light-orange",
            icon: "layer",
          },
          {
            title: "What Distinguishes Us",
            description:
              "Your digital transformation partner · Intelligent digital solutions · Scalable systems · Specialized technical expertise",
            bgType: "orange",
            icon: "medal",
          },
        ],
      },
      {
        blockType: "solutions-block",
        sectionTag: "What We Offer",
        title: "Integrated solutions custom-designed for your business needs",
        items: [
          { name: "Product Design & User Experience" },
          { name: "Software Engineering & AI Development" },
          { name: "Digital Transformation Consulting" },
          { name: "Technical Outsourcing & Dedicated Teams" },
          { name: "SaaS Product Construction" },
        ],
      },
      {
        blockType: "sectors-block",
        sectionTag: "Sectors",
        title: "Our expertise in diverse sectors",
        sectors: [
          { name: "Healthcare" },
          { name: "Government Sector" },
          { name: "Retail & E-commerce" },
          { name: "Financial Services" },
          { name: "Real Estate" },
          { name: "Logistics & Supply Chain" },
        ],
      },
    ];

    const arData: any = {
      title: "عن الشركة",
      slug: "about",
      layout: arLayout,
      seo: {
        metaTitle: "من نحن - كود كلاودرز",
        metaDescription:
          "تعرف على شركة كود كلاودرز، رسالتنا ورؤيتنا وقصتنا والقطاعات التي نقدم خدماتنا البرمجية والسحابية فيها.",
      },
    };

    const enData: any = {
      title: "About Us",
      slug: "about",
      layout: enLayout,
      seo: {
        metaTitle: "About Us - CodeClouders",
        metaDescription:
          "Learn about Code Clouders, our mission, vision, story, and the industries we serve with our software and cloud solutions.",
      },
    };

    // Seed navigation global
    await payload.updateGlobal({
      slug: "navigation",
      locale: "ar",
      data: {
        brand: "Code Clouders",
        cta: {
          label: "طلب خدمة",
          href: "/contact",
        },
        links: [
          { label: "الرئيسية", href: "/" },
          { label: "من نحن", href: "/about" },
          { label: "أعمالنا", href: "/featured-work" },
          { label: "الخدمات", href: "/services" },
          { label: "المدونة", href: "/blog" },
          { label: "تواصل معنا", href: "/contact" },
        ],
      },
    });

    await payload.updateGlobal({
      slug: "navigation",
      locale: "en",
      data: {
        brand: "Code Clouders",
        cta: {
          label: "Request Service",
          href: "/contact",
        },
        links: [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Work", href: "/featured-work" },
          { label: "Services", href: "/services" },
          { label: "Blog", href: "/blog" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    });

    if (aboutPageExists && pageId) {
      // Update Arabic
      await payload.update({
        collection: "pages",
        id: pageId,
        locale: "ar",
        data: arData,
      });

      // Update English
      await payload.update({
        collection: "pages",
        id: pageId,
        locale: "en",
        data: enData,
      });

      return NextResponse.json({
        success: true,
        message:
          "About page successfully updated in the database for both Arabic and English locales.",
        pageId,
      });
    } else {
      // Create in Arabic
      const page = await payload.create({
        collection: "pages",
        locale: "ar",
        data: arData,
      });

      // Update in English
      await payload.update({
        collection: "pages",
        id: page.id,
        locale: "en",
        data: enData,
      });

      return NextResponse.json({
        success: true,
        message:
          "About page successfully created in the database for both Arabic and English locales.",
        pageId: page.id,
      });
    }
  } catch (error: any) {
    console.error("Error seeding About page:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || String(error),
      },
      { status: 500 },
    );
  }
}
