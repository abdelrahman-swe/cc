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
  const isRtl = currentLocale === "ar";

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
            className={cn("h-[22px] lg:h-[39px]", "w-auto", "cursor-pointer", "dark:hidden")}
          />
          <img
            src="/light/logo.svg"
            alt={brand || "Code Clouders"}
            width={160}
            height={39}
            className={cn("h-[22px] lg:h-[39px]", "w-auto", "cursor-pointer", "hidden dark:block")}
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

        {/* Mobile Controls (ThemeToggle, Burger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="!h-9 !w-9" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("flex size-9 items-center justify-center rounded-full border transition duration-200 active:scale-95", "border-border text-foreground")}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Sidebar & Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={cn(
                "fixed top-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-surface p-6 shadow-2xl flex flex-col gap-6 lg:hidden border-border",
                isRtl ? "right-0 border-l" : "left-0 border-r"
              )}
            >
              {/* Sidebar Header with Close & Title */}
              <div className="flex items-center justify-between w-full border-b pb-4 border-border/80">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition duration-200 active:scale-95 hover:bg-gray-100 dark:hover:bg-white/5"
                  aria-label="Close Menu"
                >
                  <X className="size-4.5" />
                </button>
                <span className="font-bold text-[18px] text-foreground">
                  {isRtl ? "القائمة" : "Menu"}
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 w-full overflow-y-auto pr-1">
                {navLinks.map(([label, href]) => {
                  const isHash = href.startsWith("#");
                  const isActive = href === "/"
                    ? pathname === "/"
                    : pathname === href || pathname.startsWith(href + "/");
                  const linkClass = cn(
                    'transition duration-200 leading-normal text-right py-3 px-4 w-full block hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl hover:text-[#F15722] dark:hover:text-[#F15722]',
                    isActive 
                      ? 'text-[#F15722] font-bold text-[18px] bg-gray-50 dark:bg-white/5' 
                      : 'text-[#414244] dark:text-white font-normal text-[16px]'
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
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
