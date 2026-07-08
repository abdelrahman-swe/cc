"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/routing";

const defaultNavLinks = [
  ["الرئيسية", "/"],
  ["من نحن", "/about"],
  ["أعمالنا", "/featured-work"],
  ["الخدمات", "/services"],
  ["المدونة", "/blog"],
  ["تواصل معنا", "/contact"],
] as const;

type NavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brand?: string;
  links?: NavLink[];
  cta?: { label?: string; href?: string };
};

export function Header({ brand, links, cta }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as string) || "ar";

  const switchLocale = (newLocale: string) => {
    if (currentLocale && pathname.startsWith(`/${currentLocale}`)) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    } else {
      router.push(`/${newLocale}`);
    }
  };

  const navLinks =
    links && links.length > 0
      ? links.map((l) => [l.label, l.href] as const)
      : defaultNavLinks;

  const ctaLabel = cta?.label || "طلب خدمة";
  const ctaHref = cta?.href || "/contact";

  return (
    <header className={cn("h-[72px] lg:h-[100px]", "bg-surface", "relative", "transition-colors", "duration-300")}>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "mx-auto",
          "flex",
          "h-full",
          "max-w-[1240px]",
          "items-center",
          "justify-between",
          "px-4 sm:px-5",
          "lg:px-0",
        )}
      >
        <Link href="/">
          <img
            src="/dark/logo.svg"
            alt={brand || "Code Clouders"}
            width={160}
            height={39}
            className={cn("h-[30px] lg:h-[39px]", "w-auto", "cursor-pointer", "dark:hidden")}
          />
          <img
            src="/light/logo.svg"
            alt={brand || "Code Clouders"}
            width={160}
            height={39}
            className={cn("h-[30px] lg:h-[39px]", "w-auto", "cursor-pointer", "hidden dark:block")}
          />
        </Link>
        <div
          className={cn(
            "hidden",
            "flex-1",
            "items-center",
            "justify-center",
            "gap-8",
            "xl:gap-10",
            "lg:flex",
          )}
        >
          {navLinks.map(([label, href]) => {
            const isHash = href.startsWith("#");
            const isActive = href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
            const linkClass = cn(
              'transition duration-200 leading-normal hover:text-[#F15722] dark:hover:text-[#F15722]',
              isActive 
                ? 'text-[#F15722] font-bold text-[20px]' 
                : 'text-[#414244] dark:text-white font-normal text-[18px]'
            );
            return isHash ? (
              <a
                key={label}
                href={href}
                className={linkClass}
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className={linkClass}
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
        
        {/* Desktop Controls */}
        <div className={cn('hidden', 'lg:flex', 'items-center', 'gap-4')}>
          <ThemeToggle />
          <PillButton href={ctaHref} variant="nav">
            {ctaLabel}
          </PillButton>
        </div>

        {/* Mobile Controls (CTA, ThemeToggle, Burger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="!h-9 !w-9" />
          <PillButton
            href={ctaHref}
            variant="nav"
            size="sm"
          >
            {ctaLabel}
          </PillButton>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("flex size-9 items-center justify-center rounded-full border transition duration-200 active:scale-95", "border-border text-foreground")}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn("absolute inset-x-0 top-[72px] lg:top-[100px] z-50 flex flex-col items-center gap-6 border-b px-6 py-8 shadow-lg lg:hidden", "border-border bg-surface")}
          >
            <div className={cn('flex', 'flex-col', 'items-center', 'gap-4', 'w-full')}>
              {navLinks.map(([label, href]) => {
                const isHash = href.startsWith("#");
                const isActive = href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(href + "/");
                const linkClass = cn(
                  'transition duration-200 leading-normal text-center py-2 w-full block hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl hover:text-[#F15722] dark:hover:text-[#F15722]',
                  isActive 
                    ? 'text-[#F15722] font-bold text-[20px]' 
                    : 'text-[#414244] dark:text-white font-normal text-[18px]'
                );
                return isHash ? (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                    style={{
                      fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                    style={{
                      fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
