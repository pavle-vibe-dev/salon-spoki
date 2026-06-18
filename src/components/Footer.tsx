"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Početna",    href: "/" },
  { label: "Usluge",     href: "/usluge" },
  { label: "Zakazivanje", href: "/zakazivanje" },
  { label: "Kontakt",    href: "/kontakt" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative" style={{ backgroundColor: "#FFF9F3" }}>
      {/* ── Lying dog above the logo ── */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: "clamp(1.5rem, 5vw, 4rem)",
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(130px, 17vw, 220px)",
          transform: "translateY(-95%)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 10,
        }}
      >
        <Image
          src="/images/dog-contact.png"
          alt="Pas"
          fill
          sizes="(max-width: 768px) 20vw, 260px"
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
        />
      </div>

      <div className="section-container pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center select-none w-fit">
              <Image
                src="/images/logo.png"
                alt="Spoki logo"
                width={350}
                height={140}
                unoptimized
                className="object-contain"
                style={{ height: 140, width: "auto" }}
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-blue-secondary)" }}>
              Vaš ljubimac zaslužuje samo najbolje. Profesionalna nega uz nežan pristup i
              premium tretmane — jer sreća vašeg ljubimca je naša misija.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(0,9,88,0.07)",
                    color: "var(--color-blue-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-orange)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,9,88,0.07)";
                    e.currentTarget.style.color = "var(--color-blue-secondary)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav links column ── */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-blue)", fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
            >
              Navigacija
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-150"
                    style={{ color: "var(--color-blue-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-orange)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-blue-secondary)"; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-blue)", fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
            >
              Kontakt
            </h3>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--color-blue-secondary)" }}>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Novi Banovci</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+381677661703" className="transition-colors" style={{ color: "var(--color-blue-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-orange)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-blue-secondary)"; }}
                >
                  067 766 17 03
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:salonspoki@gmail.com" className="transition-colors" style={{ color: "var(--color-blue-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-orange)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-blue-secondary)"; }}
                >
                  salonspoki@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Pon–Sub: 09:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Full-width orange bottom bar ── */}
      <div
        style={{
          backgroundColor: "var(--color-orange)",
          position: "relative",
        }}
      >
        <div
          className="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "#ffffff" }}
        >
          <span>© {currentYear} Spoki Salon. Sva prava zadržana.</span>
          <span>Napravljeno sa ❤️ za vaše ljubimce</span>
        </div>
      </div>
    </footer>
  );
}
