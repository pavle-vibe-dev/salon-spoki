"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Navigation items (from original-src/data.js, adapted to multi-page routes) ── */
const navLinks = [
  { name: "Početna",    href: "/" },
  { name: "Usluge",     href: "/usluge" },
  { name: "Zakazivanje", href: "/zakazivanje" },
  { name: "Kontakt",    href: "/kontakt" },
];

/* ── Fade-down entrance (premium framer-motion nav animation) ── */
const headerVariants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const navStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const navItemVariant = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="w-full sticky top-0 z-50 bg-white shadow-md"
    >
      {/* ════════════════════════════════════════════
          MAIN NAV ROW  (max-w-[1240px], h-[90px])
      ════════════════════════════════════════════ */}
      <div className="max-w-[1240px] mx-auto h-[90px] flex items-center justify-between px-5">

        {/* ─── LEFT: Logo ─── */}
        <Link href="/" className="flex items-center shrink-0 select-none">
          <Image
            src="/images/logo.png"
            alt="Spoki logo"
            width={350}
            height={140}
            priority
            unoptimized
            className="object-contain"
            style={{ height: 140, width: "auto" }}
          />
        </Link>

        {/* ─── CENTER: Desktop Nav Links ─── */}
        <motion.nav
          variants={navStagger}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center gap-x-2"
          aria-label="Primarna navigacija"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div key={link.href} variants={navItemVariant}>
                <Link
                  href={link.href}
                  className={[
                    "relative px-4 py-2 rounded-full text-[15px] font-medium capitalize",
                    "transition-colors duration-200 select-none",
                    isActive
                      ? "text-white bg-[#ff4917]"
                      : "text-[#4b5264] hover:text-[#ff4917]",
                  ].join(" ")}
                >
                  {link.name}

                  {/* Slim underline indicator on hover (non-active) */}
                  {!isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ff4917] rounded-full transition-all duration-300 group-hover:w-4/5"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* ─── RIGHT: Phone + Hours ─── */}
        <motion.div
          className="hidden lg:flex items-center gap-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.45, duration: 0.4, ease: "easeOut" as const } }}
        >
          {/* Phone SVG icon from original-src */}
          <Image
            src="/images/phone.svg"
            alt="Telefon"
            width={34}
            height={34}
          />

          {/* Number + hours stacked */}
          <div className="leading-tight">
            <p
              className="text-[16px] font-semibold"
              style={{ color: "#000958" }}
            >
              067 766 17 03
            </p>
            <p
              className="text-[12px] font-medium"
              style={{ color: "#4b5264" }}
            >
              Pon – Sub: 09:00 – 19:00
            </p>
          </div>
        </motion.div>

        {/* ─── Mobile hamburger ─── */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Otvori meni"
          aria-expanded={mobileOpen}
        >
          <span
            className="block h-[2px] w-full rounded-full transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#000958",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[2px] w-full rounded-full transition-all duration-300"
            style={{
              backgroundColor: "#000958",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[2px] w-full rounded-full transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#000958",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE DROPDOWN MENU
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="lg:hidden overflow-hidden border-t"
            style={{ borderColor: "#f0f0f0" }}
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "px-4 py-3 rounded-xl text-[15px] font-medium capitalize transition-colors",
                      isActive
                        ? "text-white bg-[#ff4917]"
                        : "text-[#4b5264] hover:text-[#ff4917] hover:bg-orange-50",
                    ].join(" ")}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Phone row in mobile menu */}
              <div className="flex items-center gap-3 mt-3 px-4 py-3 rounded-xl bg-gray-50">
                <Image
                  src="/images/phone.svg"
                  alt="Telefon"
                  width={28}
                  height={28}
                />
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: "#000958" }}>
                    067 766 17 03
                  </p>
                  <p className="text-[12px]" style={{ color: "#4b5264" }}>
                    Pon – Sub: 09:00 – 19:00
                  </p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
